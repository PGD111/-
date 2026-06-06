# 3D 照片画廊 - 部署指南

## 项目概述

这是一个基于 React + Three.js 的 3D 交互式照片画廊应用，支持 6 种不同的布局动画效果和音乐播放功能。

## 部署方案

本项目支持以下部署方式（免费为主）：

### 方案 1: GitHub Pages (推荐)

#### 前置条件
- 拥有 GitHub 账户
- 已安装 Git

#### 部署步骤

1. **初始化 Git 仓库**
   ```bash
   cd 3d-photo-gallery
   git init
   git add .
   git commit -m "Initial commit: 3D photo gallery"
   ```

2. **在 GitHub 上创建新仓库**
   - 访问 https://github.com/new
   - 仓库名建议: `3d-photo-gallery`
   - 设为 Public 或 Private（Public 更适合展示）
   - 不要勾选 README、.gitignore、LICENSE 等选项（因为我们已有代码）

3. **关联远程仓库并推送**
   ```bash
   git remote add origin https://github.com/你的用户名/3d-photo-gallery.git
   git branch -M main
   git push -u origin main
   ```

4. **启用 GitHub Pages**
   - 进入你的 GitHub 仓库
   - 点击 Settings
   - 找到 Pages 选项（在左侧菜单）
   - 在 "Build and deployment" 部分：
     - Source: 选择 "Deploy from a branch"
     - Branch: 创建新分支 `gh-pages` 或先通过命令行推送
   - 或者使用 GitHub Actions 自动部署（推荐）

5. **使用 gh-pages 包自动部署（最简单方式）**
   - 安装 gh-pages 包：
     ```bash
     npm install -D gh-pages
     ```
   - 在 `package.json` 中添加：
     ```json
     {
       "homepage": "https://你的用户名.github.io/3d-photo-gallery/",
       "scripts": {
         "predeploy": "npm run build",
         "deploy": "gh-pages -d dist"
       }
     }
     ```
   - 修改 `vite.config.ts` 中的 `base` 路径：
     ```typescript
     base: '/3d-photo-gallery/',  // 替换为你的仓库名
     ```
   - 运行部署命令：
     ```bash
     npm run deploy
     ```
   - 几分钟后，访问: `https://你的用户名.github.io/3d-photo-gallery/`

### 方案 2: Vercel (最简单)

Vercel 支持直接从 GitHub 仓库部署，零配置！

1. 访问 https://vercel.com/new
2. 导入你的 GitHub 仓库
3. 点击 Deploy 即可
4. Vercel 会自动处理构建和部署

### 方案 3: Netlify

1. 访问 https://app.netlify.com/
2. 点击 "Add new site" → "Import an existing project"
3. 连接 GitHub 并导入仓库
4. 配置构建命令和输出目录：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 点击 Deploy site

## 项目功能特性

- ✨ 6 种独特的 3D 布局效果
- 🎵 背景音乐播放功能
- 📱 响应式设计
- 🎨 美观的玻璃态 UI
- 🖼️ 照片详情查看
- 🌈 动态光效

## 修改内容

### 音乐资源

已将音乐资源替换为 Pixabay 的稳定资源：
- Morning Coffee (Chill)
- Summer Breeze (Lo-Fi)
- Ambient Dreams
- Calm Piano
- Acoustic Breeze

### 项目文件结构

```
3d-photo-gallery/
├── src/
│   ├── components/
│   │   ├── Scene.tsx          # 3D 场景和布局
│   │   ├── AnimatedPhotoCard.tsx
│   │   ├── ControlPanel.tsx
│   │   ├── LayoutSwitcher.tsx
│   │   └── MusicPlayer.tsx
│   ├── data/
│   │   ├── photos.ts
│   │   └── musics.ts
│   └── App.tsx
└── dist/                      # 构建输出目录
```

## 故障排除

### 页面空白或 404
- 检查 `vite.config.ts` 中的 `base` 路径是否正确
- GitHub Pages 需要配置正确的仓库名路径

### 音乐无法播放
- 确保网络连接正常
- 有些网络环境可能会限制外部资源
- 可以修改 `src/data/musics.ts` 中的音乐链接

### 照片无法加载
- 检查网络连接
- 确保 Unsplash 资源可访问
- 可替换为本地图片资源

## 自定义说明

### 添加自己的照片

编辑 `src/data/photos.ts`：
```typescript
export const photos: Photo[] = [
  {
    id: '1',
    url: '你的图片链接',
    title: '照片标题',
    description: '照片描述',
    author: '作者名'
  }
];
```

### 修改音乐

编辑 `src/data/musics.ts` 更换音乐资源。

### 自定义部署路径

修改 `vite.config.ts` 中的 `base` 配置，根据你的部署环境调整。

## 许可证

可自由使用和修改。
