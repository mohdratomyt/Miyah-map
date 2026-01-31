import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Droplets, Zap, Building, Phone, Clock, ChevronRight, Printer } from 'lucide-react';

interface Resource {
    id: string;
    name: string;
    type: 'water' | 'power' | 'hospital' | 'ngo';
    distance: string;
    address: string;
    hours?: string;
    phone?: string;
    status: 'open' | 'closed' | 'limited';
}

const MOCK_RESOURCES: Resource[] = [
    {
        id: '1',
        name: 'Al-Riyadh Central Water Station',
        type: 'water',
        distance: '2.5km',
        address: 'Al-Riyadh District, Block 5',
        hours: '6:00 AM - 8:00 PM',
        status: 'open',
    },
    {
        id: '2',
        name: 'Omdurman Water Distribution Point',
        type: 'water',
        distance: '3.2km',
        address: 'Omdurman Market Area',
        hours: '7:00 AM - 6:00 PM',
        status: 'open',
    },
    {
        id: '3',
        name: 'Bahri Emergency Well',
        type: 'water',
        distance: '4.1km',
        address: 'Bahri Industrial Zone',
        hours: '24 Hours',
        status: 'limited',
    },
    {
        id: '4',
        name: 'Central Power Substation',
        type: 'power',
        distance: '1.8km',
        address: 'Khartoum Central',
        phone: '+249 123 456 789',
        status: 'open',
    },
    {
        id: '5',
        name: 'Khartoum Teaching Hospital',
        type: 'hospital',
        distance: '2.0km',
        address: 'Hospital Road, Khartoum',
        hours: '24 Hours Emergency',
        phone: '+249 183 222 222',
        status: 'open',
    },
    {
        id: '6',
        name: 'Red Crescent Sudan Office',
        type: 'ngo',
        distance: '3.5km',
        address: 'NGO District, Building 12',
        hours: '8:00 AM - 5:00 PM',
        phone: '+249 912 345 678',
        status: 'open',
    },
    {
        id: '7',
        name: 'UNICEF Water Truck Schedule',
        type: 'water',
        distance: '0km',
        address: 'Mobile - Check schedule',
        hours: 'Mon/Wed/Fri 9:00 AM',
        status: 'limited',
    },
];

export const ResourcesView = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<'all' | 'water' | 'power' | 'hospital' | 'ngo'>('all');

    const filteredResources = filter === 'all'
        ? MOCK_RESOURCES
        : MOCK_RESOURCES.filter(r => r.type === filter);

    const getIcon = (type: Resource['type']) => {
        switch (type) {
            case 'water': return <Droplets className="text-blue-500 print:text-black" size={24} />;
            case 'power': return <Zap className="text-amber-500 print:text-black" size={24} />;
            case 'hospital': return <Building className="text-red-500 print:text-black" size={24} />;
            case 'ngo': return <Building className="text-green-500 print:text-black" size={24} />;
        }
    };

    const getTypeLabel = (type: Resource['type']) => {
        switch (type) {
            case 'water': return '💧 Water';
            case 'power': return '⚡ Power';
            case 'hospital': return '🏥 Medical';
            case 'ngo': return '🤝 NGO';
        }
    };

    const getStatusBadge = (status: Resource['status']) => {
        switch (status) {
            case 'open':
                return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full print:bg-white print:border print:border-black">Open</span>;
            case 'closed':
                return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full print:bg-white print:border print:border-black">Closed</span>;
            case 'limited':
                return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full print:bg-white print:border print:border-black">Limited</span>;
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex flex-col print:p-0 print:bg-white">
            <div className="max-w-md w-full mx-auto animate-fade-in print:max-w-full">
                {/* Navigation - Hidden in print */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-600 mb-8 hover:text-blue-600 transition-colors font-medium group print:hidden"
                >
                    <ArrowLeft size={20} className="mr-2 transform group-hover:-translate-x-1 transition-transform" /> Back to Home
                </button>

                {/* Header */}
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-3xl font-extrabold text-gray-900 print:text-2xl tracking-tight">Nearby Resources</h1>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 text-gray-700 rounded-lg transition-all print:hidden"
                    >
                        <Printer size={20} />
                        <span className="hidden sm:inline">Print List</span>
                    </button>
                </div>
                <p className="text-gray-500 mb-8 print:mb-4 text-lg">Find water stations, power offices, and aid centers</p>

                {/* Print Header - Only visible in print */}
                <div className="hidden print:block mb-4 pb-4 border-b-2 border-black">
                    <p className="text-lg font-bold text-center">مياه - Miyah Help</p>
                    <p className="text-center text-sm">Emergency Resources Directory</p>
                    <p className="text-center text-xs mt-1">Printed: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                {/* Filter Tabs - Hidden in print */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 print:hidden scrollbar-hide">
                    {['all', 'water', 'power', 'hospital', 'ngo'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${filter === f
                                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 transform -translate-y-0.5'
                                    : 'bg-white text-gray-600 shadow-sm border border-gray-100 hover:bg-gray-50'
                                }`}
                        >
                            {f !== 'all' && getIcon(f as any)}
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Resource List */}
                <div className="space-y-4 print:space-y-2">
                    {filteredResources.map((resource, index) => (
                        <div
                            key={resource.id}
                            className={`glass-card p-5 rounded-xl flex items-start justify-between cursor-pointer group hover:bg-blue-50/50 print:shadow-none print:border print:border-gray-300 print:rounded-none animate-slide-up`}
                            style={{ animationDelay: `${index * 50}ms` }}
                            onClick={() => alert(`Opening directions to ${resource.name}`)}
                        >
                            <div className="flex items-start gap-4">
                                <div className="mt-1 print:hidden p-3 bg-gray-50 rounded-full group-hover:scale-110 transition-transform duration-300">
                                    {getIcon(resource.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="hidden print:inline text-sm font-medium">{getTypeLabel(resource.type)}</span>
                                        <h3 className="font-bold text-gray-900 text-lg print:text-base group-hover:text-blue-700 transition-colors">{resource.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 print:text-xs font-medium">
                                        <MapPin size={16} className="print:hidden text-gray-400" />
                                        <span className="text-gray-900">{resource.distance}</span>
                                        <span>•</span>
                                        <span>{resource.address}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {resource.hours && (
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500 print:text-xs">
                                                <Clock size={14} className="print:hidden" />
                                                <span>{resource.hours}</span>
                                            </div>
                                        )}
                                        {resource.phone && (
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500 print:text-xs print:font-medium">
                                                <Phone size={14} className="print:hidden" />
                                                <span>{resource.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                {getStatusBadge(resource.status)}
                                <ChevronRight className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all print:hidden" size={20} />
                            </div>
                        </div>
                    ))}
                </div>

                {filteredResources.length === 0 && (
                    <div className="text-center py-12 text-gray-500 bg-white/50 rounded-xl border border-dashed border-gray-300">
                        No resources found for this category.
                    </div>
                )}

                {/* Print Footer */}
                <div className="hidden print:block mt-6 pt-4 border-t border-gray-300 text-center text-xs text-gray-600">
                    <p className="font-semibold">For more information, visit a Miyah Help center or call emergency services</p>
                    <p className="mt-1">This list may change. Please verify hours before visiting.</p>
                </div>
            </div>
        </div>
    );
};
