// Mesh Network Service for NGO App (listens to user requests)
const STORAGE_KEY = 'miyah_mesh_network';

interface MeshPacket {
    type: 'NEIGHBORHOOD_UPDATE' | 'REPORT_NEW';
    payload: any;
    timestamp: number;
    senderId: string;
    messageId: string;
}

class NGOMeshService {
    private isRunning: boolean = false;
    private callbacks: ((packet: MeshPacket) => void)[] = [];
    private messageHistory: Set<string> = new Set();
    private storageHandler: ((event: StorageEvent) => void) | null = null;

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
                    console.error('[NGO Mesh] Failed to parse message:', e);
                }
            }
        };
        window.addEventListener('storage', this.storageHandler);

        console.log('[NGO Mesh] Listening for user requests...');
    }

    public stop() {
        if (this.storageHandler) {
            window.removeEventListener('storage', this.storageHandler);
            this.storageHandler = null;
        }
        this.isRunning = false;
    }

    public onMessage(callback: (packet: MeshPacket) => void) {
        this.callbacks.push(callback);
        return () => {
            this.callbacks = this.callbacks.filter(cb => cb !== callback);
        };
    }

    private handleIncomingMessage(packet: MeshPacket) {
        if (this.messageHistory.has(packet.messageId)) return; // Already seen

        // Mark as seen
        this.messageHistory.add(packet.messageId);

        // Notify listeners
        this.callbacks.forEach(cb => cb(packet));

        console.log('[NGO Mesh] Received:', packet);
    }
}

export const ngoMeshService = new NGOMeshService();
