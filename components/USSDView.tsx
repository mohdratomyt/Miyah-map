import React from 'react';
import { Language } from '../types';
import { useTranslation } from '../utils/i18n';
import { MOCK_USSD_LOGS } from '../constants';

interface USSDViewProps {
  currentLang: Language;
  onNavigate: (view: string) => void;
}

const USSDView: React.FC<USSDViewProps> = ({ currentLang, onNavigate }) => {
  const { t } = useTranslation(currentLang);

  // Mock data for USSD status and metrics
  const ussdSystemStatus = 'Connected'; // Or 'Disconnected'
  const totalCalls24h = 1250;
  const successfulCalls = 1180;
  const avgResponseTimeMs = 350;
  const peakCallVolume = '10 AM - 11 AM (250 calls)'; // This could be dynamic or translated

  const getStatusColorClass = (status: string) => {
    return status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getCallStatusColorClass = (status: string) => {
    return status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">{t('ussd.title')}</h1>

      {/* USSD System Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* System Status Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-3">
            <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L9.5 13.501E9L14.5 18.5a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            <h2 className="text-xl font-semibold text-gray-800">{t('ussd.systemStatus')}</h2>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className={`px-3 py-1 text-base font-semibold rounded-full ${getStatusColorClass(ussdSystemStatus)}`}>
              {ussdSystemStatus === 'Connected' ? t('ussd.connected') : t('ussd.disconnected')}
            </span>
            <button
              onClick={() => onNavigate('settings')}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md text-sm"
              aria-label={t('ussd.goToSettings')}
            >
              {t('ussd.goToSettings')}
            </button>
          </div>
        </div>

        {/* Key Metrics Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-3">
            <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            <h2 className="text-xl font-semibold text-gray-800">{t('ussd.keyMetrics')}</h2>
          </div>
          <ul className="text-gray-700 space-y-2 text-base mt-4">
            <li className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">{t('ussd.totalCalls')}:</span> <span className="font-semibold">{totalCalls24h}</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">{t('ussd.successfulCalls')}:</span> <span className="font-semibold text-green-700">{successfulCalls}</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">{t('ussd.avgResponseTime')}:</span> <span className="font-semibold">{avgResponseTimeMs}ms</span>
            </li>
            <li className="flex justify-between pt-2">
              <span className="font-medium">{t('ussd.peakVolume')}:</span> <span className="font-semibold">{peakCallVolume}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recent Call Logs */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('ussd.recentCallLogs')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('ussd.timestamp')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('ussd.userLocation')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('ussd.query')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('ussd.systemResponse')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('ussd.status')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {MOCK_USSD_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(log.timestamp).toLocaleString(currentLang)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.userLocation}
                  </td>
                  <td className="px-6 py-4 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500" title={log.query}>
                    {log.query}
                  </td>
                  <td className="px-6 py-4 max-w-md overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500" title={log.systemResponse}>
                    {log.systemResponse}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCallStatusColorClass(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
              {MOCK_USSD_LOGS.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    No recent USSD call logs to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default USSDView;