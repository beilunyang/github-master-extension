# GitHub Master Extension

一个浏览器扩展，帮助你快速掌握 GitHub 仓库中的代码，自动添加 DeepWiki 和  GitDiagram 按钮。

*其他语言版本: [English](README.md)*

## 预览图
![preview](/screenshots/zh.png)

## 功能

- 在 GitHub 仓库页面导航栏添加 DeepWiki 按钮，点击后可直接打开对应的DeepWiki 页面，帮助你更好理解代码结构
- 在 GitHub 仓库页面导航栏添加 GitDiagram 按钮，点击后可直接打开对应的GitDiagram 页面，可视化展示代码的关系图
- 支持多语言切换，目前支持中文和英文
- 可自定义显示/隐藏任一按钮
- 插件名称和描述根据浏览器语言自动切换显示对应语言

## 安装方法

### 方法一：从 GitHub Releases 下载（推荐）

1. 前往[发布页面](https://github.com/beilunyang/github-master-extension/releases)
2. 下载适合你浏览器的最新版本：
   - Chrome 浏览器下载：`github-master-{version}-chrome.zip`
   - Firefox 浏览器下载：`github-master-{version}-firefox.zip`
3. 在浏览器中安装：
   - **Chrome**：打开 `chrome://extensions/`，启用开发者模式，将下载的 zip 文件拖放到页面上
   - **Firefox**：打开 `about:addons`，点击齿轮图标，选择"从文件安装附加组件"，选择下载的 zip 文件

### 方法二：从源码构建

1. 克隆此仓库
2. 安装依赖: `pnpm install`
3. 构建扩展: `pnpm build`
4. 在浏览器的扩展管理页面中加载扩展:
   - **Chrome**: 打开 `chrome://extensions/`，启用开发者模式，点击"加载已解压的扩展"，选择 `.output/chrome-mv3/` 目录
   - **Firefox**: 打开 `about:debugging#/runtime/this-firefox`，点击"临时加载附加组件"，选择 `.output/firefox-mv2/` 目录下的 manifest.json 文件

## 开发

- 启动开发服务器: `pnpm dev`

## 发布流程

1. 更新版本号：修改`package.json`中的版本号
2. 提交代码并创建标签：
   ```bash
   git add .
   git commit -m "准备发布 vX.Y.Z"
   git tag vX.Y.Z
   git push origin main --tags
   ```
3. GitHub Actions 会自动构建 Chrome 和 Firefox 版本并创建 Release

## 贡献代码

欢迎通过 Pull Request 献你的代码。任何改进或新功能都会被认真考虑。

## 许可证

[MIT](LICENSE)
