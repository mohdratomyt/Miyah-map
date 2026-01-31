import { useEffect, useState } from 'react';
import { meshService } from '../services/MeshNetworkService';
import type { MeshPeer } from '../types';
import { Wifi, WifiOff, Activity, Users } from 'lucide-react';

export const MeshControlPanel = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [peers, setPeers] = useState<MeshPeer[]>([]);
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        if (isEnabled) {
            meshService.start();

            const unsubscribe = meshService.onMessage((packet) => {
                addLog(`RX: [${packet.type}] from ${packet.senderId}`);
                setPeers(meshService.getPeers());
            });

            const interval = setInterval(() => {
                // Refresh peers list
                setPeers(meshService.getPeers());
            }, 2000);

            addLog("Mesh Network Started");

            return () => {
                unsubscribe();
                clearInterval(interval);
                meshService.stop();
                addLog("Mesh Network Stopped");
            };
        }
    }, [isEnabled]);

    const addLog = (msg: string) => {
        setLogs(prev => [`${new Date().toLocaleTimeString()}: ${msg}`, ...prev].slice(0, 10));
    };

    const handleBroadcastTest = () => {
        if (!isEnabled) return;
        meshService.broadcast({
            type: 'NEIGHBORHOOD_UPDATE',
            payload: { test: 'data' },
            timestamp: Date.now(),
            messageId: crypto.randomUUID()
        });
        addLog("TX: Sent Test Update");
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                    <Activity className="text-blue-500" size={24} /> Bluetooth Mesh Network
                </h3>
                <button
                    onClick={() => setIsEnabled(!isEnabled)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 ${isEnabled
                            ? 'bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    {isEnabled ? '✓ Enabled' : 'Disabled'}
                </button>
            </div>

            {isEnabled && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-sky-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-500 p-2 rounded-full">
                                <Users className="text-white" size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Connected Peers</p>
                                <p className="text-xs text-gray-500">Nearby devices</p>
                            </div>
                        </div>
                        <span className="text-3xl font-bold text-blue-700">{peers.length}</span>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <Activity size={16} /> Activity Log
                        </h4>
                        <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 h-40 overflow-y-auto font-mono text-xs">
                            {logs.length === 0 ? (
                                <p className="text-gray-400 text-center py-8">No activity yet...</p>
                            ) : (
                                logs.map((log, i) => (
                                    <div key={i} className="mb-1 text-gray-700 border-b border-gray-200 pb-1 last:border-0">
                                        {log}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleBroadcastTest}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 flex items-center justify-center gap-2 font-semibold shadow-md transition-all transform hover:scale-105"
                    >
                        <Wifi size={18} /> Broadcast Test Packet
                    </button>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs text-blue-800">
                            <strong>💡 Tip:</strong> Open this page in another browser tab to see peer-to-peer mesh networking in action!
                        </p>
                    </div>
                </div>
            )}

            {!isEnabled && (
                <div className="text-center py-12 text-gray-400 flex flex-col items-center">
                    <WifiOff size={64} className="mb-3 opacity-30" />
                    <p className="text-lg font-medium">Mesh network is offline</p>
                    <p className="text-sm mt-1">Enable to connect with nearby devices</p>
                </div>
            )}
        </div>
    );
};
