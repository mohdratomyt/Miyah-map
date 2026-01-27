import { Language, Translation, ReportType, WaterStatus, PowerStatus, GeoJsonData } from './types';

// Gemini API Model Name for text-based tasks
export const GEMINI_MODEL_TEXT_TASK = 'gemini-3-flash-preview';

// Base API URL for backend services (mocked for this frontend example)
export const API_BASE_URL = '/api';

// Supported Languages and their display names
export const LANGUAGES: { id: Language; name: string }[] = [
  { id: 'en', name: 'English' },
  { id: 'ar', name: 'العربية' },
  { id: 'fur', name: 'فور' },
  { id: 'beja', name: 'البجا' },
  { id: 'nub', name: 'النوبية' },
];

// Initial translation data (English as default)
export const TRANSLATIONS: Record<Language, Translation> = {
  en: {
    'app.title': 'MiyahMap: Water & Power Status',
    'nav.dashboard': 'Dashboard',
    'nav.reports': 'Reports',
    'nav.broadcasts': 'Broadcasts',
    'nav.ussd': 'USSD Management', // New
    'nav.settings': 'Settings',
    'dashboard.title': 'Overview Dashboard',
    'dashboard.summary': 'Summary of Critical Areas',
    'dashboard.waterScarcity': 'Water Scarcity',
    'dashboard.powerOutages': 'Power Outages',
    'dashboard.noWaterForDays': '{days} days no water',
    'dashboard.areasNeedingAttention': 'Areas Needing Attention',
    'dashboard.neighborhood': 'Neighborhood',
    'dashboard.waterStatus': 'Water Status',
    'dashboard.powerStatus': 'Power Status',
    'dashboard.lastUpdated': 'Last Updated',
    'dashboard.nearestWell': 'Nearest Well:',
    'dashboard.waterTruckSchedule': 'Water Truck Schedule:',
    'dashboard.alerts': 'Alerts:',
    'dashboard.neighborhoodsAffected': 'Neighborhoods Affected',
    'dashboard.overallStatus': 'Overall Status',
    'dashboard.neighborhoodsWithWater': 'Neighborhoods with Water',
    'dashboard.mapOverview': 'Map Overview',
    'dashboard.filterMap': 'Filter Map by Water Status:', // New
    'dashboard.filterAll': 'All', // New
    'dashboard.mapLegend': 'Map Legend', // New
    'dashboard.criticalWaterAlert': 'Critical Alert (Water)', // New
    'report.title': 'Community Reports',
    'report.communityReports': 'Community Reports',
    'report.type': 'Type',
    'report.message': 'Message',
    'report.image': 'Image',
    'report.audio': 'Audio',
    'report.verified': 'Verified',
    'report.verify': 'Verify',
    // New complaint feature keys
    'report.fileComplaint': 'File New Complaint',
    'report.selectNeighborhood': 'Select Neighborhood',
    'report.complaintType': 'Complaint Type',
    'report.description': 'Description',
    'report.urgency': 'Urgency',
    'report.urgencyLow': 'Low',
    'report.urgencyMedium': 'Medium',
    'report.urgencyHigh': 'High',
    'report.urgencyCritical': 'Critical',
    'report.uploadPhoto': 'Upload Photo',
    'report.recordAudio': 'Record Audio',
    'report.submitComplaint': 'Submit Complaint',
    'report.clearForm': 'Clear Form',
    'report.complaintSuccess': 'Complaint filed successfully!',
    'report.fillAllFields': 'Please fill all required fields.',
    'reportType.waterIssue': 'Water Issue',
    'reportType.powerIssue': 'Power Issue',
    'reportType.newInstallation': 'New Installation',
    'reportType.general': 'General',
    // New specific complaint types
    'reportType.complaintWaterQuality': 'Water Quality Issue',
    'reportType.complaintNoWaterDelivery': 'No Water Delivery',
    'reportType.complaintInfrastructureDamage': 'Infrastructure Damage (Water/Power)',
    'reportType.complaintOther': 'Other (Please Specify)',
    'map.tooltip.water': 'Water:',
    'map.tooltip.power': 'Power:',
    'map.tooltip.lastUpdated': 'Last updated:',
    'map.tooltip.daysNoWater': 'Days without water:',
    'error.api': 'API Error: {message}',
    'error.gemini': 'AI Suggestion Error: {message}',
    'loading.suggestions': 'Generating suggestions...',
    'loading.data': 'Loading data...',
    'select.language': 'Select Language',
    'button.printMaps': 'Print Paper Maps',
    // Time formatting
    'time.justNow': 'Just now',
    'time.minutesAgo': '{minutes} min ago',
    'time.hourAgo': '1 hour ago',
    'time.hoursAgo': '{hours} hours ago',
    'time.dayAgo': '1 day ago',
    'time.daysAgo': '{days} days ago',
    'time.weekAgo': '1 week ago',
    'time.weeksAgo': '{weeks} weeks ago',
    'time.monthAgo': '1 month ago',
    'time.monthsAgo': '{months} months ago',
    'time.yearAgo': '1 year ago',
    'time.yearsAgo': '{years} years ago',
    // USSD Management
    'ussd.title': 'USSD System Management',
    'ussd.systemStatus': 'System Status',
    'ussd.connected': 'Connected',
    'ussd.disconnected': 'Disconnected',
    'ussd.keyMetrics': 'Key Metrics',
    'ussd.totalCalls': 'Total Calls (24h)',
    'ussd.successfulCalls': 'Successful Calls',
    'ussd.avgResponseTime': 'Avg. Response Time (ms)',
    'ussd.peakVolume': 'Peak Call Volume',
    'ussd.recentCallLogs': 'Recent Call Logs',
    'ussd.timestamp': 'Timestamp',
    'ussd.userLocation': 'User Location',
    'ussd.query': 'Query',
    'ussd.systemResponse': 'System Response',
    'ussd.status': 'Status',
    'ussd.goToSettings': 'Go to USSD Settings',
    // Settings Page
    'settings.generalApp': 'General Application Settings',
    'settings.dataRefreshInterval': 'Data Refresh Interval',
    'settings.every15min': 'Every 15 minutes',
    'settings.everyHour': 'Every Hour',
    'settings.manual': 'Manual',
    'settings.defaultMapZoom': 'Default Map Zoom Level',
    'settings.defaultLanguage': 'Default Language', // New
    'settings.themePreference': 'Theme Preference', // New
    'settings.themeLight': 'Light', // New
    'settings.themeDark': 'Dark', // New
    'settings.themeSystem': 'System Default', // New
    'settings.offlineModeBehavior': 'Offline Mode Behavior', // New
    'settings.prioritizeDataSync': 'Prioritize Data Sync', // New
    'settings.prioritizeBattery': 'Prioritize Battery Life', // New
    'settings.manualSyncOnly': 'Manual Sync Only', // New
    'settings.mapDataDetail': 'Map Data Detail Level', // New
    'settings.mapDataLow': 'Low (Faster Load)', // New
    'settings.mapDataMedium': 'Medium', // New
    'settings.mapDataHigh': 'High (More Detail)', // New
    'settings.notifications': 'Notifications',
    'settings.emailAlerts': 'Email Alerts',
    'settings.smsAlerts': 'SMS Alerts',
    'settings.ussdConfig': 'USSD System Configuration',
    'settings.enableUssd': 'Enable USSD System',
    'settings.voiceMenuLang': 'Voice Menu Language',
    'settings.fallbackDtmf': 'Fallback to DTMF Tones',
    'settings.apiToken': 'Zain/MTN API Token',
    'settings.dataMgmt': 'Data Management',
    'settings.offlineDataRetention': 'Offline Data Retention',
    'settings.days7': '7 Days',
    'settings.days30': '30 Days',
    'settings.allAvailable': 'All Available',
    'settings.syncBluetooth': 'Sync via Bluetooth Mesh',
    'settings.userPermissions': 'User & Permissions',
    'settings.manageVerifiers': 'Manage Verifiers',
    'settings.pgpKeyMgmt': 'PGP Key Management',
  },
  ar: {
    'app.title': 'مياماب: حالة المياه والكهرباء',
    'nav.dashboard': 'لوحة القيادة',
    'nav.reports': 'التقارير',
    'nav.broadcasts': 'البثوث',
    'nav.ussd': 'إدارة USSD', // New
    'nav.settings': 'الإعدادات',
    'dashboard.title': 'لوحة القيادة العامة',
    'dashboard.summary': 'ملخص المناطق الحرجة',
    'dashboard.waterScarcity': 'نقص المياه',
    'dashboard.powerOutages': 'انقطاع الكهرباء',
    'dashboard.noWaterForDays': '{days} يوم بدون ماء',
    'dashboard.areasNeedingAttention': 'المناطق التي تحتاج اهتماماً',
    'dashboard.neighborhood': 'الحي',
    'dashboard.waterStatus': 'حالة المياه',
    'dashboard.powerStatus': 'حالة الكهرباء',
    'dashboard.lastUpdated': 'آخر تحديث',
    'dashboard.nearestWell': 'أقرب بئر:',
    'dashboard.waterTruckSchedule': 'جدول شاحنات المياه:',
    'dashboard.alerts': 'التنبيهات:',
    'dashboard.neighborhoodsAffected': 'الأحياء المتأثرة',
    'dashboard.overallStatus': 'الحالة العامة',
    'dashboard.neighborhoodsWithWater': 'أحياء بها مياه',
    'dashboard.mapOverview': 'نظرة عامة على الخريطة',
    'dashboard.filterMap': 'تصفية الخريطة حسب حالة المياه:', // New
    'dashboard.filterAll': 'الكل', // New
    'dashboard.mapLegend': 'مفتاح الخريطة', // New
    'dashboard.criticalWaterAlert': 'تنبيه حرج (مياه)', // New
    'report.title': 'تقارير المجتمع',
    'report.communityReports': 'تقارير المجتمع',
    'report.type': 'النوع',
    'report.message': 'الرسالة',
    'report.image': 'الصورة',
    'report.audio': 'الصوت',
    'report.verified': 'تم التحقق',
    'report.verify': 'تحقق',
    // New complaint feature keys
    'report.fileComplaint': 'تقديم شكوى جديدة',
    'report.selectNeighborhood': 'اختر الحي',
    'report.complaintType': 'نوع الشكوى',
    'report.description': 'الوصف',
    'report.urgency': 'الأهمية/الاستعجال',
    'report.urgencyLow': 'منخفض',
    'report.urgencyMedium': 'متوسط',
    'report.urgencyHigh': 'مرتفع',
    'report.urgencyCritical': 'حرج',
    'report.uploadPhoto': 'تحميل صورة',
    'report.recordAudio': 'تسجيل صوت',
    'report.submitComplaint': 'إرسال الشكوى',
    'report.clearForm': 'مسح النموذج',
    'report.complaintSuccess': 'تم تقديم الشكوى بنجاح!',
    'report.fillAllFields': 'يرجى ملء جميع الحقول المطلوبة.',
    'reportType.waterIssue': 'مشكلة مياه',
    'reportType.powerIssue': 'مشكلة كهرباء',
    'reportType.newInstallation': 'تركيب جديد',
    'reportType.general': 'عام',
    // New specific complaint types
    'reportType.complaintWaterQuality': 'مشكلة جودة المياه',
    'reportType.complaintNoWaterDelivery': 'عدم توفر توصيل المياه',
    'reportType.complaintInfrastructureDamage': 'أضرار البنية التحتية (مياه/كهرباء)',
    'reportType.complaintOther': 'أخرى (يرجى التحديد)',
    'map.tooltip.water': 'المياه:',
    'map.tooltip.power': 'الكهرباء:',
    'map.tooltip.lastUpdated': 'آخر تحديث:',
    'map.tooltip.daysNoWater': 'أيام بدون ماء:',
    'error.api': 'خطأ في API: {message}',
    'error.gemini': 'خطأ في اقتراح الذكاء الاصطناعي: {message}',
    'loading.suggestions': 'جارٍ إنشاء الاقتراحات...',
    'loading.data': 'جارٍ تحميل البيانات...',
    'select.language': 'اختر اللغة',
    'button.printMaps': 'طباعة خرائط ورقية',
    // Time formatting
    'time.justNow': 'الآن',
    'time.minutesAgo': 'قبل {minutes} دقيقة',
    'time.hourAgo': 'قبل ساعة',
    'time.hoursAgo': 'قبل {hours} ساعات',
    'time.dayAgo': 'قبل يوم',
    'time.daysAgo': 'قبل {days} أيام',
    'time.weekAgo': 'قبل أسبوع',
    'time.weeksAgo': 'قبل {weeks} أسابيع',
    'time.monthAgo': 'قبل شهر',
    'time.monthsAgo': 'قبل {months} أشهر',
    'time.yearAgo': 'قبل سنة',
    'time.yearsAgo': 'قبل {years} سنوات',
    // USSD Management
    'ussd.title': 'إدارة نظام USSD',
    'ussd.systemStatus': 'حالة النظام',
    'ussd.connected': 'متصل',
    'ussd.disconnected': 'غير متصل',
    'ussd.keyMetrics': 'المقاييس الرئيسية',
    'ussd.totalCalls': 'إجمالي المكالمات (24 ساعة)',
    'ussd.successfulCalls': 'المكالمات الناجحة',
    'ussd.avgResponseTime': 'متوسط وقت الاستجابة (ملي ثانية)',
    'ussd.peakVolume': 'ذروة حجم المكالمات',
    'ussd.recentCallLogs': 'سجلات المكالمات الأخيرة',
    'ussd.timestamp': 'الوقت',
    'ussd.userLocation': 'موقع المستخدم',
    'ussd.query': 'الاستعلام',
    'ussd.systemResponse': 'استجابة النظام',
    'ussd.status': 'الحالة',
    'ussd.goToSettings': 'الذهاب إلى إعدادات USSD',
    // Settings Page
    'settings.generalApp': 'الإعدادات العامة للتطبيق',
    'settings.dataRefreshInterval': 'فاصل تحديث البيانات',
    'settings.every15min': 'كل 15 دقيقة',
    'settings.everyHour': 'كل ساعة',
    'settings.manual': 'يدوي',
    'settings.defaultMapZoom': 'مستوى تكبير الخريطة الافتراضي',
    'settings.defaultLanguage': 'اللغة الافتراضية', // New
    'settings.themePreference': 'تفضيل السمة', // New
    'settings.themeLight': 'فاتح', // New
    'settings.themeDark': 'داكن', // New
    'settings.themeSystem': 'افتراضي النظام', // New
    'settings.offlineModeBehavior': 'سلوك وضع عدم الاتصال', // New
    'settings.prioritizeDataSync': 'تحديد أولوية مزامنة البيانات', // New
    'settings.prioritizeBattery': 'تحديد أولوية عمر البطارية', // New
    'settings.manualSyncOnly': 'المزامنة اليدوية فقط', // New
    'settings.mapDataDetail': 'مستوى تفاصيل بيانات الخريطة', // New
    'settings.mapDataLow': 'منخفض (تحميل أسرع)', // New
    'settings.mapDataMedium': 'متوسط', // New
    'settings.mapDataHigh': 'مرتفع (تفاصيل أكثر)', // New
    'settings.notifications': 'الإشعارات',
    'settings.emailAlerts': 'تنبيهات البريد الإلكتروني',
    'settings.smsAlerts': 'تنبيهات الرسائل النصية',
    'settings.ussdConfig': 'إعدادات نظام USSD',
    'settings.enableUssd': 'تفعيل نظام USSD',
    'settings.voiceMenuLang': 'لغة القائمة الصوتية',
    'settings.fallbackDtmf': 'الرجوع إلى نغمات DTMF',
    'settings.apiToken': 'رمز API لـ Zain/MTN',
    'settings.dataMgmt': 'إدارة البيانات',
    'settings.offlineDataRetention': 'الاحتفاظ بالبيانات غير المتصلة',
    'settings.days7': '7 أيام',
    'settings.days30': '30 يوماً',
    'settings.allAvailable': 'جميع البيانات المتاحة',
    'settings.syncBluetooth': 'المزامنة عبر شبكة البلوتوث',
    'settings.userPermissions': 'المستخدمون والأذونات',
    'settings.manageVerifiers': 'إدارة المدققين',
    'settings.pgpKeyMgmt': 'إدارة مفتاح PGP',
  },
  fur: {
    'app.title': 'مياماب: حالة المياه والكهرباء (فور)',
    'nav.dashboard': 'اللوحة (فور)',
    'nav.reports': 'التقارير (فور)',
    'nav.broadcasts': 'البثوث (فور)',
    'nav.ussd': 'إدارة USSD (فور)', // New
    'nav.settings': 'الإعدادات (فور)',
    'dashboard.title': 'لوحة القيادة العامة (فور)',
    'dashboard.summary': 'ملخص المناطق الحرجة (فور)',
    'dashboard.waterScarcity': 'نقص المياه (فور)',
    'dashboard.powerOutages': 'انقطاع الكهرباء (فور)',
    'dashboard.noWaterForDays': '{days} يوم بدون ماء (فور)',
    'dashboard.areasNeedingAttention': 'المناطق التي تحتاج اهتماماً (فور)',
    'dashboard.neighborhood': 'الحي (فور)',
    'dashboard.waterStatus': 'حالة المياه (فور)',
    'dashboard.powerStatus': 'حالة الكهرباء (فور)',
    'dashboard.lastUpdated': 'آخر تحديث (فور)',
    'dashboard.nearestWell': 'أقرب بئر (فور):',
    'dashboard.waterTruckSchedule': 'جدول شاحنات المياه (فور):',
    'dashboard.alerts': 'التنبيهات (فور):',
    'dashboard.neighborhoodsAffected': 'الأحياء المتأثرة (فور)',
    'dashboard.overallStatus': 'الحالة العامة (فور)',
    'dashboard.neighborhoodsWithWater': 'أحياء بها مياه (فور)',
    'dashboard.mapOverview': 'نظرة عامة على الخريطة (فور)',
    'dashboard.filterMap': 'تصفية الخريطة حسب حالة المياه (فور):', // New
    'dashboard.filterAll': 'الكل (فور)', // New
    'dashboard.mapLegend': 'مفتاح الخريطة (فور)', // New
    'dashboard.criticalWaterAlert': 'تنبيه حرج (مياه) (فور)', // New
    'report.title': 'تقارير المجتمع (فور)',
    'report.communityReports': 'تقارير المجتمع (فور)',
    'report.type': 'النوع (فور)',
    'report.message': 'الرسالة (فور)',
    'report.image': 'الصورة (فور)',
    'report.audio': 'الصوت (فور)',
    'report.verified': 'تم التحقق (فور)',
    'report.verify': 'تحقق (فور)',
    // New complaint feature keys
    'report.fileComplaint': 'تقديم شكوى جديدة (فور)',
    'report.selectNeighborhood': 'اختر الحي (فور)',
    'report.complaintType': 'نوع الشكوى (فور)',
    'report.description': 'الوصف (فور)',
    'report.urgency': 'الأهمية/الاستعجال (فور)',
    'report.urgencyLow': 'منخفض (فور)',
    'report.urgencyMedium': 'متوسط (فور)',
    'report.urgencyHigh': 'مرتفع (فور)',
    'report.urgencyCritical': 'حرج (فور)',
    'report.uploadPhoto': 'تحميل صورة (فور)',
    'report.recordAudio': 'تسجيل صوت (فور)',
    'report.submitComplaint': 'إرسال الشكوى (فور)',
    'report.clearForm': 'مسح النموذج (فور)',
    'report.complaintSuccess': 'تم تقديم الشكوى بنجاح! (فور)',
    'report.fillAllFields': 'يرجى ملء جميع الحقول المطلوبة. (فور)',
    'reportType.waterIssue': 'مشكلة مياه (فور)',
    'reportType.powerIssue': 'مشكلة كهرباء (فور)',
    'reportType.newInstallation': 'تركيب جديد (فور)',
    'reportType.general': 'عام (فور)',
    // New specific complaint types
    'reportType.complaintWaterQuality': 'مشكلة جودة المياه (فور)',
    'reportType.complaintNoWaterDelivery': 'عدم توفر توصيل المياه (فور)',
    'reportType.complaintInfrastructureDamage': 'أضرار البنية التحتية (مياه/كهرباء) (فور)',
    'reportType.complaintOther': 'أخرى (يرجى التحديد) (فور)',
    'map.tooltip.water': 'المياه (فور):',
    'map.tooltip.power': 'الكهرباء (فور):',
    'map.tooltip.lastUpdated': 'آخر تحديث (فور):',
    'map.tooltip.daysNoWater': 'أيام بدون ماء (فور):',
    'error.api': 'خطأ في API (فور): {message}',
    'error.gemini': 'خطأ في اقتراح الذكاء الاصطناعي (فور): {message}',
    'loading.suggestions': 'جارٍ إنشاء الاقتراحات (فور)...',
    'loading.data': 'جارٍ تحميل البيانات (فور)...',
    'select.language': 'اختر اللغة (فور)',
    'button.printMaps': 'طباعة خرائط ورقية (فور)',
    // Time formatting
    'time.justNow': 'الآن (فور)',
    'time.minutesAgo': 'قبل {minutes} دقيقة (فور)',
    'time.hourAgo': 'قبل ساعة (فور)',
    'time.hoursAgo': 'قبل {hours} ساعات (فور)',
    'time.dayAgo': 'قبل يوم (فور)',
    'time.daysAgo': 'قبل {days} أيام (فور)',
    'time.weekAgo': 'قبل أسبوع (فور)',
    'time.weeksAgo': 'قبل {weeks} أسابيع (فور)',
    'time.monthAgo': 'قبل شهر (فور)',
    'time.monthsAgo': 'قبل {months} أشهر (فور)',
    'time.yearAgo': 'قبل سنة (فور)',
    'time.yearsAgo': 'قبل {years} سنوات (فور)',
    // USSD Management
    'ussd.title': 'إدارة نظام USSD (فور)',
    'ussd.systemStatus': 'حالة النظام (فور)',
    'ussd.connected': 'متصل (فور)',
    'ussd.disconnected': 'غير متصل (فور)',
    'ussd.keyMetrics': 'المقاييس الرئيسية (فور)',
    'ussd.totalCalls': 'إجمالي المكالمات (24 ساعة) (فور)',
    'ussd.successfulCalls': 'المكالمات الناجحة (فور)',
    'ussd.avgResponseTime': 'متوسط وقت الاستجابة (ملي ثانية) (فور)',
    'ussd.peakVolume': 'ذروة حجم المكالمات (فور)',
    'ussd.recentCallLogs': 'سجلات المكالمات الأخيرة (فور)',
    'ussd.timestamp': 'الوقت (فور)',
    'ussd.userLocation': 'موقع المستخدم (فور)',
    'ussd.query': 'الاستعلام (فور)',
    'ussd.systemResponse': 'استجابة النظام (فور)',
    'ussd.status': 'الحالة (فور)',
    'ussd.goToSettings': 'الذهاب إلى إعدادات USSD (فور)',
    // Settings Page
    'settings.generalApp': 'الإعدادات العامة للتطبيق (فور)',
    'settings.dataRefreshInterval': 'فاصل تحديث البيانات (فور)',
    'settings.every15min': 'كل 15 دقيقة (فور)',
    'settings.everyHour': 'كل ساعة (فور)',
    'settings.manual': 'يدوي (فور)',
    'settings.defaultMapZoom': 'مستوى تكبير الخريطة الافتراضي (فور)',
    'settings.defaultLanguage': 'اللغة الافتراضية (فور)', // New
    'settings.themePreference': 'تفضيل السمة (فور)', // New
    'settings.themeLight': 'فاتح (فور)', // New
    'settings.themeDark': 'داكن (فور)', // New
    'settings.themeSystem': 'افتراضي النظام (فور)', // New
    'settings.offlineModeBehavior': 'سلوك وضع عدم الاتصال (فور)', // New
    'settings.prioritizeDataSync': 'تحديد أولوية مزامنة البيانات (فور)', // New
    'settings.prioritizeBattery': 'تحديد أولوية عمر البطارية (فور)', // New
    'settings.manualSyncOnly': 'المزامنة اليدوية فقط (فور)', // New
    'settings.mapDataDetail': 'مستوى تفاصيل بيانات الخريطة (فور)', // New
    'settings.mapDataLow': 'منخفض (تحميل أسرع) (فور)', // New
    'settings.mapDataMedium': 'متوسط (فور)', // New
    'settings.mapDataHigh': 'مرتفع (تفاصيل أكثر) (فور)', // New
    'settings.notifications': 'الإشعارات (فور)',
    'settings.emailAlerts': 'تنبيهات البريد الإلكتروني (فور)',
    'settings.smsAlerts': 'تنبيهات الرسائل النصية (فور)',
    'settings.ussdConfig': 'إعدادات نظام USSD (فور)',
    'settings.enableUssd': 'تفعيل نظام USSD (فور)',
    'settings.voiceMenuLang': 'لغة القائمة الصوتية (فور)',
    'settings.fallbackDtmf': 'الرجوع إلى نغمات DTMF (فور)',
    'settings.apiToken': 'رمز API لـ Zain/MTN (فور)',
    'settings.dataMgmt': 'إدارة البيانات (فور)',
    'settings.offlineDataRetention': 'الاحتفاظ بالبيانات غير المتصلة (فور)',
    'settings.days7': '7 أيام (فور)',
    'settings.days30': '30 يوماً (فور)',
    'settings.allAvailable': 'جميع البيانات المتاحة (فور)',
    'settings.syncBluetooth': 'المزامنة عبر شبكة البلوتوث (فور)',
    'settings.userPermissions': 'المستخدمون والأذونات (فور)',
    'settings.manageVerifiers': 'إدارة المدققين (فور)',
    'settings.pgpKeyMgmt': 'إدارة مفتاح PGP (فور)',
  },
  beja: {
    'app.title': 'مياماب: حالة المياه والكهرباء (البجا)',
    'nav.dashboard': 'اللوحة (البجا)',
    'nav.reports': 'التقارير (البجا)',
    'nav.broadcasts': 'البثوث (البجا)',
    'nav.ussd': 'إدارة USSD (البجا)', // New
    'nav.settings': 'الإعدادات (البجا)',
    'dashboard.title': 'لوحة القيادة العامة (البجا)',
    'dashboard.summary': 'ملخص المناطق الحرجة (البجا)',
    'dashboard.waterScarcity': 'نقص المياه (البجا)',
    'dashboard.powerOutages': 'انقطاع الكهرباء (البجا)',
    'dashboard.noWaterForDays': '{days} يوم بدون ماء (البجا)',
    'dashboard.areasNeedingAttention': 'المناطق التي تحتاج اهتماماً (البجا)',
    'dashboard.neighborhood': 'الحي (البجا)',
    'dashboard.waterStatus': 'حالة المياه (البجا)',
    'dashboard.powerStatus': 'حالة الكهرباء (البجا)',
    'dashboard.lastUpdated': 'آخر تحديث (البجا)',
    'dashboard.nearestWell': 'أقرب بئر (البجا):',
    'dashboard.waterTruckSchedule': 'جدول شاحنات المياه (البجا):',
    'dashboard.alerts': 'التنبيهات (البجا):',
    'dashboard.neighborhoodsAffected': 'الأحياء المتأثرة (البجا)',
    'dashboard.overallStatus': 'الحالة العامة (البجا)',
    'dashboard.neighborhoodsWithWater': 'أحياء بها مياه (البجا)',
    'dashboard.mapOverview': 'نظرة عامة على الخريطة (البجا)',
    'dashboard.filterMap': 'تصفية الخريطة حسب حالة المياه (البجا):', // New
    'dashboard.filterAll': 'الكل (البجا)', // New
    'dashboard.mapLegend': 'مفتاح الخريطة (البجا)', // New
    'dashboard.criticalWaterAlert': 'تنبيه حرج (مياه) (البجا)', // New
    'report.title': 'تقارير المجتمع (البجا)',
    'report.communityReports': 'تقارير المجتمع (البجا)',
    'report.type': 'النوع (البجا)',
    'report.message': 'الرسالة (البجا)',
    'report.image': 'الصورة (البجا)',
    'report.audio': 'الصوت (البجا)',
    'report.verified': 'تم التحقق (البجا)',
    'report.verify': 'تحقق (البجا)',
    // New complaint feature keys
    'report.fileComplaint': 'تقديم شكوى جديدة (البجا)',
    'report.selectNeighborhood': 'اختر الحي (البجا)',
    'report.complaintType': 'نوع الشكوى (البجا)',
    'report.description': 'الوصف (البجا)',
    'report.urgency': 'الأهمية/الاستعجال (البجا)',
    'report.urgencyLow': 'منخفض (البجا)',
    'report.urgencyMedium': 'متوسط (البجا)',
    'report.urgencyHigh': 'مرتفع (البجا)',
    'report.urgencyCritical': 'حرج (البجا)',
    'report.uploadPhoto': 'تحميل صورة (البجا)',
    'report.recordAudio': 'تسجيل صوت (البجا)',
    'report.submitComplaint': 'إرسال الشكوى (البجا)',
    'report.clearForm': 'مسح النموذج (البجا)',
    'report.complaintSuccess': 'تم تقديم الشكوى بنجاح! (البجا)',
    'report.fillAllFields': 'يرجى ملء جميع الحقول المطلوبة. (البجا)',
    'reportType.waterIssue': 'مشكلة مياه (البجا)',
    'reportType.powerIssue': 'مشكلة كهرباء (البجا)',
    'reportType.newInstallation': 'تركيب جديد (البجا)',
    'reportType.general': 'عام (البجا)',
    // New specific complaint types
    'reportType.complaintWaterQuality': 'مشكلة جودة المياه (البجا)',
    'reportType.complaintNoWaterDelivery': 'عدم توفر توصيل المياه (البجا)',
    'reportType.complaintInfrastructureDamage': 'أضرار البنية التحتية (مياه/كهرباء) (البجا)',
    'reportType.complaintOther': 'أخرى (يرجى التحديد) (البجا)',
    'map.tooltip.water': 'المياه (البجا):',
    'map.tooltip.power': 'الكهرباء (البجا):',
    'map.tooltip.lastUpdated': 'آخر تحديث (البجا):',
    'map.tooltip.daysNoWater': 'أيام بدون ماء (البجا):',
    'error.api': 'خطأ في API (البجا): {message}',
    'error.gemini': 'خطأ في اقتراح الذكاء الاصطناعي (البجا): {message}',
    'loading.suggestions': 'جارٍ إنشاء الاقتراحات (البجا)...',
    'loading.data': 'جارٍ تحميل البيانات (البجا)...',
    'select.language': 'اختر اللغة (البجا)',
    'button.printMaps': 'طباعة خرائط ورقية (البجا)',
    // Time formatting
    'time.justNow': 'الآن (البجا)',
    'time.minutesAgo': 'قبل {minutes} دقيقة (البجا)',
    'time.hourAgo': 'قبل ساعة (البجا)',
    'time.hoursAgo': 'قبل {hours} ساعات (البجا)',
    'time.dayAgo': 'قبل يوم (البجا)',
    'time.daysAgo': 'قبل {days} أيام (البجا)',
    'time.weekAgo': 'قبل أسبوع (البجا)',
    'time.weeksAgo': 'قبل {weeks} أسابيع (البجا)',
    'time.monthAgo': 'قبل شهر (البجا)',
    'time.monthsAgo': 'قبل {months} أشهر (البجا)',
    'time.yearAgo': 'قبل سنة (البجا)',
    'time.yearsAgo': 'قبل {years} سنوات (البجا)',
    // USSD Management
    'ussd.title': 'إدارة نظام USSD (البجا)',
    'ussd.systemStatus': 'حالة النظام (البجا)',
    'ussd.connected': 'متصل (البجا)',
    'ussd.disconnected': 'غير متصل (البجا)',
    'ussd.keyMetrics': 'المقاييس الرئيسية (البجا)',
    'ussd.totalCalls': 'إجمالي المكالمات (24 ساعة) (البجا)',
    'ussd.successfulCalls': 'المكالمات الناجحة (البجا)',
    'ussd.avgResponseTime': 'متوسط وقت الاستجابة (ملي ثانية) (البجا)',
    'ussd.peakVolume': 'ذروة حجم المكالمات (البجا)',
    'ussd.recentCallLogs': 'سجلات المكالمات الأخيرة (البجا)',
    'ussd.timestamp': 'الوقت (البجا)',
    'ussd.userLocation': 'موقع المستخدم (البجا)',
    'ussd.query': 'الاستعلام (البجا)',
    'ussd.systemResponse': 'استجابة النظام (البجا)',
    'ussd.status': 'الحالة (البجا)',
    'ussd.goToSettings': 'الذهاب إلى إعدادات USSD (البجا)',
    // Settings Page
    'settings.generalApp': 'الإعدادات العامة للتطبيق (البجا)',
    'settings.dataRefreshInterval': 'فاصل تحديث البيانات (البجا)',
    'settings.every15min': 'كل 15 دقيقة (البجا)',
    'settings.everyHour': 'كل ساعة (البجا)',
    'settings.manual': 'يدوي (البجا)',
    'settings.defaultMapZoom': 'مستوى تكبير الخريطة الافتراضي (البجا)',
    'settings.defaultLanguage': 'اللغة الافتراضية (البجا)', // New
    'settings.themePreference': 'تفضيل السمة (البجا)', // New
    'settings.themeLight': 'فاتح (البجا)', // New
    'settings.themeDark': 'داكن (البجا)', // New
    'settings.themeSystem': 'افتراضي النظام (البجا)', // New
    'settings.offlineModeBehavior': 'سلوك وضع عدم الاتصال (البجا)', // New
    'settings.prioritizeDataSync': 'تحديد أولوية مزامنة البيانات (البجا)', // New
    'settings.prioritizeBattery': 'تحديد أولوية عمر البطارية (البجا)', // New
    'settings.manualSyncOnly': 'المزامنة اليدوية فقط (البجا)', // New
    'settings.mapDataDetail': 'مستوى تفاصيل بيانات الخريطة (البجا)', // New
    'settings.mapDataLow': 'منخفض (تحميل أسرع) (البجا)', // New
    'settings.mapDataMedium': 'متوسط (البجا)', // New
    'settings.mapDataHigh': 'مرتفع (تفاصيل أكثر) (البجا)', // New
    'settings.notifications': 'الإشعارات (البجا)',
    'settings.emailAlerts': 'تنبيهات البريد الإلكتروني (البجا)',
    'settings.smsAlerts': 'تنبيهات الرسائل النصية (البجا)',
    'settings.ussdConfig': 'إعدادات نظام USSD (البجا)',
    'settings.enableUssd': 'تفعيل نظام USSD (البجا)',
    'settings.voiceMenuLang': 'لغة القائمة الصوتية (البجا)',
    'settings.fallbackDtmf': 'الرجوع إلى نغمات DTMF (البجا)',
    'settings.apiToken': 'رمز API لـ Zain/MTN (البجا)',
    'settings.dataMgmt': 'إدارة البيانات (البجا)',
    'settings.offlineDataRetention': 'الاحتفاظ بالبيانات غير المتصلة (البجا)',
    'settings.days7': '7 أيام (البجا)',
    'settings.days30': '30 يوماً (البجا)',
    'settings.allAvailable': 'جميع البيانات المتاحة (البجا)',
    'settings.syncBluetooth': 'المزامنة عبر شبكة البلوتوث (البجا)',
    'settings.userPermissions': 'المستخدمون والأذونات (البجا)',
    'settings.manageVerifiers': 'إدارة المدققين (البجا)',
    'settings.pgpKeyMgmt': 'إدارة مفتاح PGP (البجا)',
  },
  nub: {
    'app.title': 'مياماب: حالة المياه والكهرباء (النوبية)',
    'nav.dashboard': 'اللوحة (النوبية)',
    'nav.reports': 'التقارير (النوبية)',
    'nav.broadcasts': 'البثوث (النوبية)',
    'nav.ussd': 'إدارة USSD (النوبية)', // New
    'nav.settings': 'الإعدادات (النوبية)',
    'dashboard.title': 'لوحة القيادة العامة (النوبية)',
    'dashboard.summary': 'ملخص المناطق الحرجة (النوبية)',
    'dashboard.waterScarcity': 'نقص المياه (النوبية)',
    'dashboard.powerOutages': 'انقطاع الكهرباء (النوبية)',
    'dashboard.noWaterForDays': '{days} يوم بدون ماء (النوبية)',
    'dashboard.areasNeedingAttention': 'المناطق التي تحتاج اهتماماً (النوبية)',
    'dashboard.neighborhood': 'الحي (النوبية)',
    'dashboard.waterStatus': 'حالة المياه (النوبية)',
    'dashboard.powerStatus': 'حالة الكهرباء (النوبية)',
    'dashboard.lastUpdated': 'آخر تحديث (النوبية)',
    'dashboard.nearestWell': 'أقرب بئر (النوبية):',
    'dashboard.waterTruckSchedule': 'جدول شاحنات المياه (النوبية):',
    'dashboard.alerts': 'التنبيهات (النوبية):',
    'dashboard.neighborhoodsAffected': 'الأحياء المتأثرة (النوبية)',
    'dashboard.overallStatus': 'الحالة العامة (النوبية)',
    'dashboard.neighborhoodsWithWater': 'أحياء بها مياه (النوبية)',
    'dashboard.mapOverview': 'نظرة عامة على الخريطة (النوبية)',
    'dashboard.filterMap': 'تصفية الخريطة حسب حالة المياه (النوبية):', // New
    'dashboard.filterAll': 'الكل (النوبية)', // New
    'dashboard.mapLegend': 'مفتاح الخريطة (النوبية)', // New
    'dashboard.criticalWaterAlert': 'تنبيه حرج (مياه) (النوبية)', // New
    'report.title': 'تقارير المجتمع (النوبية)',
    'report.communityReports': 'تقارير المجتمع (النوبية)',
    'report.type': 'النوع (النوبية)',
    'report.message': 'الرسالة (النوبية)',
    'report.image': 'الصورة (النوبية)',
    'report.audio': 'الصوت (النوبية)',
    'report.verified': 'تم التحقق (النوبية)',
    'report.verify': 'تحقق (النوبية)',
    // New complaint feature keys
    'report.fileComplaint': 'تقديم شكوى جديدة (النوبية)',
    'report.selectNeighborhood': 'اختر الحي (النوبية)',
    'report.complaintType': 'نوع الشكوى (النوبية)',
    'report.description': 'الوصف (النوبية)',
    'report.urgency': 'الأهمية/الاستعجال (النوبية)',
    'report.urgencyLow': 'منخفض (النوبية)',
    'report.urgencyMedium': 'متوسط (النوبية)',
    'report.urgencyHigh': 'مرتفع (النوبية)',
    'report.urgencyCritical': 'حرج (النوبية)',
    'report.uploadPhoto': 'تحميل صورة (النوبية)',
    'report.recordAudio': 'تسجيل صوت (النوبية)',
    'report.submitComplaint': 'إرسال الشكوى (النوبية)',
    'report.clearForm': 'مسح النموذج (النوبية)',
    'report.complaintSuccess': 'تم تقديم الشكوى بنجاح! (النوبية)',
    'report.fillAllFields': 'يرجى ملء جميع الحقول المطلوبة. (النوبية)',
    'reportType.waterIssue': 'مشكلة مياه (النوبية)',
    'reportType.powerIssue': 'مشكلة كهرباء (النوبية)',
    'reportType.newInstallation': 'تركيب جديد (النوبية)',
    'reportType.general': 'عام (النوبية)',
    // New specific complaint types
    'reportType.complaintWaterQuality': 'مشكلة جودة المياه (النوبية)',
    'reportType.complaintNoWaterDelivery': 'عدم توفر توصيل المياه (النوبية)',
    'reportType.complaintInfrastructureDamage': 'أضرار البنية التحتية (مياه/كهرباء) (النوبية)',
    'reportType.complaintOther': 'أخرى (يرجى التحديد) (النوبية)',
    'map.tooltip.water': 'المياه (النوبية):',
    'map.tooltip.power': 'الكهرباء (النوبية):',
    'map.tooltip.lastUpdated': 'آخر تحديث (النوبية):',
    'map.tooltip.daysNoWater': 'أيام بدون ماء (النوبية):',
    'error.api': 'خطأ في API (النوبية): {message}',
    'error.gemini': 'خطأ في اقتراح الذكاء الاصامعي (النوبية): {message}',
    'loading.suggestions': 'جارٍ إنشاء الاقتراحات (النوبية)...',
    'loading.data': 'جارٍ تحميل البيانات (النوبية)...',
    'select.language': 'اختر اللغة (النوبية)',
    'button.printMaps': 'طباعة خرائط ورقية (النوبية)',
    // Time formatting
    'time.justNow': 'الآن (النوبية)',
    'time.minutesAgo': 'قبل {minutes} دقيقة (النوبية)',
    'time.hourAgo': 'قبل ساعة (النوبية)',
    'time.hoursAgo': 'قبل {hours} ساعات (النوبية)',
    'time.dayAgo': 'قبل يوم (النوبية)',
    'time.daysAgo': 'قبل {days} أيام (النوبية)',
    'time.weekAgo': 'قبل أسبوع (النوبية)',
    'time.weeksAgo': 'قبل {weeks} أسابيع (النوبية)',
    'time.monthAgo': 'قبل شهر (النوبية)',
    'time.monthsAgo': 'قبل {months} أشهر (النوبية)',
    'time.yearAgo': 'قبل سنة (النوبية)',
    'time.yearsAgo': 'قبل {years} سنوات (النوبية)',
    // USSD Management
    'ussd.title': 'إدارة نظام USSD (النوبية)',
    'ussd.systemStatus': 'حالة النظام (النوبية)',
    'ussd.connected': 'متصل (النوبية)',
    'ussd.disconnected': 'غير متصل (النوبية)',
    'ussd.keyMetrics': 'المقاييس الرئيسية (النوبية)',
    'ussd.totalCalls': 'إجمالي المكالمات (24 ساعة) (النوبية)',
    'ussd.successfulCalls': 'المكالمات الناجحة (النوبية)',
    'ussd.avgResponseTime': 'متوسط وقت الاستجابة (ملي ثانية) (النوبية)',
    'ussd.peakVolume': 'ذروة حجم المكالمات (النوبية)',
    'ussd.recentCallLogs': 'سجلات المكالمات الأخيرة (النوبية)',
    'ussd.timestamp': 'الوقت (النوبية)',
    'ussd.userLocation': 'موقع المستخدم (النوبية)',
    'ussd.query': 'الاستعلام (النوبية)',
    'ussd.systemResponse': 'استجابة النظام (النوبية)',
    'ussd.status': 'الحالة (النوبية)',
    'ussd.goToSettings': 'الذهاب إلى إعدادات USSD (النوبية)',
    // Settings Page
    'settings.generalApp': 'الإعدادات العامة للتطبيق (النوبية)',
    'settings.dataRefreshInterval': 'فاصل تحديث البيانات (النوبية)',
    'settings.every15min': 'كل 15 دقيقة (النوبية)',
    'settings.everyHour': 'كل ساعة (النوبية)',
    'settings.manual': 'يدوي (النوبية)',
    'settings.defaultMapZoom': 'مستوى تكبير الخريطة الافتراضي (النوبية)',
    'settings.defaultLanguage': 'اللغة الافتراضية (النوبية)', // New
    'settings.themePreference': 'تفضيل السمة (النوبية)', // New
    'settings.themeLight': 'فاتح (النوبية)', // New
    'settings.themeDark': 'داكن (النوبية)', // New
    'settings.themeSystem': 'افتراضي النظام (النوبية)', // New
    'settings.offlineModeBehavior': 'سلوك وضع عدم الاتصال (النوبية)', // New
    'settings.prioritizeDataSync': 'تحديد أولوية مزامنة البيانات (النوبية)', // New
    'settings.prioritizeBattery': 'تحديد أولوية عمر البطارية (النوبية)', // New
    'settings.manualSyncOnly': 'المزامنة اليدوية فقط (النوبية)', // New
    'settings.mapDataDetail': 'مستوى تفاصيل بيانات الخريطة (النوبية)', // New
    'settings.mapDataLow': 'منخفض (تحميل أسرع) (النوبية)', // New
    'settings.mapDataMedium': 'متوسط (النوبية)', // New
    'settings.mapDataHigh': 'مرتفع (تفاصيل أكثر) (النوبية)', // New
    'settings.notifications': 'الإشعارات (النوبية)',
    'settings.emailAlerts': 'تنبيهات البريد الإلكتروني (النوبية)',
    'settings.smsAlerts': 'تنبيهات الرسائل النصية (النوبية)',
    'settings.ussdConfig': 'إعدادات نظام USSD (النوبية)',
    'settings.enableUssd': 'تفعيل نظام USSD (النوبية)',
    'settings.voiceMenuLang': 'لغة القائمة الصوتية (النوبية)',
    'settings.fallbackDtmf': 'الرجوع إلى نغمات DTMF (النوبية)',
    'settings.apiToken': 'رمز API لـ Zain/MTN (النوبية)',
    'settings.dataMgmt': 'إدارة البيانات (النوبية)',
    'settings.offlineDataRetention': 'الاحتفاظ بالبيانات غير المتصلة (النوبية)',
    'settings.days7': '7 أيام (النوبية)',
    'settings.days30': '30 يوماً (النوبية)',
    'settings.allAvailable': 'جميع البيانات المتاحة (النوبية)',
    'settings.syncBluetooth': 'المزامنة عبر شبكة البلوتوث (النوبية)',
    'settings.userPermissions': 'المستخدمون والأذونات (النوبية)',
    'settings.manageVerifiers': 'إدارة المدققين (النوبية)',
    'settings.pgpKeyMgmt': 'إدارة مفتاح PGP (النوبية)',
  },
};

