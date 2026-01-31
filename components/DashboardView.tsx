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
        <div className="bg-gradient-to-br from-white to-red-50 p-6 rounded-2xl shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors mr-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{t('dashboard.waterScarcity')}</h2>
            </div>
          </div>
          <p className="text-5xl font-extrabold text-red-600 tracking-tight">
            {areasWithNoWater.length}
          </p>
          <div className="mt-3">
            <span className="text-red-700 text-sm font-semibold bg-red-100 px-3 py-1 rounded-full inline-block">
              {areasWithContaminatedWater.length > 0
                ? `${areasWithContaminatedWater.length} Contaminated`
                : 'No contamination alerts'}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-amber-50 p-6 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-3 bg-amber-100 rounded-xl group-hover:bg-amber-200 transition-colors mr-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{t('dashboard.powerOutages')}</h2>
            </div>
          </div>
          <p className="text-5xl font-extrabold text-amber-600 tracking-tight">
            {areasWithPowerOutagesCount}
          </p>
          <p className="text-amber-800 mt-3 text-sm font-semibold opacity-80">
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
      {/* Map Section */}
      <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-200 border border-gray-100 animate-slide-up delay-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{t('dashboard.mapOverview')}</h2>

          <div className="flex flex-wrap items-center gap-3">
            {/* Map Filter */}
            <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
              <span className="text-sm font-semibold text-gray-500 px-3">{t('dashboard.filterMap')}:</span>
              <select
                id="water-status-filter"
                value={filterWaterStatus}
                onChange={(e) => setFilterWaterStatus(e.target.value as WaterStatus | 'All')}
                className="bg-transparent border-none text-sm font-medium text-gray-800 focus:ring-0 cursor-pointer py-1 pr-8 pl-2"
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
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md font-medium"
              aria-label={t('button.printMaps')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0l-1 1h8l-1-1m-1 1V9m0 0a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4z"></path></svg>
              {t('button.printMaps')}
            </button>
          </div>
        </div>

        <div className="h-[500px] w-full bg-blue-50/30 rounded-xl overflow-hidden border border-gray-200 shadow-inner relative">
          <MapView
            geojson={KHARTOUM_GEOJSON_DATA}
            neighborhoodData={neighborhoodData}
            currentLang={currentLang}
            filterWaterStatus={filterWaterStatus}
          />
        </div>

        {/* Map Legend */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 inline-block w-full">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{t('dashboard.mapLegend')}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-sm font-medium text-gray-700">
            <div className="flex items-center bg-white px-3 py-2 rounded border border-gray-100 shadow-sm">
              <span className={`w-3 h-3 rounded-full mr-2 ${getWaterStatusColorClass(WaterStatus.AVAILABLE)} shadow-sm`}></span>
              {t('status.available')}
            </div>
            <div className="flex items-center bg-white px-3 py-2 rounded border border-gray-100 shadow-sm">
              <span className={`w-3 h-3 rounded-full mr-2 ${getWaterStatusColorClass(WaterStatus.SCARCE)} shadow-sm`}></span>
              {t('status.scarce')}
            </div>
            <div className="flex items-center bg-white px-3 py-2 rounded border border-gray-100 shadow-sm">
              <span className={`w-3 h-3 rounded-full mr-2 ${getWaterStatusColorClass(WaterStatus.CONTAMINATED)} shadow-sm`}></span>
              {t('status.contaminated')}
            </div>
            <div className="flex items-center bg-white px-3 py-2 rounded border border-gray-100 shadow-sm">
              <span className={`w-3 h-3 rounded-full mr-2 ${getWaterStatusColorClass(WaterStatus.NO_WATER)} shadow-sm`}></span>
              {t('status.noWater')}
            </div>
            <div className="flex items-center bg-white px-3 py-2 rounded border border-gray-100 shadow-sm">
              <span className={`w-3 h-3 rounded-full mr-2 ${getWaterStatusColorClass(WaterStatus.UNKNOWN)} shadow-sm`}></span>
              {t('status.unknown')}
            </div>
            <div className="flex items-center bg-white px-3 py-2 rounded border border-gray-100 shadow-sm">
              <span className="w-3 h-3 border-2 border-red-500 rounded-sm mr-2"></span>
              <span className="truncate" title={t('dashboard.criticalWaterAlert')}>{t('dashboard.criticalWaterAlert')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Areas Needing Attention */}
      <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-200 border border-gray-100 animate-slide-up delay-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('dashboard.areasNeedingAttention')}</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t('dashboard.neighborhood')}
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t('dashboard.waterStatus')}
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t('dashboard.powerStatus')}
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t('dashboard.lastUpdated')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {neighborhoodData
                .filter(nb => nb.waterStatus === WaterStatus.NO_WATER || nb.waterStatus === WaterStatus.CONTAMINATED || nb.powerStatus === PowerStatus.OFF || (nb.daysNoWater && nb.daysNoWater >= 7))
                .sort((a, b) => (b.daysNoWater || 0) - (a.daysNoWater || 0)) // Sort by days without water
                .map((nb) => (
                  <tr key={nb.id} className="hover:bg-blue-50/50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nb.name}
                      {nb.daysNoWater && nb.daysNoWater > 0 && nb.waterStatus !== WaterStatus.AVAILABLE && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200 shadow-sm">
                          {t('dashboard.noWaterForDays', { days: nb.daysNoWater })}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border shadow-sm ${nb.waterStatus === WaterStatus.AVAILABLE ? 'bg-green-50 text-green-700 border-green-200' :
                          nb.waterStatus === WaterStatus.SCARCE ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            nb.waterStatus === WaterStatus.CONTAMINATED ? 'bg-red-50 text-red-700 border-red-200' :
                              'bg-gray-50 text-gray-700 border-gray-200'
                        }`}>
                        {getWaterStatusText(nb.waterStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border shadow-sm ${nb.powerStatus === PowerStatus.ON ? 'bg-green-50 text-green-700 border-green-200' :
                          nb.powerStatus === PowerStatus.INTERMITTENT ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-gray-50 text-gray-700 border-gray-200'
                        }`}>
                        {getPowerStatusText(nb.powerStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className='flex flex-col'>
                        <span className="font-medium text-gray-900">
                          {new Date(nb.lastUpdated).toLocaleDateString(currentLang, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatTimeAgo(nb.lastUpdated, currentLang)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              {neighborhoodData.filter(nb => nb.waterStatus === WaterStatus.NO_WATER || nb.waterStatus === WaterStatus.CONTAMINATED || nb.powerStatus === PowerStatus.OFF || (nb.daysNoWater && nb.daysNoWater >= 7)).length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 whitespace-nowrap text-sm text-gray-500 text-center italic">
                    All clear! No critical alerts in the monitored areas.
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