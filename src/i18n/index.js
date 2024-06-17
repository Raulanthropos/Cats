import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import translationEN from '../locales/en/translation.json';
import translationES from '../locales/es/translation.json';
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // eslint-disable-next-line no-undef
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    whitelist: ['en', 'es'],
    detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
      resources: {
        en: {
          translation: translationEN,
        },
        es: {
          translation: translationES,
        },
      },
    // react: {
    //   bindI18n: 'languageChanged',
    //   bindI18nStore: '',
    //   transEmptyNodeValue: '',
    //   transSupportBasicHtmlNodes: true,
    //   transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'sup'],
    //   useSuspense: true,
    // },
  })

export default i18n