// Mock GeoJSON data for Khartoum neighborhoods
// In a real application, this would be fetched from a GIS service or a static file.
// For demonstration, we'll create a simplified GeoJSON structure.
// Fix: Explicitly type KHARTOUM_GEOJSON_DATA to GeoJsonData
export const KHARTOUM_GEOJSON_DATA: GeoJsonData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: 'khartoum-al-amarat',
        name: 'Al-Amarat',
        waterStatus: WaterStatus.SCARCE,
        powerStatus: PowerStatus.OFF,
        daysNoWater: 3,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [32.55, 15.58], [32.58, 15.58], [32.58, 15.56], [32.55, 15.56], [32.55, 15.58]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: 'khartoum-bahri',
        name: 'Khartoum Bahri',
        waterStatus: WaterStatus.NO_WATER,
        powerStatus: PowerStatus.OFF,
        daysNoWater: 10,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [32.53, 15.65], [32.56, 15.65], [32.56, 15.62], [32.53, 15.62], [32.53, 15.65]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: 'khartoum-omdurman',
        name: 'Omdurman',
        waterStatus: WaterStatus.CONTAMINATED,
        powerStatus: PowerStatus.INTERMITTENT,
        daysNoWater: 0,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [32.45, 15.64], [32.48, 15.64], [32.48, 15.60], [32.45, 15.60], [32.45, 15.64]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: 'khartoum-riyadh',
        name: 'Riyadh',
        waterStatus: WaterStatus.AVAILABLE,
        powerStatus: PowerStatus.ON,
        daysNoWater: 0,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [32.59, 15.55], [32.62, 15.55], [32.62, 15.53], [32.59, 15.53], [32.59, 15.55]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: 'khartoum-alamel',
        name: 'Al Amel',
        waterStatus: WaterStatus.NO_WATER,
        powerStatus: PowerStatus.OFF,
        daysNoWater: 7,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [32.50, 15.52], [32.53, 15.52], [32.53, 15.50], [32.50, 15.50], [32.50, 15.52]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: 'khartoum-el-sahafa',
        name: 'El Sahafa',
        waterStatus: WaterStatus.SCARCE,
        powerStatus: PowerStatus.INTERMITTENT,
        daysNoWater: 5,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [32.60, 15.48], [32.63, 15.48], [32.63, 15.46], [32.60, 15.46], [32.60, 15.48]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: 'khartoum-el-azhari',
        name: 'El Azhari',
        waterStatus: WaterStatus.AVAILABLE,
        powerStatus: PowerStatus.ON,
        daysNoWater: 0,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [32.40, 15.50], [32.43, 15.50], [32.43, 15.48], [32.40, 15.48], [32.40, 15.50]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: 'khartoum-gerif',
        name: 'Gerif',
        waterStatus: WaterStatus.NO_WATER,
        powerStatus: PowerStatus.OFF,
        daysNoWater: 12,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [32.70, 15.60], [32.73, 15.60], [32.73, 15.58], [32.70, 15.58], [32.70, 15.60]
        ]]
      }
    }
  ]
};

