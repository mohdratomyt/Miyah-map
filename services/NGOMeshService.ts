// Mesh Network Service for NGO App (listens to user requests)
interface MeshPacket {
    type: 'NEIGHBORHOOD_UPDATE' | 'REPORT_NEW';
    payload: any;
    timestamp: number;
    senderId: string;
    messageId: string;
}

class NGOMeshService {
    private channel: BroadcastChannel | null = null;
    private callbacks: ((packet: MeshPacket) => void)[] = [];
    private messageHistory: Set<string> = new Set();

    public start() {
        if (this.channel) return;

        this.channel = new BroadcastChannel('miyah_mesh_network');

        this.channel.onmessage = (event) => {
            this.handleIncomingMessage(event.data);
        };

        console.log('[NGO Mesh] Listening for user requests...');
    }

    public stop() {
        if (this.channel) {
            this.channel.close();
            this.channel = null;
        }
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
    }
}

export const ngoMeshService = new NGOMeshService();
