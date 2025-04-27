import { initI18n, t } from '../src/i18n';

export default defineContentScript({
  matches: ['*://github.com/*/*'],
  main: async () => {
    await initI18n();
    
    if (!isRepositoryPage()) return;
    
    const { owner, repo } = getRepoInfo();
    if (!owner || !repo) return;
    
    loadSettings().then(settings => {
      addButtons(owner, repo, settings);
    });
  },
});

function isRepositoryPage(): boolean {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  return pathParts.length === 2;
}

function getRepoInfo(): { owner: string; repo: string } {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  if (pathParts.length >= 2) {
    return {
      owner: pathParts[0],
      repo: pathParts[1]
    };
  }
  return { owner: '', repo: '' };
}

async function loadSettings(): Promise<{ showDeepWiki: boolean; showGitDiagram: boolean }> {
  try {
    const result = await browser.storage.sync.get({
      showDeepWiki: true,
      showGitDiagram: true
    });
    return {
      showDeepWiki: result.showDeepWiki === undefined ? true : result.showDeepWiki,
      showGitDiagram: result.showGitDiagram === undefined ? true : result.showGitDiagram
    };
  } catch (error) {
    console.error('加载设置失败:', error);
    return { showDeepWiki: true, showGitDiagram: true };
  }
}

function addButtons(
  owner: string, 
  repo: string, 
  settings: { showDeepWiki: boolean; showGitDiagram: boolean }
): void {
  const navElement = document.querySelector('ul.pagehead-actions');
  if (!navElement) return;

  if (settings.showGitDiagram) {
    const gitDiagramButton = createButton(
      t('buttons.gitDiagram'),
      `https://gitdiagram.com/${owner}/${repo}`,
      t('buttons.gitDiagram'),
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill="#8957e5" d="M1.5 1.75V13.5h13.75a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75V1.75a.75.75 0 0 1 1.5 0Zm14.28 2.53-5.25 5.25a.75.75 0 0 1-1.06 0L7 7.06 4.28 9.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.25-3.25a.75.75 0 0 1 1.06 0L10 7.94l4.72-4.72a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z"></path></svg>'
    );
    navElement.prepend(gitDiagramButton);
  }
  
  if (settings.showDeepWiki) {
    const deepWikiButton = createButton(
      t('buttons.deepWiki'),
      `https://deepwiki.com/${owner}/${repo}`,
      t('buttons.deepWiki'),
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill="#8957e5" d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z"></path></svg>'
    );
    navElement.prepend(deepWikiButton);
  }
}

function createButton(text: string, url: string, title: string, iconSvg?: string): HTMLLIElement {
  const li = document.createElement('li');
  
  const a = document.createElement('a');
  a.className = 'btn btn-sm';
  a.href = url;
  a.target = '_blank';
  a.title = title;
  
  if (iconSvg) {
    const iconContainer = document.createElement('span');
    iconContainer.style.marginRight = '8px';
    iconContainer.style.display = 'inline-flex';
    iconContainer.style.verticalAlign = 'text-bottom';
    iconContainer.innerHTML = iconSvg;
    a.appendChild(iconContainer);
  }
  
  const textNode = document.createTextNode(text);
  a.appendChild(textNode);
  
  li.appendChild(a);
  return li;
}
