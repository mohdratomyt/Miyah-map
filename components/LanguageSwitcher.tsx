import React from 'react';
import { LANGUAGES } from '../constants';
import { Language } from '../types';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="relative inline-block text-left z-50">
      <select
        id="language-select"
        value={currentLang}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="block w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50
                   transition-all duration-150 ease-in-out cursor-pointer"
        aria-label="Select Language"
      >
        {LANGUAGES.map((langOption) => (
          <option key={langOption.id} value={langOption.id}>
            {langOption.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;