# GitHub Master Extension

A browser extension that helps you quickly understand GitHub repository code by automatically adding DeepWiki and GitDiagram buttons.

*Read this in other languages: [简体中文](README_zh-CN.md)*

## Preview
![preview](https://pic.otaku.ren/20250428/AgADrxYAAjhcgFQ.png)

## Features

- Adds a DeepWiki button to the GitHub repository navigation bar - click it to directly open the corresponding DeepWiki page and better understand the code structure
- Adds a GitDiagram button to the GitHub repository navigation bar - click it to directly open the corresponding GitDiagram page and visualize code relationships
- Multiple language support, currently includes English and Chinese
- Fully customizable - show/hide any button according to your preference
- Extension name and description automatically display in your browser's language

## Installation

### Method 1: Download from GitHub Releases (Recommended)

1. Go to the [Releases](https://github.com/beilunyang/github-master-extension/releases) page
2. Download the latest version for your browser:
   - `github-master-{version}-chrome.zip` for Chrome
   - `github-master-{version}-firefox.zip` for Firefox
3. Install in your browser:
   - **Chrome**: Open `chrome://extensions/`, enable Developer mode, drag and drop the zip file to the page
   - **Firefox**: Open `about:addons`, click the gear icon, choose "Install Add-on From File", and select the downloaded zip file

### Method 2: Build from Source

1. Clone this repository
2. Install dependencies: `pnpm install`
3. Build the extension:  `pnpm build`
4. Load the extension in your browser:
   - **Chrome**: Open `chrome://extensions/`, enable Developer mode, click "Load unpacked", select the `.output/chrome-mv3/` directory
   - **Firefox**: Open `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on", select the manifest.json file in the `.output/firefox-mv2/` directory

## Development

- Start the development server: `pnpm dev`

## Release Process

1. Update the version number in `package.json`
2. Commit and create a tag:
   ```bash
   git add .
   git commit -m "Prepare for release vX.Y.Z"
   git tag vX.Y.Z
   git push origin main --tags
   ```
3. GitHub Actions will automatically build Chrome and Firefox versions and create a Release

## Contributing

Contributions via Pull Requests are welcome. Any improvements or new features will be seriously considered.

## License

[MIT](LICENSE) 