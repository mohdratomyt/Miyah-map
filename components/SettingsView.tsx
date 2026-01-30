import React, { useState } from 'react';
import { Language } from '../types';
import { useTranslation } from '../utils/i18n';
import { LANGUAGES } from '../constants'; // For language selection in USSD config

interface SettingsViewProps {
  currentLang: Language;
  onNavigate: (view: string) => void; // Added for navigation
}

const SettingsView: React.FC<SettingsViewProps> = ({ currentLang, onNavigate }) => {
  const { t } = useTranslation(currentLang);

  // General App Settings
  const [dataRefreshInterval, setDataRefreshInterval] = useState<string>('everyHour');
  const [defaultMapZoom, setDefaultMapZoom] = useState<number>(12);
  const [defaultLanguage, setDefaultLanguage] = useState<Language>(currentLang); // New state
  const [themePreference, setThemePreference] = useState<string>('system'); // New state (light, dark, system)
  const [offlineModeBehavior, setOfflineModeBehavior] = useState<string>('prioritizeBattery'); // New state
  const [mapDataDetail, setMapDataDetail] = useState<string>('medium'); // New state
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState<boolean>(true);
  const [smsAlertsEnabled, setSmsAlertsEnabled] = useState<boolean>(false);

  // USSD System Configuration
  const [ussdEnabled, setUssdEnabled] = useState<boolean>(true);
  const [ussdVoiceMenuLang, setUssdVoiceMenuLang] = useState<Language>('ar');
  const [fallbackDtmfEnabled, setFallbackDtmfEnabled] = useState<boolean>(true);
  const [apiToken, setApiToken] = useState<string>('********************'); // Mock token

  // Data Management
  const [offlineDataRetention, setOfflineDataRetention] = useState<string>('days30');
  const [syncBluetooth, setSyncBluetooth] = useState<boolean>(true);

  // Reusable Toggle Switch Component
  const ToggleSwitch: React.FC<{
    label: string;
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }> = ({ label, id, checked, onChange }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 cursor-pointer">
        {label}
      </label>
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name={id}
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          aria-checked={checked}
          role="switch"
        />
        <label htmlFor={id} className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">{t('nav.settings')}</h1>

      {/* General Application Settings */}
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('settings.generalApp')}</h2>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100">
            <label htmlFor="data-refresh-interval" className="text-sm font-medium text-gray-700 mb-1 sm:mb-0">
              {t('settings.dataRefreshInterval')}
            </label>
            <select
              id="data-refresh-interval"
              value={dataRefreshInterval}
              onChange={(e) => setDataRefreshInterval(e.target.value)}
              className="mt-1 sm:mt-0 block w-full sm:w-1/2 md:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                         hover:border-gray-400 transition-colors duration-150 ease-in-out cursor-pointer"
              aria-label={t('settings.dataRefreshInterval')}
            >
              <option value="every15min">{t('settings.every15min')}</option>
              <option value="everyHour">{t('settings.everyHour')}</option>
              <option value="manual">{t('settings.manual')}</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100">
            <label htmlFor="default-map-zoom" className="text-sm font-medium text-gray-700 mb-1 sm:mb-0">
              {t('settings.defaultMapZoom')}
            </label>
            <input
              type="number"
              id="default-map-zoom"
              value={defaultMapZoom}
              onChange={(e) => setDefaultMapZoom(Number(e.target.value))}
              min="1"
              max="20"
              className="mt-1 sm:mt-0 block w-full sm:w-1/2 md:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                         hover:border-gray-400 transition-colors duration-150 ease-in-out"
              aria-label={t('settings.defaultMapZoom')}
            />
          </div>

          {/* New: Default Language */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100">
            <label htmlFor="default-language" className="text-sm font-medium text-gray-700 mb-1 sm:mb-0">
              {t('settings.defaultLanguage')}
            </label>
            <select
              id="default-language"
              value={defaultLanguage}
              onChange={(e) => setDefaultLanguage(e.target.value as Language)}
              className="mt-1 sm:mt-0 block w-full sm:w-1/2 md:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                         hover:border-gray-400 transition-colors duration-150 ease-in-out cursor-pointer"
              aria-label={t('settings.defaultLanguage')}
            >
              {LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
          </div>

          {/* New: Theme Preference */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100">
            <label htmlFor="theme-preference" className="text-sm font-medium text-gray-700 mb-1 sm:mb-0">
              {t('settings.themePreference')}
            </label>
            <select
              id="theme-preference"
              value={themePreference}
              onChange={(e) => setThemePreference(e.target.value)}
              className="mt-1 sm:mt-0 block w-full sm:w-1/2 md:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                         hover:border-gray-400 transition-colors duration-150 ease-in-out cursor-pointer"
              aria-label={t('settings.themePreference')}
            >
              <option value="light">{t('settings.themeLight')}</option>
              <option value="dark">{t('settings.themeDark')}</option>
              <option value="system">{t('settings.themeSystem')}</option>
            </select>
          </div>

          {/* New: Offline Mode Behavior */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100">
            <label htmlFor="offline-mode-behavior" className="text-sm font-medium text-gray-700 mb-1 sm:mb-0">
              {t('settings.offlineModeBehavior')}
            </label>
            <select
              id="offline-mode-behavior"
              value={offlineModeBehavior}
              onChange={(e) => setOfflineModeBehavior(e.target.value)}
              className="mt-1 sm:mt-0 block w-full sm:w-1/2 md:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                         hover:border-gray-400 transition-colors duration-150 ease-in-out cursor-pointer"
              aria-label={t('settings.offlineModeBehavior')}
            >
              <option value="prioritizeDataSync">{t('settings.prioritizeDataSync')}</option>
              <option value="prioritizeBattery">{t('settings.prioritizeBattery')}</option>
              <option value="manualSyncOnly">{t('settings.manualSyncOnly')}</option>
            </select>
          </div>

          {/* New: Map Data Detail Level */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100">
            <label htmlFor="map-data-detail" className="text-sm font-medium text-gray-700 mb-1 sm:mb-0">
              {t('settings.mapDataDetail')}
            </label>
            <select
              id="map-data-detail"
              value={mapDataDetail}
              onChange={(e) => setMapDataDetail(e.target.value)}
              className="mt-1 sm:mt-0 block w-full sm:w-1/2 md:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                         hover:border-gray-400 transition-colors duration-150 ease-in-out cursor-pointer"
              aria-label={t('settings.mapDataDetail')}
            >
              <option value="low">{t('settings.mapDataLow')}</option>
              <option value="medium">{t('settings.mapDataMedium')}</option>
              <option value="high">{t('settings.mapDataHigh')}</option>
            </select>
          </div>

          <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">{t('settings.notifications')}</h3>
          <ToggleSwitch
            label={t('settings.emailAlerts')}
            id="email-alerts"
            checked={emailAlertsEnabled}
            onChange={setEmailAlertsEnabled}
          />
          <ToggleSwitch
            label={t('settings.smsAlerts')}
            id="sms-alerts"
            checked={smsAlertsEnabled}
            onChange={setSmsAlertsEnabled}
          />
        </div>
      </div>

      {/* USSD System Configuration */}
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('settings.ussdConfig')}</h2>

        <div className="space-y-4">
          <ToggleSwitch
            label={t('settings.enableUssd')}
            id="enable-ussd"
            checked={ussdEnabled}
            onChange={setUssdEnabled}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100">
            <label htmlFor="ussd-voice-lang" className="text-sm font-medium text-gray-700 mb-1 sm:mb-0">
              {t('settings.voiceMenuLang')}
            </label>
            <select
              id="ussd-voice-lang"
              value={ussdVoiceMenuLang}
              onChange={(e) => setUssdVoiceMenuLang(e.target.value as Language)}
              className="mt-1 sm:mt-0 block w-full sm:w-1/2 md:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                         hover:border-gray-400 transition-colors duration-150 ease-in-out cursor-pointer"
              aria-label={t('settings.voiceMenuLang')}
            >
              {LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
          </div>

          <ToggleSwitch
            label={t('settings.fallbackDtmf')}
            id="fallback-dtmf"
            checked={fallbackDtmfEnabled}
            onChange={setFallbackDtmfEnabled}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <label htmlFor="api-token" className="text-sm font-medium text-gray-700 mb-1 sm:mb-0">
              {t('settings.apiToken')}
            </label>
            <input
              type="password"
              id="api-token"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              className="mt-1 sm:mt-0 block w-full sm:w-1/2 md:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                         hover:border-gray-400 transition-colors duration-150 ease-in-out"
              aria-label={t('settings.apiToken')}
            />
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('settings.dataMgmt')}</h2>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100">
            <label htmlFor="offline-data-retention" className="text-sm font-medium text-gray-700 mb-1 sm:mb-0">
              {t('settings.offlineDataRetention')}
            </label>
            <select
              id="offline-data-retention"
              value={offlineDataRetention}
              onChange={(e) => setOfflineDataRetention(e.target.value)}
              className="mt-1 sm:mt-0 block w-full sm:w-1/2 md:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                         hover:border-gray-400 transition-colors duration-150 ease-in-out cursor-pointer"
              aria-label={t('settings.offlineDataRetention')}
            >
              <option value="days7">{t('settings.days7')}</option>
              <option value="days30">{t('settings.days30')}</option>
              <option value="allAvailable">{t('settings.allAvailable')}</option>
            </select>
          </div>

          <ToggleSwitch
            label={t('settings.syncBluetooth')}
            id="sync-bluetooth"
            checked={syncBluetooth}
            onChange={setSyncBluetooth}
          />
        </div>
      </div>

      {/* User & Permissions */}
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('settings.userPermissions')}</h2>
        <div className="space-y-4">
          <div className="py-3 border-b border-gray-100">
            <button
              onClick={() => alert('Manage Verifiers clicked!')} // Placeholder action
              className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm font-medium transition-colors duration-200"
              aria-label={t('settings.manageVerifiers')}
            >
              {t('settings.manageVerifiers')}
            </button>
          </div>
          <div className="py-3 last:border-b-0">
            <button
              onClick={() => alert('PGP Key Management clicked!')} // Placeholder action
              className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm font-medium transition-colors duration-200"
              aria-label={t('settings.pgpKeyMgmt')}
            >
              {t('settings.pgpKeyMgmt')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;