import en from './locales/en';
import zh from './locales/zh';

export const supportedLocales = ['en', 'zh'] as const;
export type Locale = typeof supportedLocales[number];

const messages = {
  en,
  zh
};

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文'
};

let currentLocale: Locale = 'en';

export async function initI18n(): Promise<void> {
  try {
    const result = await browser.storage.sync.get('locale');
    if (result.locale && supportedLocales.includes(result.locale)) {
      currentLocale = result.locale as Locale;
    } else {
      const browserLocale = navigator.language.split('-')[0];
      if (supportedLocales.includes(browserLocale as Locale)) {
        currentLocale = browserLocale as Locale;
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