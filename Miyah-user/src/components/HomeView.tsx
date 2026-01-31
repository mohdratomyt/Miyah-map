
import { Droplets, Zap, HeartHandshake, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomeView = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-md mx-auto space-y-8 animate-fade-in">
                <header className="mb-8 text-center pt-8">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-500 mb-2 tracking-tight">
                        Miyah Help
                    </h1>
                    <p className="text-gray-500 font-medium text-lg">Request essential services instantly.</p>
                </header>

                <div className="grid grid-cols-1 gap-5">
                    <Link to="/request/water" className="group relative overflow-hidden p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-up delay-100">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="flex items-center relative z-10">
                            <div className="p-3 bg-white bg-opacity-20 rounded-full mr-5 backdrop-blur-sm">
                                <Droplets size={32} className="text-blue-50" />
                            </div>
                            <div>
                                <span className="block text-2xl font-bold tracking-wide">Request Water</span>
                                <span className="text-blue-100 text-sm font-medium opacity-90">Report outage or request delivery</span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/request/power" className="group relative overflow-hidden p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-up delay-200">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="flex items-center relative z-10">
                            <div className="p-3 bg-white bg-opacity-20 rounded-full mr-5 backdrop-blur-sm">
                                <Zap size={32} className="text-amber-50" />
                            </div>
                            <div>
                                <span className="block text-2xl font-bold tracking-wide">Request Power</span>
                                <span className="text-amber-100 text-sm font-medium opacity-90">Report transformer/line issues</span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/request/aid" className="group relative overflow-hidden p-6 bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-up delay-300">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="flex items-center relative z-10">
                            <div className="p-3 bg-white bg-opacity-20 rounded-full mr-5 backdrop-blur-sm">
                                <HeartHandshake size={32} className="text-rose-50" />
                            </div>
                            <div>
                                <span className="block text-2xl font-bold tracking-wide">Request Aid</span>
                                <span className="text-rose-100 text-sm font-medium opacity-90">Medical or food assistance</span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/ussd" className="group relative overflow-hidden p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-up delay-300">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="flex items-center relative z-10">
                            <div className="p-3 bg-white bg-opacity-20 rounded-full mr-5 backdrop-blur-sm">
                                <MapPin size={32} className="text-green-50" />
                            </div>
                            <div>
                                <span className="block text-2xl font-bold tracking-wide">USSD Info</span>
                                <span className="text-green-100 text-sm font-medium opacity-90">Check availability via SMS/USSD</span>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="mt-10 pt-6 animate-slide-up delay-300">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h2 className="text-xl font-bold text-gray-800">Nearby Resources</h2>
                        <Link to="/resources" className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors">View All</Link>
                    </div>

                    <Link
                        to="/resources"
                        className="glass-card p-5 rounded-xl flex items-start group"
                    >
                        <div className="bg-blue-100 p-3 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
                            <MapPin className="text-blue-600" size={24} />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-gray-900 text-lg">Nearest Water Station</p>
                            <p className="text-sm text-gray-500 mt-1 font-medium">2.5km • Al-Riyadh Central</p>
                        </div>
                        <div className="self-center">
                            <div className="bg-gray-100 p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};
