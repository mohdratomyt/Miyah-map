import React, { useState, useEffect, useCallback } from 'react';
import { Report, ReportType, Language } from '../types';
import { MOCK_NEIGHBORHOOD_DATA } from '../constants';
import { useTranslation } from '../utils/i18n';
import { ngoMeshService } from '../services/NGOMeshService';
import { Camera, Mic, CheckCircle, Clock } from 'lucide-react';

interface ReportsViewProps {
  currentLang: Language;
}

interface ServerReport {
  id: string;
  type: string;
  message: string;
  location: string;
  timestamp: string;
  isVerified: boolean;
  urgency: string;
  photoUrl?: string;
  audioUrl?: string;
}

const ReportsView: React.FC<ReportsViewProps> = ({ currentLang }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const { t } = useTranslation(currentLang);
  const [activeAudio, setActiveAudio] = useState<string | null>(null);

  // Helper Functions
  const getNeighborhoodName = (neighborhoodId: string) => {
    const neighborhood = MOCK_NEIGHBORHOOD_DATA.find(nb => nb.id === neighborhoodId);
    return neighborhood ? neighborhood.name : 'Unknown Neighborhood';
  };

  const getReportTypeText = (type: ReportType) => {
    switch (type) {
      case ReportType.WATER_ISSUE: return t('reportType.waterIssue');
      case ReportType.POWER_ISSUE: return t('reportType.powerIssue');
      case ReportType.NEW_INSTALLATION: return t('reportType.newInstallation');
      case ReportType.COMPLAINT_WATER_QUALITY: return t('reportType.complaintWaterQuality');
      case ReportType.COMPLAINT_NO_WATER_DELIVERY: return t('reportType.complaintNoWaterDelivery');
      case ReportType.COMPLAINT_INFRASTRUCTURE_DAMAGE: return t('reportType.complaintInfrastructureDamage');
      case ReportType.COMPLAINT_OTHER: return t('reportType.complaintOther');
      default: return t('reportType.general');
    }
  };

  const toggleVerification = (reportId: string) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId ? { ...report, isVerified: !report.isVerified } : report
      )
    );
  };

  const deleteReport = async (reportId: string) => {
    if (!window.confirm(t('report.deleteConfirm') || 'Are you sure you want to delete this report?')) return;

    try {
      const response = await fetch(`http://localhost:3002/api/reports/${reportId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReports(prevReports => prevReports.filter(r => r.id !== reportId));
      } else {
        alert('Failed to delete report');
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      // Fallback for mesh-only mode (just remove locally for now)
      setReports(prevReports => prevReports.filter(r => r.id !== reportId));
    }
  };

  // Fetch reports from server
  const fetchReportsFromServer = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3002/api/reports');
      if (response.ok) {
        const serverReports: ServerReport[] = await response.json();

        setReports(prevReports => {
          const existingIds = new Set(prevReports.map(r => r.id));
          const newReports: Report[] = [];

          serverReports.forEach((sr) => {
            if (!existingIds.has(sr.id)) {
              newReports.push({
                id: sr.id,
                neighborhoodId: 'khartoum-1',
                type: sr.type === 'water' ? ReportType.WATER_ISSUE :
                  sr.type === 'power' ? ReportType.POWER_ISSUE :
                    sr.type === 'aid' ? ReportType.GENERAL :
                      ReportType.GENERAL,
                timestamp: sr.timestamp,
                message: `${sr.location}: ${sr.message}`,
                isVerified: sr.isVerified,
                urgency: sr.urgency as 'Low' | 'Medium' | 'High' | 'Critical',
                photoUrl: sr.photoUrl,
                audioUrl: sr.audioUrl,
              });
              existingIds.add(sr.id);
            }
          });

          if (newReports.length === 0) return prevReports;
          return [...newReports, ...prevReports];
        });
      }
    } catch (error) {
      console.log('[NGO] Server not available, using mesh only');
    }
  }, []);

  // Poll server
  useEffect(() => {
    fetchReportsFromServer();
    const interval = setInterval(fetchReportsFromServer, 5000);
    return () => clearInterval(interval);
  }, [fetchReportsFromServer]);

  // Mesh Network Listener
  useEffect(() => {
    ngoMeshService.start();

    const unsubscribe = ngoMeshService.onMessage((packet) => {
      if (packet.type === 'REPORT_NEW') {
        const { type, message, location, timestamp, photoUrl, audioUrl } = packet.payload;
        const reportId = packet.messageId || `mesh-${Date.now()}`;

        setReports(prevReports => {
          if (prevReports.some(r => r.id === reportId)) {
            console.log(`[NGO] Ignored duplicate mesh report: ${reportId}`);
            return prevReports;
          }

          const newReport: Report = {
            id: reportId,
            neighborhoodId: 'khartoum-1',
            type: type === 'water' ? ReportType.WATER_ISSUE :
              type === 'power' ? ReportType.POWER_ISSUE :
                ReportType.GENERAL,
            timestamp: timestamp || new Date().toISOString(),
            message: `${location}: ${message}`,
            isVerified: false,
            urgency: 'Medium',
            photoUrl: photoUrl,
            audioUrl: audioUrl,
          };

          // Show notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('New User Request', {
              body: `${location}: ${message}`,
              icon: '/vite.svg'
            });
          }

          return [newReport, ...prevReports];
        });
      }
    });

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8 animate-fade-in relative">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">{t('report.title')}</h1>

      {/* Community Reports Table */}
      <div className="glass-card bg-white p-6 rounded-2xl shadow-xl shadow-gray-200 border border-gray-100/50">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          {t('report.communityReports')}
          <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">{reports.length}</span>
        </h2>

        <div className="overflow-hidden rounded-xl border border-gray-100">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/80 backdrop-blur-sm">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t('dashboard.neighborhood')}
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t('report.type')}
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/3">
                  {t('report.message')}
                </th>
                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Media
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t('report.urgency')}
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t('report.verified')}
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-blue-50/30 transition-colors duration-200 group">

                  {/* Neighborhood */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3 text-xs font-bold">
                        {getNeighborhoodName(report.neighborhoodId).substring(0, 2).toUpperCase()}
                      </div>
                      {getNeighborhoodName(report.neighborhoodId)}
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {getReportTypeText(report.type)}
                  </td>

                  {/* Message */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="max-w-xs truncate" title={report.message}>
                      {report.message}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {new Date(report.timestamp).toLocaleTimeString()}
                    </div>
                  </td>

                  {/* Media */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {report.photoUrl ? (
                        <a
                          href={report.photoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
                          title="View Photo"
                        >
                          <Camera size={18} />
                        </a>
                      ) : (
                        <div className="p-2 text-gray-300"><Camera size={18} /></div>
                      )}

                      {/* Click-to-play Audio Player */}
                      {report.audioUrl ? (
                        <button
                          onClick={() => setActiveAudio(report.audioUrl || null)}
                          className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                          title="Play Voice Message"
                        >
                          <Mic size={18} />
                        </button>
                      ) : (
                        <div className="p-2 text-gray-300"><Mic size={18} /></div>
                      )}
                    </div>
                  </td>

                  {/* Urgency */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border shadow-sm
                      ${report.urgency === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' :
                        report.urgency === 'High' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                          report.urgency === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-gray-50 text-gray-700 border-gray-200'}`}>
                      {report.urgency || t('status.unknown')}
                    </span>
                  </td>

                  {/* Verified */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {report.isVerified ? (
                      <span className="flex items-center text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs font-bold border border-green-200 w-fit">
                        <CheckCircle size={14} className="mr-1" />
                        {t('report.verified')}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs italic bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleVerification(report.id)}
                        className={`
                          px-4 py-2 rounded-lg text-white font-semibold shadow-md transition-all duration-200 
                          ${report.isVerified
                            ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30'
                            : 'bg-green-600 hover:bg-green-700 shadow-green-600/30 hover:-translate-y-0.5'
                          }
                        `}
                      >
                        {report.isVerified ? 'Unverify' : t('report.verify')}
                      </button>
                      <button
                        onClick={() => deleteReport(report.id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors shadow-sm"
                        title="Delete Report"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 whitespace-nowrap text-sm text-gray-500 text-center italic">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle size={32} className="text-gray-300" />
                      </div>
                      No reports have been submitted yet.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audio Player Modal */}
      {activeAudio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-scale-up border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <Mic className="mr-2 text-purple-600" size={20} />
                Voice Message
              </h3>
              <button
                onClick={() => setActiveAudio(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <audio controls src={activeAudio} className="w-full h-10" autoPlay />
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Click outside or close to exit
            </p>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setActiveAudio(null)}></div>
        </div>
      )}
    </div>
  );
};

export default ReportsView;