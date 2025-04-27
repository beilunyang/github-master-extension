# GitHub Master

一个浏览器扩展，在GitHub仓库页面添加DeepWiki和GitDiagram按钮。

## 功能

- 在GitHub仓库页面导航栏添加DeepWiki按钮，点击后可直接打开对应的DeepWiki页面
- 在GitHub仓库页面导航栏添加GitDiagram按钮，点击后可直接打开对应的GitDiagram页面

## 安装方法

1. 克隆此仓库
2. 安装依赖: `npm install` 或 `pnpm install`
3. 构建扩展: `npm run build` 或 `pnpm build`
4. 在浏览器的扩展管理页面中加载扩展:
   - Chrome: 打开 `chrome://extensions/`，启用开发者模式，点击"加载已解压的扩展"，选择 `.output/chrome-mv3/` 目录
   - Firefox: 打开 `about:debugging#/runtime/this-firefox`，点击"临时加载附加组件"，选择 `.output/firefox-mv2/` 目录下的manifest.json文件

## 开发

- 启动开发服务器: `npm run dev` 或 `pnpm dev`
