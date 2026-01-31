import type { MeshPacket, MeshPeer } from '../types';

const STORAGE_KEY = 'miyah_mesh_network';

class MeshNetworkService {
    private isRunning: boolean = false;
    private peers: Map<string, MeshPeer> = new Map();
    private messageHistory: Set<string> = new Set(); // Dedup
    private callbacks: ((packet: MeshPacket) => void)[] = [];
    private storageHandler: ((event: StorageEvent) => void) | null = null;
    public deviceId: string;

    constructor() {
        this.deviceId = crypto.randomUUID().split('-')[0]; // Short ID
    }

    public start() {
        if (this.isRunning) return;
        this.isRunning = true;

        // Listen for storage events (works across different ports on same host)
        this.storageHandler = (event: StorageEvent) => {
            if (event.key === STORAGE_KEY && event.newValue) {
                try {
                    const packet = JSON.parse(event.newValue) as MeshPacket;
                    this.handleIncomingMessage(packet);
                } catch (e) {
                    console.error('[Mesh] Failed to parse message:', e);
                }
            }
        };
        window.addEventListener('storage', this.storageHandler);

        // Announce presence
        this.broadcast({
            type: 'NEIGHBORHOOD_UPDATE',
            payload: null,
            timestamp: Date.now(),
            messageId: crypto.randomUUID()
        });

        console.log(`[Mesh] Service started as ${this.deviceId}`);
    }

    public stop() {
        if (this.storageHandler) {
            window.removeEventListener('storage', this.storageHandler);
            this.storageHandler = null;
        }
        this.isRunning = false;
    }

    public broadcast(packet: Omit<MeshPacket, 'senderId'>) {
        if (!this.isRunning) return;

        const fullPacket: MeshPacket = {
            ...packet,
            senderId: this.deviceId,
        };

        // Add to history so we don't re-process our own
        this.messageHistory.add(fullPacket.messageId);

        // Write to localStorage - other tabs will receive via 'storage' event
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fullPacket));

        console.log(`[Mesh] Broadcasted:`, fullPacket);
    }

    public onMessage(callback: (packet: MeshPacket) => void) {
        this.callbacks.push(callback);
        return () => {
            this.callbacks = this.callbacks.filter(cb => cb !== callback);
        };
    }

    private handleIncomingMessage(packet: MeshPacket) {
        if (packet.senderId === this.deviceId) return; // Ignore own echoes
        if (this.messageHistory.has(packet.messageId)) return; // Already seen

        // Mark as seen
        this.messageHistory.add(packet.messageId);

        // Update peer list
        this.peers.set(packet.senderId, { id: packet.senderId, lastSeen: Date.now() });

        // Notify listeners
        this.callbacks.forEach(cb => cb(packet));

        console.log(`[Mesh] Received:`, packet);
    }

    public getPeers(): MeshPeer[] {
        return Array.from(this.peers.values());
    }
}

export const meshService = new MeshNetworkService();
