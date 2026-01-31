import React, { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { Language } from '../types';
import { useTranslation } from '../utils/i18n';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  onNavigate: (view: string) => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  activeView,
  onNavigate,
  currentLang,
  onLanguageChange,
}) => {
  const { t } = useTranslation(currentLang);

  const navItems = [
    {
      id: 'dashboard', label: t('nav.dashboard'), icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
      )
    },
    {
      id: 'reports', label: t('nav.reports'), icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
      )
    },
    {
      id: 'broadcasts', label: t('nav.broadcasts'), icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.238 1.102L6 18H3a1 1 0 01-1-1v-7a1 1 0 011-1h3L7.762 4.78a1.76 1.76 0 013.238 1.102zM15.75 16H18a2 2 0 002-2V7a2 2 0 00-2-2h-2.25l-1.42 1.42a2 2 0 01-.58 1.4V14a2 2 0 01.58 1.4l1.42 1.4z"></path></svg>
      )
    },

    {
      id: 'settings', label: t('nav.settings'), icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
      )
    },
  ];

  // Fix: Import useState from React
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Header for mobile */}
      <header className="flex md:hidden items-center justify-between p-4 bg-blue-700 text-white shadow-md z-30">
        <h1 className="text-xl font-bold">{t('app.title')}</h1>
        <div className="flex items-center space-x-3">
          <LanguageSwitcher currentLang={currentLang} onLanguageChange={onLanguageChange} />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Toggle mobile navigation"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Sidebar (overlay) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 hidden'
          }`}
        aria-hidden={!isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(false)} // Close on overlay click
      ></div>
      <nav className={`fixed inset-y-0 left-0 w-64 bg-blue-800 text-white p-6 shadow-xl z-50 transform transition-transform duration-300 ease-in-out
                      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">{t('app.title')}</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
            aria-label="Close mobile navigation"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate(item.id); setIsMobileMenuOpen(false); }}
                className={`flex items-center px-4 py-2 rounded-lg text-lg transition-colors duration-200 
                            ${activeView === item.id ? 'bg-blue-600 font-bold shadow-inner' : 'hover:bg-blue-700'}`}
                aria-label={item.label}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 pt-4 border-t border-blue-700">
          <LanguageSwitcher currentLang={currentLang} onLanguageChange={onLanguageChange} />
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-64 bg-blue-800 text-white p-6 shadow-xl sticky top-0 h-screen overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight">{t('app.title')}</h2>
        </div>
        <ul className="space-y-3 flex-grow">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate(item.id); }}
                className={`flex items-center p-3 rounded-lg text-lg transition-colors duration-200 
                            ${activeView === item.id ? 'bg-blue-600 font-semibold shadow-inner' : 'hover:bg-blue-700'}`}
                aria-label={item.label}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 pt-4 border-t border-blue-700">
          <LanguageSwitcher currentLang={currentLang} onLanguageChange={onLanguageChange} />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;