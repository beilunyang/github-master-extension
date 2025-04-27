import en from './locales/en';
import zh_CN from './locales/zh_CN';
import zh_TW from './locales/zh_TW';

export const supportedLocales = ['en', 'zh_CN', 'zh_TW'] as const;
export type Locale = typeof supportedLocales[number];

const messages = {
  en,
  zh_CN,
  zh_TW
};

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh_CN: '简体中文',
  zh_TW: '繁體中文'
};

let currentLocale: Locale = 'en';

export async function initI18n(): Promise<void> {
  try {
    const result = await browser.storage.sync.get('locale');
    if (result.locale && supportedLocales.includes(result.locale)) {
      currentLocale = result.locale as Locale;
    } else if (result.locale === 'zh') {
      currentLocale = navigator.language.includes('TW') || 
                      navigator.language.includes('HK') || 
                      navigator.language.includes('MO') ? 'zh_TW' : 'zh_CN';
    } else {
      const browserLanguage = navigator.language;
      const languageWithRegion = browserLanguage.replace('-', '_');
      if (supportedLocales.includes(languageWithRegion as Locale)) {
        currentLocale = languageWithRegion as Locale;
      } else {
        if (browserLanguage.startsWith('zh')) {
          currentLocale = browserLanguage.includes('TW') || 
                          browserLanguage.includes('HK') || 
                          browserLanguage.includes('MO') ? 'zh_TW' : 'zh_CN';
        }
      }
    }
  } catch (error) {
    console.error('Failed to load locale:', error);
  }
}

export function getCurrentLocale(): Locale {
  return currentLocale;
}

export async function setLocale(locale: Locale): Promise<void> {
  currentLocale = locale;
  try {
    await browser.storage.sync.set({ locale });
  } catch (error) {
    console.error('Failed to save locale:', error);
  }
}

export function t(key: string): string {
  const paths = key.split('.');
  let result: any = messages[currentLocale];
  
  for (const path of paths) {
    if (result && result[path] !== undefined) {
      result = result[path];
    } else {
      result = getFromPath(messages.en, paths);
      break;
    }
  }
  
  return typeof result === 'string' ? result : key;
}

function getFromPath(obj: any, paths: string[]): any {
  let result = obj;
  for (const path of paths) {
    if (result && result[path] !== undefined) {
      result = result[path];
    } else {
      return undefined;
    }
  }
  return result;
} 