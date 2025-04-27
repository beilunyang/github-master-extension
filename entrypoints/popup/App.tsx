import { useState, useEffect } from 'react';
import './App.css';
import { getCurrentLocale, initI18n, Locale, localeNames, setLocale, supportedLocales, t } from '../../src/i18n';

function App() {
  const [showDeepWiki, setShowDeepWiki] = useState(true);
  const [showGitDiagram, setShowGitDiagram] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [locale, setLocaleState] = useState<Locale>(getCurrentLocale());

  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        await initI18n();
        setLocaleState(getCurrentLocale());
        
        const result = await browser.storage.sync.get({
          showDeepWiki: true,
          showGitDiagram: true
        });
        
        setShowDeepWiki(result.showDeepWiki);
        setShowGitDiagram(result.showGitDiagram);
      } catch (error) {
        console.error('加载设置失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const saveSettings = async (newShowDeepWiki: boolean, newShowGitDiagram: boolean) => {
    try {
      await browser.storage.sync.set({
        showDeepWiki: newShowDeepWiki,
        showGitDiagram: newShowGitDiagram
      });
    } catch (error) {
      console.error('保存设置失败:', error);
    }
  };

  const handleDeepWikiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setShowDeepWiki(newValue);
    saveSettings(newValue, showGitDiagram);
  };

  const handleGitDiagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setShowGitDiagram(newValue);
    saveSettings(showDeepWiki, newValue);
  };
  
  const handleLocaleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale;
    await setLocale(newLocale);
    setLocaleState(newLocale);
  };

  if (isLoading) {
    return (
      <div className="popup-container">
        <div className="loading">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="popup-container">
      <h1>{t('app.title')}</h1>
      
      <div className="settings-container">
        <div className="setting-item">
          <label htmlFor="deepwiki-checkbox">
            <div className="label-content">
              <span className="button-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                  <path fill="#8957e5" d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z"></path>
                </svg>
              </span>
              {t('settings.showDeepWiki')}
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="deepwiki-checkbox"
                checked={showDeepWiki}
                onChange={handleDeepWikiChange}
              />
              <span className="toggle-slider"></span>
            </div>
          </label>
        </div>
        
        <div className="setting-item">
          <label htmlFor="gitdiagram-checkbox">
            <div className="label-content">
              <span className="button-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                  <path fill="#8957e5" d="M1.5 1.75V13.5h13.75a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75V1.75a.75.75 0 0 1 1.5 0Zm14.28 2.53-5.25 5.25a.75.75 0 0 1-1.06 0L7 7.06 4.28 9.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.25-3.25a.75.75 0 0 1 1.06 0L10 7.94l4.72-4.72a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z"></path>
                </svg>
              </span>
              {t('settings.showGitDiagram')}
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="gitdiagram-checkbox"
                checked={showGitDiagram}
                onChange={handleGitDiagramChange}
              />
              <span className="toggle-slider"></span>
            </div>
          </label>
        </div>
        
        <div className="setting-item">
          <label htmlFor="language-select">
            <div className="label-content">
              <span className="button-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                  <path fill="#8957e5" d="M10.236 4.982a2.5 2.5 0 0 1 3.983 1.999 2.5 2.5 0 0 1-1.495 2.288 2.643 2.643 0 0 1 .722 1.085 3.97 3.97 0 0 0 1.967-3.373 3.97 3.97 0 0 0-6.5-3.063A2.44 2.44 0 0 1 10.236 4.982ZM8.5 7c.516 0 .984.194 1.339.512l-1.598 1.598a2.37 2.37 0 0 1-.116-.4c-.048-.23-.075-.473-.075-.73 0-.535.2-1.022.528-1.387.407-.456.96-.593 1.261-.593ZM6.5 4.982a2.5 2.5 0 0 1 3.98 2.014c0 .172-.02.339-.057.496l-1.962 1.962A2.54 2.54 0 0 1 8 9.5c-.254 0-.495-.044-.718-.125l-1.369 1.37a3.97 3.97 0 0 0 6.59-3.063 3.97 3.97 0 0 0-6.5-3.063c.147.414.167.808.249 1.023.116-.505.232-.505.248-.66ZM4.5 9.5a2 2 0 1 1 3.667 1.12 1.55 1.55 0 0 0-.386-.489l-.66.66c.476.156.471.4.472.397a2 2 0 0 1-3.093-1.688Zm.417-5.393a.75.75 0 0 1 1.06 0l6.5 6.5a.75.75 0 0 1-1.06 1.06l-6.5-6.5a.75.75 0 0 1 0-1.06Z"></path>
                </svg>
              </span>
              {t('settings.language')}
            </div>
            <select
              id="language-select"
              value={locale}
              onChange={handleLocaleChange}
              className="language-select"
            >
              {supportedLocales.map((code) => (
                <option key={code} value={code}>
                  {localeNames[code]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="footer">
        <p>{t('settings.autoSave')}</p>
        <p className="author-info">
          <span>{t('author.createdBy')} </span>
          <a href="https://github.com/beilunyang" target="_blank" rel="noopener noreferrer">
            BeilunYang
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