// Mock Neighborhood data (derived from GeoJSON properties for convenience)
export const MOCK_NEIGHBORHOOD_DATA = KHARTOUM_GEOJSON_DATA.features.map(f => ({
  id: f.properties.id,
  name: f.properties.name,
  waterStatus: f.properties.waterStatus,
  powerStatus: f.properties.powerStatus,
  lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  daysNoWater: f.properties.daysNoWater,
  // Mock additional details
  nearestWell: Math.random() > 0.5 ? `Al-Fateh Mosque, ${Math.round(Math.random() * 30) + 5} min walk` : undefined,
  waterTruckSchedule: Math.random() > 0.3 ? ['Tuesday', 'Friday'] : undefined,
  alerts: Math.random() > 0.6 ? ['Contaminated alert for River Street water.'] : undefined,
  centroid: {
    lat: f.geometry.type === 'Polygon' ? f.geometry.coordinates[0][0][1] : f.geometry.coordinates[0][0][0][1],
    lng: f.geometry.type === 'Polygon' ? f.geometry.coordinates[0][0][0] : f.geometry.coordinates[0][0][0][0],
  }
}));

// Mock Report data
export const MOCK_REPORTS = [
  {
    id: 'report-001',
    neighborhoodId: 'khartoum-bahri',
    type: ReportType.WATER_ISSUE,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    message: 'No water in Khartoum Bahri for 3 days. People are struggling.',
    imageUrl: 'https://picsum.photos/300/200',
    isVerified: true,
  },
  {
    id: 'report-002',
    neighborhoodId: 'khartoum-al-amarat',
    type: ReportType.POWER_ISSUE,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    message: 'Electricity has been off in Al-Amarat since yesterday evening.',
    isVerified: false,
  },
  {
    id: 'report-003',
    neighborhoodId: 'khartoum-omdurman',
    type: ReportType.NEW_INSTALLATION,
    timestamp: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString(),
    message: 'New hand-pump installed near Omdurman Grand Mosque. Works but needs filter.',
    audioUrl: 'mock_audio_base64_string', // Placeholder
    isVerified: false,
  },
  {
    id: 'report-004',
    neighborhoodId: 'khartoum-bahri',
    type: ReportType.WATER_ISSUE,
    timestamp: new Date(Date.now() - 2.1 * 24 * 60 * 60 * 1000).toISOString(),
    message: 'Still no water in Bahri. The situation is dire.',
    isVerified: false,
  },
  {
    id: 'report-005',
    neighborhoodId: 'khartoum-bahri',
    type: ReportType.WATER_ISSUE,
    timestamp: new Date(Date.now() - 2.2 * 24 * 60 * 60 * 1000).toISOString(),
    message: 'Three days without water in Bahri. Please help!',
    isVerified: false,
  },
  {
    id: 'report-006',
    neighborhoodId: 'khartoum-alamel',
    type: ReportType.POWER_ISSUE,
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    message: 'Power out in Al Amel for four days.',
    isVerified: true,
  }
];

