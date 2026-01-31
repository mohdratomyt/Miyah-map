

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HomeView } from './components/HomeView';
import { RequestView } from './components/RequestView';
import { ResourcesView } from './components/ResourcesView';
import { MeshControlPanel } from './components/MeshControlPanel';
import { USSDSimulator } from './components/USSDSimulator';
import { Settings, Smartphone } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Miyah User
            </Link>
            <div className="flex gap-4">
              <Link to="/ussd" className="text-gray-600 hover:text-gray-900" title="USSD Service">
                <Smartphone size={24} />
              </Link>
              <Link to="/settings" className="text-gray-600 hover:text-gray-900" title="Settings">
                <Settings size={24} />
              </Link>
            </div>
          </div>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/request/:type" element={<RequestView />} />
          <Route path="/resources" element={<ResourcesView />} />
          <Route path="/ussd" element={
            <div className="py-6">
              <USSDSimulator />
            </div>
          } />
          <Route path="/settings" element={
            <div className="p-6 max-w-md mx-auto">
              <h1 className="text-3xl font-bold mb-6">Settings</h1>
              <MeshControlPanel />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
