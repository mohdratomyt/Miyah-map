
import { Droplets, Zap, HeartHandshake, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomeView = () => {
    return (
        <div className="p-6 max-w-md mx-auto space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Miyah Help</h1>
                <p className="text-gray-600">Request essential services instantly.</p>
            </header>

            <div className="grid grid-cols-1 gap-4">
                <Link to="/request/water" className="flex items-center p-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg transition-transform transform hover:scale-105">
                    <Droplets size={32} className="mr-4" />
                    <div>
                        <span className="block text-xl font-bold">Request Water</span>
                        <span className="text-blue-100 text-sm">Report outage or request delivery</span>
                    </div>
                </Link>

                <Link to="/request/power" className="flex items-center p-6 bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-lg transition-transform transform hover:scale-105">
                    <Zap size={32} className="mr-4" />
                    <div>
                        <span className="block text-xl font-bold">Request Power</span>
                        <span className="text-amber-100 text-sm">Report transformer/line issues</span>
                    </div>
                </Link>

                <Link to="/request/aid" className="flex items-center p-6 bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-lg transition-transform transform hover:scale-105">
                    <HeartHandshake size={32} className="mr-4" />
                    <div>
                        <span className="block text-xl font-bold">Request Aid</span>
                        <span className="text-rose-100 text-sm">Medical or food assistance</span>
                    </div>
                </Link>

                <Link to="/ussd" className="flex items-center p-6 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg transition-transform transform hover:scale-105">
                    <MapPin size={32} className="mr-4" />
                    <div>
                        <span className="block text-xl font-bold">USSD Service Info</span>
                        <span className="text-green-100 text-sm">Check water/power availability by SMS</span>
                    </div>
                </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Nearby Resources</h2>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start">
                    <MapPin className="text-gray-400 mr-3 mt-1" size={20} />
                    <div>
                        <p className="font-medium">Nearest Water Station</p>
                        <p className="text-sm text-gray-500">2.5km • Al-Riyadh Central</p>
                        <button className="text-blue-600 text-sm font-medium mt-2">Get Directions</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
