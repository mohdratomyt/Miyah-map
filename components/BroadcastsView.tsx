import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { NeighborhoodData, Language } from '../types';
import { MOCK_NEIGHBORHOOD_DATA, MOCK_BROADCASTS } from '../constants';
import { useTranslation } from '../utils/i18n';

interface BroadcastsViewProps {
  currentLang: Language;
}

interface BroadcastHistoryItem {
  id: string;
  timestamp: string;
  area: string;
  message: string;
}

const BroadcastsView: React.FC<BroadcastsViewProps> = ({ currentLang }) => {
  const { t } = useTranslation(currentLang);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [broadcastHistory, setBroadcastHistory] = useState<BroadcastHistoryItem[]>(MOCK_BROADCASTS);

  const neighborhoods: NeighborhoodData[] = MOCK_NEIGHBORHOOD_DATA;

  const handleNeighborhoodSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions).map((option: HTMLOptionElement) => option.value);
    setSelectedNeighborhoods(options);
  };

  const handleSuggestMessage = async () => {
    if (selectedNeighborhoods.length === 0) {
      setError('Please select at least one neighborhood to get a suggestion.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const suggestion = await geminiService.generateBroadcastSuggestion(
        neighborhoods,
        selectedNeighborhoods,
      );
      setMessage(suggestion);
    } catch (err: any) {
      console.error(err);
      setError(t('error.gemini', { message: err.message }));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendBroadcast = () => {
    if (selectedNeighborhoods.length === 0 || !message.trim()) {
      setError('Please select areas and provide a message.');
      return;
    }
    setError(null);

    // Simulate sending SMS
    const newBroadcast: BroadcastHistoryItem = {
      id: `b-${Date.now()}`,
      timestamp: new Date().toISOString(),
      area: selectedNeighborhoods.map(id => neighborhoods.find(nb => nb.id === id)?.name || id).join(', '),
      message: message.trim(),
    };
    setBroadcastHistory((prev) => [newBroadcast, ...prev]);
    setSelectedNeighborhoods([]);
    setMessage('');
    alert('Broadcast SMS sent successfully (simulated)!');
  };

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">{t('broadcast.title')}</h1>

      {/* Send Broadcast Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('broadcast.sendMessage')}</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="select-areas" className="block text-sm font-medium text-gray-700 mb-2">
            {t('broadcast.selectArea')}
          </label>
          <select
            id="select-areas"
            multiple
            value={selectedNeighborhoods}
            onChange={handleNeighborhoodSelect}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-48 overflow-y-auto
                       hover:border-gray-400 transition-colors duration-150 ease-in-out cursor-pointer"
            aria-label={t('broadcast.selectArea')}
          >
            {neighborhoods.map((nb) => (
              <option key={nb.id} value={nb.id}>
                {nb.name} ({t('dashboard.waterStatus')}: {nb.waterStatus}, {t('dashboard.powerStatus')}: {nb.powerStatus})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="message-content" className="block text-sm font-medium text-gray-700 mb-2">
            {t('broadcast.message')}
          </label>
          <textarea
            id="message-content"
            rows={6}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2 resize-y
                       hover:border-gray-400 transition-colors duration-150 ease-in-out"
            placeholder="Type your broadcast message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isGenerating}
            aria-label={t('broadcast.message')}
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={handleSuggestMessage}
            disabled={isGenerating || selectedNeighborhoods.length === 0}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm 
                        ${isGenerating ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'}
                        transition-colors duration-200`}
            aria-label={t('broadcast.suggestMessage')}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('loading.suggestions')}
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4.343 19.657l-.707.707M1.025 12H1m16.975 0a9 9 0 11-16.975 0H1"></path></svg>
                {t('broadcast.suggestMessage')}
              </>
            )}
          </button>
          <button
            onClick={handleSendBroadcast}
            disabled={selectedNeighborhoods.length === 0 || !message.trim() || isGenerating}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm 
                        ${selectedNeighborhoods.length === 0 || !message.trim() || isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}
                        transition-colors duration-200`}
            aria-label={t('broadcast.send')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            {t('broadcast.send')}
          </button>
        </div>
      </div>

      {/* Broadcast History */}
      <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('broadcast.history')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Area(s)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {broadcastHistory.map((broadcast) => (
                <tr key={broadcast.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(broadcast.timestamp).toLocaleString(currentLang)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {broadcast.area}
                  </td>
                  <td className="px-6 py-4 max-w-sm overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500" title={broadcast.message}>
                    {broadcast.message}
                  </td>
                </tr>
              ))}
              {broadcastHistory.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    No broadcast history.
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

export default BroadcastsView;