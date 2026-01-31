import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { meshService } from '../services/MeshNetworkService';

export const RequestView = () => {
    const { type } = useParams<{ type: string }>();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [location, setLocation] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const getTitle = () => {
        switch (type) {
            case 'water': return 'Request Water';
            case 'power': return 'Request Power';
            case 'aid': return 'Request Aid';
            default: return 'Request Service';
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Broadcast via mesh network
        meshService.broadcast({
            type: 'REPORT_NEW',
            payload: {
                type,
                message,
                location,
                timestamp: new Date().toISOString()
            },
            timestamp: Date.now(),
            messageId: crypto.randomUUID()
        });

        setSubmitted(true);
        setTimeout(() => navigate('/'), 2000);
    };

    if (submitted) {
        return (
            <div className="p-6 max-w-md mx-auto flex flex-col items-center justify-center h-screen">
                <div className="bg-green-100 border-2 border-green-500 rounded-full p-8 mb-4">
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
        <div className="p-6 max-w-md mx-auto">
            <button
                onClick={() => navigate('/')}
                className="flex items-center text-blue-600 mb-6 hover:text-blue-700"
            >
                <ArrowLeft size={20} className="mr-2" /> Back
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-6">{getTitle()}</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Location / Neighborhood
                    </label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Al-Riyadh, Block 5"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Describe the Issue
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                        placeholder="Provide details about your request..."
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 flex items-center justify-center gap-2 shadow-lg"
                >
                    <Send size={20} /> Submit Request
                </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Your request will be shared with nearby NGO workers via the mesh network.
                </p>
            </div>
        </div>
    );
};
