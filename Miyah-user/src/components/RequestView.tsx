import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Camera, Mic, X, StopCircle } from 'lucide-react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { meshService } from '../services/MeshNetworkService';

export const RequestView = () => {
    const { type } = useParams<{ type: string }>();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [location, setLocation] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);
    const [audio, setAudio] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
        audio: true,
        onStop: async (blobUrl, blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64Audio = reader.result as string;
                setAudio(base64Audio);
            };
        }
    });

    const getTitle = () => {
        switch (type) {
            case 'water': return 'Request Water';
            case 'power': return 'Request Power';
            case 'aid': return 'Request Aid';
            default: return 'Request Service';
        }
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Generate a unique ID for this report on the client side to avoid duplicates
        const requestId = crypto.randomUUID();

        const reportData = {
            id: requestId, // Include the ID
            type,
            message,
            location,
            photoUrl: photo || undefined,
            audioUrl: audio || undefined,
            timestamp: new Date().toISOString()
        };

        // Send to server API
        try {
            await fetch('http://localhost:3002/api/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reportData),
            });
            console.log('[Request] Report sent to server');
        } catch (error) {
            console.error('[Request] Failed to send to server, using mesh only:', error);
        }

        // Also broadcast via mesh network (for offline/peer-to-peer)
        meshService.broadcast({
            type: 'REPORT_NEW',
            payload: reportData,
            timestamp: Date.now(),
            messageId: requestId // Use the same ID for mesh message
        });

        setSubmitted(true);
        setTimeout(() => navigate('/'), 2000);
    };

    if (submitted) {
        return (
            <div className="p-6 max-w-md mx-auto flex flex-col items-center justify-center h-screen animate-fade-in">
                <div className="bg-green-100 border-2 border-green-500 rounded-full p-8 mb-4 animate-pulse">
                    <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Sent!</h2>
                <p className="text-gray-600 text-center">Your request has been submitted to nearby NGOs.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex flex-col items-center justify-center">
            <div className="max-w-md w-full animate-fade-in">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-600 mb-6 hover:text-blue-600 transition-colors font-medium group"
                >
                    <ArrowLeft size={20} className="mr-2 transform group-hover:-translate-x-1 transition-transform" /> Back to Home
                </button>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">{getTitle()}</h1>
                <p className="text-gray-500 mb-8 text-lg">Please provide details so we can assist you quickly.</p>

                <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Your Location / Neighborhood
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="input-field bg-gray-50 focus:bg-white transition-all duration-200"
                            placeholder="e.g., Al-Riyadh, Block 5"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Describe the Issue
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="input-field bg-gray-50 focus:bg-white h-32 resize-none transition-all duration-200"
                            placeholder="Provide details about your request..."
                            required
                        />
                    </div>

                    {/* Media Attachments */}
                    <div className="flex flex-col gap-4">
                        <label className="block text-sm font-bold text-gray-700">Media Attachments</label>
                        <div className="flex gap-3">
                            {/* Photo Capture */}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handlePhotoUpload}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className={`flex items-center justify-center px-4 py-2 rounded-lg border-2 transition-all ${photo ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600'}`}
                            >
                                <Camera size={20} className="mr-2" />
                                {photo ? 'Photo Added' : 'Add Photo'}
                            </button>

                            {/* Voice Recording */}
                            <button
                                type="button"
                                onClick={status === 'recording' ? stopRecording : startRecording}
                                className={`flex items-center justify-center px-4 py-2 rounded-lg border-2 transition-all ${status === 'recording' ? 'border-red-500 bg-red-50 text-red-600 animate-pulse' : audio ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600'}`}
                            >
                                {status === 'recording' ? <StopCircle size={20} className="mr-2" /> : <Mic size={20} className="mr-2" />}
                                {status === 'recording' ? 'Stop' : audio ? 'Voice Added' : 'Record Voice'}
                            </button>
                        </div>

                        {/* Previews */}
                        {photo && (
                            <div className="relative mt-2 w-full h-40 rounded-lg overflow-hidden border border-gray-200">
                                <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setPhoto(null)}
                                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full backdrop-blur-sm transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}

                        {audio && (
                            <div className="relative mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                                <audio src={mediaBlobUrl || undefined} controls className="w-full h-8" />
                                <button
                                    type="button"
                                    onClick={() => setAudio(null)}
                                    className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary text-lg font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 mt-4 active:scale-95 transition-transform"
                    >
                        <Send size={20} className="mr-2" /> Submit Request
                    </button>
                </form>

                <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start animate-slide-up delay-100">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <p className="text-sm text-blue-800 leading-relaxed">
                        <strong>Note:</strong> Your request (including photos and voice messages) will be securely shared with nearby NGO workers via our resilient mesh network.
                    </p>
                </div>
            </div>
        </div>
    );
};
