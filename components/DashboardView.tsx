import React, { useState } from 'react';
import { NeighborhoodData, WaterStatus, PowerStatus, Language } from '../types';
import { MOCK_NEIGHBORHOOD_DATA, KHARTOUM_GEOJSON_DATA } from '../constants';
import MapView from './MapView';
import { useTranslation } from '../utils/i18n';

interface DashboardViewProps {
  currentLang: Language;
}

const DashboardView: React.FC<DashboardViewProps> = ({ currentLang }) => {
  const { t } = useTranslation(currentLang);
  const neighborhoodData: NeighborhoodData[] = MOCK_NEIGHBORHOOD_DATA; // Using mock data
  const [filterWaterStatus, setFilterWaterStatus] = useState<WaterStatus | 'All'>('All'); // New state for map filter

  const areasWithNoWater = neighborhoodData.filter(
    (nb) => nb.waterStatus === WaterStatus.NO_WATER && (nb.daysNoWater && nb.daysNoWater > 0)
  ).sort((a, b) => (b.daysNoWater || 0) - (a.daysNoWater || 0));

  const areasWithContaminatedWater = neighborhoodData.filter(
    (nb) => nb.waterStatus === WaterStatus.CONTAMINATED
  );

  const areasWithPowerOutagesCount = neighborhoodData.filter(
    (nb) => nb.powerStatus === PowerStatus.OFF
  ).length;

  const getWaterStatusColorClass = (status: WaterStatus) => {
    switch (status) {
      case WaterStatus.AVAILABLE: return 'bg-green-500';
      case WaterStatus.SCARCE: return 'bg-yellow-400';
      case WaterStatus.CONTAMINATED: return 'bg-red-500';
      case WaterStatus.NO_WATER: return 'bg-gray-500';
      default: return 'bg-gray-300';
    }
  };

  const getWaterStatusText = (status: WaterStatus) => {
    switch (status) {
      case WaterStatus.AVAILABLE: return t('status.available');
      case WaterStatus.SCARCE: return t('status.scarce');
      case WaterStatus.CONTAMINATED: return t('status.contaminated');
      case WaterStatus.NO_WATER: return t('status.noWater');
      default: return t('status.unknown');
    }
  };

  const getPowerStatusText = (status: PowerStatus) => {
    switch (status) {
      case PowerStatus.ON: return t('status.on');
      case PowerStatus.INTERMITTENT: return t('status.intermittent');
      case PowerStatus.OFF: return t('status.off');
      default: return t('status.unknown');
    }
  };

  // Helper function for time ago formatting
  const formatTimeAgo = (timestamp: string, lang: Language): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // Approximation
    const years = Math.floor(days / 365); // Approximation

    if (seconds < 60) return t('time.justNow');
    if (minutes === 1) return t('time.minutesAgo', { minutes: 1 });
    if (minutes < 60) return t('time.minutesAgo', { minutes });
    if (hours === 1) return t('time.hourAgo');
    if (hours < 24) return t('time.hoursAgo', { hours });
    if (days === 1) return t('time.dayAgo');
    if (days < 7) return t('time.daysAgo', { days });
    if (weeks === 1) return t('time.weekAgo');
    if (weeks < 4) return t('time.weeksAgo', { weeks });
    if (months === 1) return t('time.monthAgo');
    if (months < 12) return t('time.monthsAgo', { months });
    if (years === 1) return t('time.yearAgo');
    return t('time.yearsAgo', { years });
  };


  const handlePrintMaps = () => {
    window.print(); // Triggers browser's print functionality
  };

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">{t('dashboard.title')}</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-red-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-3">
            <svg className="w-8 h-8 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.75-3M3 11l6-6m2 2l4 4m2 2l4 4m-6 4l3-3m-3 0l-3 3"></path></svg>
            <h2 className="text-xl font-semibold text-gray-800">{t('dashboard.waterScarcity')}</h2>
          </div>
          <p className="text-4xl font-extrabold text-red-700">
            {areasWithNoWater.length}
          </p>
          <p className="text-gray-600 mt-2 text-sm">
            {areasWithContaminatedWater.length > 0
              ? `${areasWithContaminatedWater.length} ${t('status.contaminated')} ${t('status.water')}`
              : 'No contaminated alerts'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-yellow-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-3">
            <svg className="w-8 h-8 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12H2M15.325 5.325l-.707-.707M9.382 17.618l-.707-.707M17.618 9.382l-.707-.707M6.382 15.618l-.707-.707M18 12a6 6 0 11-12 0 6 6 0 0112 0z"></path></svg>
            <h2 className="text-xl font-semibold text-gray-800">{t('dashboard.powerOutages')}</h2>
          </div>
          <p className="text-4xl font-extrabold text-yellow-700">
            {areasWithPowerOutagesCount}
          </p>
          <p className="text-gray-600 mt-2 text-sm">
            {t('dashboard.neighborhoodsAffected')}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-3">
            <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c.038.258.077.516.12.775L3 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c.038.258.077.516.12.775L3 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c.038.258.077.516.12.775L3 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c.038.258.077.516.12.775L3 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c.038.258.077.516.12.775L3 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c.038.258.077.516.12.775L3 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c.038.258.077.516.12.775L3 12l2 2 4-4"></path></svg>
            <h2 className="text-xl font-semibold text-gray-800">{t('dashboard.overallStatus')}</h2>
          </div>
          <p className="text-4xl font-extrabold text-green-700">
            {neighborhoodData.length - areasWithNoWater.length - areasWithContaminatedWater.length} / {neighborhoodData.length}
          </p>
          <p className="text-gray-600 mt-2 text-sm">
            {t('dashboard.neighborhoodsWithWater')}
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('dashboard.mapOverview')}</h2>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          {/* Map Filter */}
          <div className="flex items-center space-x-2">
            <label htmlFor="water-status-filter" className="text-sm font-medium text-gray-700">
              {t('dashboard.filterMap')}
            </label>
            <select
              id="water-status-filter"
              value={filterWaterStatus}
              onChange={(e) => setFilterWaterStatus(e.target.value as WaterStatus | 'All')}
              className="mt-1 block w-auto py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                         hover:bg-gray-50 transition-colors duration-150 ease-in-out cursor-pointer"
              aria-label={t('dashboard.filterMap')}
            >
              <option value="All">{t('dashboard.filterAll')}</option>
              <option value={WaterStatus.AVAILABLE}>{t('status.available')}</option>
              <option value={WaterStatus.SCARCE}>{t('status.scarce')}</option>
              <option value={WaterStatus.CONTAMINATED}>{t('status.contaminated')}</option>
              <option value={WaterStatus.NO_WATER}>{t('status.noWater')}</option>
              <option value={WaterStatus.UNKNOWN}>{t('status.unknown')}</option>
            </select>
          </div>

          {/* Print Maps Button */}
          <button
            onClick={handlePrintMaps}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md self-end md:self-auto"
            aria-label={t('button.printMaps')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0l-1 1h8l-1-1m-1 1V9m0 0a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4z"></path></svg>
            {t('button.printMaps')}
          </button>
        </div>

        <div className="h-[500px] w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          <MapView
            geojson={KHARTOUM_GEOJSON_DATA}
            neighborhoodData={neighborhoodData}
            currentLang={currentLang}
            filterWaterStatus={filterWaterStatus}
          />
        </div>

        {/* Map Legend */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('dashboard.mapLegend')}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 text-sm text-gray-700">
            <div className="flex items-center">
              <span className={`w-4 h-4 rounded-full mr-2 ${getWaterStatusColorClass(WaterStatus.AVAILABLE)}`}></span>
              {t('status.available')}
            </div>
            <div className="flex items-center">
              <span className={`w-4 h-4 rounded-full mr-2 ${getWaterStatusColorClass(WaterStatus.SCARCE)}`}></span>
              {t('status.scarce')}
            </div>
            <div className="flex items-center">
              <span className={`w-4 h-4 rounded-full mr-2 ${getWaterStatusColorClass(WaterStatus.CONTAMINATED)}`}></span>
              {t('status.contaminated')}
            </div>
            <div className="flex items-center">
              <span className={`w-4 h-4 rounded-full mr-2 ${getWaterStatusColorClass(WaterStatus.NO_WATER)}`}></span>
              {t('status.noWater')}
            </div>
            <div className="flex items-center">
              <span className={`w-4 h-4 rounded-full mr-2 ${getWaterStatusColorClass(WaterStatus.UNKNOWN)}`}></span>
              {t('status.unknown')}
            </div>
             <div className="flex items-center col-span-2 sm:col-span-1">
              <span className="w-4 h-4 border-2 border-red-500 rounded-sm mr-2"></span> {/* Changed to rounded-sm for better distinction */}
              {t('dashboard.criticalWaterAlert')}
            </div>
          </div>
        </div>
      </div>

      {/* Areas Needing Attention */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('dashboard.areasNeedingAttention')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('dashboard.neighborhood')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('dashboard.waterStatus')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('dashboard.powerStatus')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('dashboard.lastUpdated')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {neighborhoodData
                .filter(nb => nb.waterStatus === WaterStatus.NO_WATER || nb.waterStatus === WaterStatus.CONTAMINATED || nb.powerStatus === PowerStatus.OFF || (nb.daysNoWater && nb.daysNoWater >= 7))
                .sort((a, b) => (b.daysNoWater || 0) - (a.daysNoWater || 0)) // Sort by days without water
                .map((nb) => (
                  <tr key={nb.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nb.name}
                      {nb.daysNoWater && nb.daysNoWater > 0 && nb.waterStatus !== WaterStatus.AVAILABLE && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                          {t('dashboard.noWaterForDays', { days: nb.daysNoWater })}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${nb.waterStatus === WaterStatus.AVAILABLE ? 'bg-green-100 text-green-800' : nb.waterStatus === WaterStatus.SCARCE ? 'bg-yellow-100 text-yellow-800' : nb.waterStatus === WaterStatus.CONTAMINATED ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                        {getWaterStatusText(nb.waterStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${nb.powerStatus === PowerStatus.ON ? 'bg-green-100 text-green-800' : nb.powerStatus === PowerStatus.INTERMITTENT ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                        {getPowerStatusText(nb.powerStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex flex-col sm:flex-row sm:items-center">
                      <span className="block sm:inline mr-1">
                        {new Date(nb.lastUpdated).toLocaleDateString(currentLang, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-xs text-gray-500 italic">
                        ({formatTimeAgo(nb.lastUpdated, currentLang)})
                      </span>
                    </td>
                  </tr>
                ))}
              {neighborhoodData.filter(nb => nb.waterStatus === WaterStatus.NO_WATER || nb.waterStatus === WaterStatus.CONTAMINATED || nb.powerStatus === PowerStatus.OFF || (nb.daysNoWater && nb.daysNoWater >= 7)).length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    No critical areas to display.
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

export default DashboardView;