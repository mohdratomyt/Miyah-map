import type { MeshPacket, MeshPeer } from '../types';

class MeshNetworkService {
    private channel: BroadcastChannel | null = null;
    private peers: Map<string, MeshPeer> = new Map();
    private messageHistory: Set<string> = new Set(); // Dedup
    private callbacks: ((packet: MeshPacket) => void)[] = [];
    public deviceId: string;

    constructor() {
        this.deviceId = crypto.randomUUID().split('-')[0]; // Short ID
    }

    public start() {
        if (this.channel) return;

        this.channel = new BroadcastChannel('miyah_mesh_network');

        this.channel.onmessage = (event) => {
            this.handleIncomingMessage(event.data);
        };

        // Announce presence
        this.broadcast({
            type: 'NEIGHBORHOOD_UPDATE', // Just a dummy keepalive for now
            payload: null,
            timestamp: Date.now(),
            messageId: crypto.randomUUID()
        });

        console.log(`[Mesh] Service started as ${this.deviceId}`);
    }

    public stop() {
        if (this.channel) {
            this.channel.close();
            this.channel = null;
        }
    }

    public broadcast(packet: Omit<MeshPacket, 'senderId'>) {
        if (!this.channel) return;

        const fullPacket: MeshPacket = {
            ...packet,
            senderId: this.deviceId,
        };

        // Add to history so we don't re-process our own
        this.messageHistory.add(fullPacket.messageId);

        this.channel.postMessage(fullPacket);
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

        // In a real mesh, we would re-broadcast (gossip) here if TTL > 0
        // For BroadcastChannel, all tabs receive it, so no need to re-broadcast.
    }

    public getPeers(): MeshPeer[] {
        return Array.from(this.peers.values());
    }
}

export const meshService = new MeshNetworkService();