// Mock Broadcast history
export const MOCK_BROADCASTS = [
  {
    id: 'b-001',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    area: 'Khartoum Bahri',
    message: 'Water truck will arrive in Khartoum Bahri tomorrow at 10 AM at the school.',
  },
  {
    id: 'b-002',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    area: 'Al-Amarat',
    message: 'Electricity maintenance is underway in Al-Amarat. Power expected to return by evening.',
  },
];

// Mock USSD Call Logs
export const MOCK_USSD_LOGS = [
  {
    id: 'ussd-001',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    userLocation: 'Al-Amarat',
    query: '1 (Water) -> Al-Amarat',
    systemResponse: 'In Al-Amarat: Water trucks come Tuesday and Friday. Nearest working well: Al-Fateh Mosque, 15 minutes walk. Contaminated alert for River Street water.',
    status: 'Success',
  },
  {
    id: 'ussd-002',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    userLocation: 'Khartoum Bahri',
    query: '2 (Electricity)',
    systemResponse: 'In Khartoum Bahri: Electricity is currently off.',
    status: 'Success',
  },
  {
    id: 'ussd-003',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    userLocation: 'Omdurman',
    query: '1 (Water) -> Omdurman',
    systemResponse: 'In Omdurman: Water is contaminated. Nearest clean water point: {placeholder}.',
    status: 'Success',
  },
  {
    id: 'ussd-004',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    userLocation: 'Riyadh',
    query: '1 (Water)',
    systemResponse: 'Error: Neighborhood not recognized. Please try again.',
    status: 'Failed',
  },
  {
    id: 'ussd-005',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    userLocation: 'Al Amel',
    query: '2 (Electricity)',
    systemResponse: 'In Al Amel: Power is off. No estimated time for return.',
    status: 'Success',
  },
];