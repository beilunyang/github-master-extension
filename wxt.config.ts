import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'GitHub Master',
    description: 'GitHub 增强插件，帮助你快速掌握仓库中的代码，自动添加 DeepWiki 和 GitDiagram 按钮',
    permissions: ['activeTab', 'storage']
  }
});
