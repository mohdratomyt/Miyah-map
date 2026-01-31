import React, { useState, useEffect } from 'react';
import { Report, ReportType, Language } from '../types';
import { MOCK_REPORTS, MOCK_NEIGHBORHOOD_DATA } from '../constants';
import { useTranslation } from '../utils/i18n';
import { ngoMeshService } from '../services/NGOMeshService';

interface ReportsViewProps {
  currentLang: Language;
}

const ReportsView: React.FC<ReportsViewProps> = ({ currentLang }) => {
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const { t } = useTranslation(currentLang);

  // Listen for mesh network messages from users
  useEffect(() => {
    ngoMeshService.start();

    const unsubscribe = ngoMeshService.onMessage((packet) => {
      if (packet.type === 'REPORT_NEW') {
        const { type, message, location, timestamp } = packet.payload;

        const newReport: Report = {
          id: `mesh-${packet.messageId}`,
          neighborhoodId: 'khartoum-1', // Default, could be mapped from location
          type: type === 'water' ? ReportType.WATER_ISSUE :
            type === 'power' ? ReportType.POWER_ISSUE :
              ReportType.GENERAL,
          timestamp: timestamp || new Date().toISOString(),
          message: `${location}: ${message}`,
          isVerified: false,
          urgency: 'Medium',
        };

        setReports(prevReports => [newReport, ...prevReports]);

        // Show notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('New User Request', {
            body: `${location}: ${message}`,
            icon: '/vite.svg'
          });
        }
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

  // State for the new complaint form
  const [newComplaint, setNewComplaint] = useState<{
    neighborhoodId: string;
    complaintType: ReportType | '';
    description: string;
    urgency: 'Low' | 'Medium' | 'High' | 'Critical' | '';
    imageUrl?: string;
    audioUrl?: string;
    error: string | null;
  }>({
    neighborhoodId: '',
    complaintType: '',
    description: '',
    urgency: '',
    error: null,
  });

  const handleComplaintChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    setNewComplaint(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
      error: null, // Clear error on change
    }));
  };

  const handleUploadPhoto = () => {
    alert('Photo upload functionality is mocked. Setting a placeholder image URL.');
    setNewComplaint(prev => ({
      ...prev,
      imageUrl: 'https://picsum.photos/300/200?random=' + Math.random(), // Mock image
    }));
  };

  const handleRecordAudio = () => {
    alert('Audio recording functionality is mocked. Setting a placeholder audio URL.');
    setNewComplaint(prev => ({
      ...prev,
      audioUrl: 'mock_audio_base64_string', // Placeholder
    }));
  };

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    const { neighborhoodId, complaintType, description, urgency } = newComplaint;

    if (!neighborhoodId || !complaintType || !description.trim() || !urgency) {
      setNewComplaint(prev => ({ ...prev, error: t('report.fillAllFields') }));
      return;
    }

    const newReport: Report = {
      id: `report-${Date.now()}`,
      neighborhoodId,
      type: complaintType,
      timestamp: new Date().toISOString(),
      message: description.trim(),
      imageUrl: newComplaint.imageUrl,
      audioUrl: newComplaint.audioUrl,
      isVerified: false, // New complaints are unverified by default
      urgency: urgency as 'Low' | 'Medium' | 'High' | 'Critical',
    };

    setReports(prevReports => [newReport, ...prevReports]); // Add new complaint to the top
    alert(t('report.complaintSuccess'));
    handleClearForm();
  };

  const handleClearForm = () => {
    setNewComplaint({
      neighborhoodId: '',
      complaintType: '',
      description: '',
      urgency: '',
      imageUrl: undefined,
      audioUrl: undefined,
      error: null,
    });
  };

  const toggleVerification = (reportId: string) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId ? { ...report, isVerified: !report.isVerified } : report
      )
    );
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

  const getNeighborhoodName = (neighborhoodId: string) => {
    const neighborhood = MOCK_NEIGHBORHOOD_DATA.find(nb => nb.id === neighborhoodId);
    return neighborhood ? neighborhood.name : 'Unknown Neighborhood';
  };

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">{t('report.title')}</h1>

      {/* File New Complaint Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('report.fileComplaint')}</h2>
        <form onSubmit={handleSubmitComplaint} className="space-y-4">
          {newComplaint.error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{newComplaint.error}</span>
            </div>
          )}

          <div>
            <label htmlFor="neighborhoodId" className="block text-sm font-medium text-gray-700 mb-1">
              {t('report.selectNeighborhood')} <span className="text-red-500">*</span>
            </label>
            <select
              id="neighborhoodId"
              value={newComplaint.neighborhoodId}
              onChange={handleComplaintChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                         hover:border-gray-400 transition-colors duration-150 ease-in-out cursor-pointer"
              aria-label={t('report.selectNeighborhood')}
              required
            >
              <option value="">-- {t('report.selectNeighborhood')} --</option>
              {MOCK_NEIGHBORHOOD_DATA.map((nb) => (
                <option key={nb.id} value={nb.id}>
                  {nb.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="complaintType" className="block text-sm font-medium text-gray-700 mb-1">
              {t('report.complaintType')} <span className="text-red-500">*</span>
            </label>
            <select
              id="complaintType"
              value={newComplaint.complaintType}
              onChange={handleComplaintChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                         hover:border-gray-400 transition-colors duration-150 ease-in-out cursor-pointer"
              aria-label={t('report.complaintType')}
              required
            >
              <option value="">-- {t('report.complaintType')} --</option>
              <option value={ReportType.COMPLAINT_WATER_QUALITY}>{t('reportType.complaintWaterQuality')}</option>
              <option value={ReportType.COMPLAINT_NO_WATER_DELIVERY}>{t('reportType.complaintNoWaterDelivery')}</option>
              <option value={ReportType.POWER_ISSUE}>{t('reportType.powerIssue')}</option>
              <option value={ReportType.COMPLAINT_INFRASTRUCTURE_DAMAGE}>{t('reportType.complaintInfrastructureDamage')}</option>
              <option value={ReportType.COMPLAINT_OTHER}>{t('reportType.complaintOther')}</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              {t('report.description')} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              value={newComplaint.description}
              onChange={handleComplaintChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y
                         hover:border-gray-400 transition-colors duration-150 ease-in-out"
              placeholder="Describe the complaint in detail..."
              aria-label={t('report.description')}
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
              {t('report.urgency')} <span className="text-red-500">*</span>
            </label>
            <select
              id="urgency"
              value={newComplaint.urgency}
              onChange={handleComplaintChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                         hover:border-gray-400 transition-colors duration-150 ease-in-out cursor-pointer"
              aria-label={t('report.urgency')}
              required
            >
              <option value="">-- {t('report.urgency')} --</option>
              <option value="Low">{t('report.urgencyLow')}</option>
              <option value="Medium">{t('report.urgencyMedium')}</option>
              <option value="High">{t('report.urgencyHigh')}</option>
              <option value="Critical">{t('report.urgencyCritical')}</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              type="button"
              onClick={handleUploadPhoto}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors duration-200 shadow-sm text-sm"
              aria-label={t('report.uploadPhoto')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              {t('report.uploadPhoto')} {newComplaint.imageUrl && <span className="ml-2 text-green-600 font-semibold">(Attached)</span>}
            </button>
            <button
              type="button"
              onClick={handleRecordAudio}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors duration-200 shadow-sm text-sm"
              aria-label={t('report.recordAudio')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              {t('report.recordAudio')} {newComplaint.audioUrl && <span className="ml-2 text-green-600 font-semibold">(Attached)</span>}
            </button>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleClearForm}
              className="px-5 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition-colors duration-200 shadow-sm"
              aria-label={t('report.clearForm')}
            >
              {t('report.clearForm')}
            </button>
            <button
              type="submit"
              className="px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              aria-label={t('report.submitComplaint')}
            >
              <svg className="w-5 h-5 mr-2 -ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
              {t('report.submitComplaint')}
            </button>
          </div>
        </form>
      </div>

      {/* Existing Community Reports Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('report.communityReports')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('dashboard.neighborhood')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('report.type')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('report.message')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('report.image')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('report.audio')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('report.urgency')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('report.verified')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {getNeighborhoodName(report.neighborhoodId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getReportTypeText(report.type)}
                  </td>
                  <td className="px-6 py-4 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500" title={report.message}>
                    {report.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.imageUrl ? (
                      <a href={report.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 transition-colors duration-150">
                        View Image
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.audioUrl ? (
                      <audio controls src={report.audioUrl} className="w-28 h-8"></audio>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${report.urgency === 'Critical' ? 'bg-red-100 text-red-800' :
                        report.urgency === 'High' ? 'bg-orange-100 text-orange-800' :
                          report.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'}`}>
                      {report.urgency || t('status.unknown')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${report.isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {report.isVerified ? t('report.verified') : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => toggleVerification(report.id)}
                      className={`px-4 py-2 rounded-md text-white ${report.isVerified ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'} transition-colors duration-200 shadow-sm`}
                      aria-label={report.isVerified ? 'Unverify report' : 'Verify report'}
                    >
                      {report.isVerified ? 'Unverify' : t('report.verify')}
                    </button>
                  </td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    No reports to display.
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

export default ReportsView;