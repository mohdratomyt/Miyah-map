import { Language, Translation } from '../types';
import { TRANSLATIONS } from '../constants';

export const getTranslation = (lang: Language, key: string, params?: Record<string, string | number>): string => {
  const translationMap: Translation = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  let translatedString: string = translationMap[key] || key; // Fallback to key if not found

  if (params) {
    for (const paramKey in params) {
      if (Object.prototype.hasOwnProperty.call(params, paramKey)) {
        translatedString = translatedString.replace(`{${paramKey}}`, String(params[paramKey]));
      }
    }
  }

  return translatedString;
};

export const useTranslation = (lang: Language) => {
  const t = (key: string, params?: Record<string, string | number>) => getTranslation(lang, key, params);
  return { t };
};