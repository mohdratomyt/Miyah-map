import React, { useState } from 'react';
import Layout from './components/Layout';
import DashboardView from './components/DashboardView';
import ReportsView from './components/ReportsView';
import BroadcastsView from './components/BroadcastsView';
import SettingsView from './components/SettingsView';
// import USSDView from './components/USSDView'; // Removed for NGO App
import { Language } from './types';

function App() {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [currentLang, setCurrentLang] = useState<Language>('en'); // Default language

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView currentLang={currentLang} />;
      case 'reports':
        return <ReportsView currentLang={currentLang} />;
      case 'broadcasts':
        return <BroadcastsView currentLang={currentLang} />;
      // USSDView removed for NGO Admin App
      case 'settings':
        return <SettingsView currentLang={currentLang} onNavigate={setActiveView} />;
      default:
        return <DashboardView currentLang={currentLang} />;
    }
  };

  return (
    <Layout
      activeView={activeView}
      onNavigate={setActiveView}
      currentLang={currentLang}
      onLanguageChange={handleLanguageChange}
    >
      {renderView()}
    </Layout>
  );
}

export default App;