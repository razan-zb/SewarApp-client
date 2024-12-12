import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '../locales/en.json';
import ar from '../locales/ar.json';
import heb from '../locales/heb.json';
const LANGUAGE_KEY = 'appLanguage';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    heb: { translation: heb },
  },
  lng: 'en', // default language
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export const changeLanguage = async (language) => {
  await AsyncStorage.setItem(LANGUAGE_KEY, language);
  i18n.changeLanguage(language);
};

export const loadLanguage = async () => {
  const language = await AsyncStorage.getItem(LANGUAGE_KEY);
  if (language) {
    i18n.changeLanguage(language);
  }
};

export const getCurrentLanguage = () => {
  return i18n.language;
};

export default i18n;
