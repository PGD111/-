# 🎨 3D 照片墙 - 自定义修改指南

本指南将帮助您修改照片墙的图片和音乐，轻松创建属于您自己的个性化作品！

## 📸 修改照片

### 快速修改

编辑文件：`src/data/photos.ts`

这是最简单的修改方式，只需要替换照片数据即可。

### 照片数据结构

```typescript
{
  id: '1',                    // 唯一标识符（不能重复）
  url: '图片URL',              // 图片链接
  title: '照片标题',           // 显示的标题
  description: '照片描述',      // 详细描述
  author: '作者名称'           // 照片作者
}
```

### 示例：添加您自己的照片

#### 方法 1：使用网络图片

```typescript
export const photos: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    title: '我的旅行照片',
    description: '这是在巴黎拍的照片',
    author: '我自己'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    title: '森林漫步',
    description: '与大自然的亲密接触',
    author: '我自己'
  },
  // 添加更多照片...
];
```

#### 方法 2：使用本地图片

1. 将图片文件放入 `public/images/` 目录
2. 修改 URL 为本地路径：

```typescript
{
  id: '3',
  url: '/images/my-photo.jpg',
  title: '家庭聚会',
  description: '难忘的家庭时光',
  author: '我自己'
}
```

#### 方法 3：使用 Base64 图片

对于小图片或图标：

```typescript
{
  id: '4',
  url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
  title: '图标照片',
  description: '使用 Base64 编码的图片',
  author: '我自己'
}
```

### 📐 推荐图片尺寸

- **最小尺寸**: 400×300 像素
- **推荐尺寸**: 800×600 像素
- **最佳尺寸**: 1200×900 像素
- **宽高比**: 4:3 或 16:9

### 🌐 免费图片来源

1. **Unsplash** (推荐)
   - https://unsplash.com/
   - 免费高分辨率照片
   - 使用格式：`https://images.unsplash.com/photo-{ID}?w=800&h=600&fit=crop`

2. **Pexels**
   - https://www.pexels.com/
   - 免费高质量照片

3. **Pixabay**
   - https://pixabay.com/
   - 免费图片和视频

### 💡 照片修改技巧

#### 增加更多照片

目前有 24 张照片，您可以添加更多。只需在 `photos.ts` 中继续添加：

```typescript
{
  id: '25',  // 确保 ID 唯一
  url: '您的图片URL',
  title: '新照片标题',
  description: '新照片描述',
  author: '作者'
},
{
  id: '26',
  // ...更多照片
}
```

#### 删除照片

直接从数组中移除对应的对象即可。

#### 修改现有照片

直接编辑对应的字段即可。

## 🎵 修改音乐

### 快速修改

编辑文件：`src/data/musics.ts`

### 音乐数据结构

```typescript
{
  id: '1',                    // 唯一标识符
  title: '音乐标题',           // 歌曲名称
  artist: '艺术家',             // 歌手/作者
  url: '音乐URL',              // 音乐文件链接
  cover: '🎵',                 // 显示的 emoji 图标
  genre: '音乐类型'             // 音乐风格
}
```

### 示例：添加您自己的音乐

#### 方法 1：使用网络音乐

```typescript
export const musics: Music[] = [
  {
    id: '1',
    title: '我的最爱',
    artist: '我的艺术家',
    url: 'https://example.com/my-favorite-song.mp3',
    cover: '🎶',
    genre: 'Pop'
  },
  // 添加更多音乐...
];
```

#### 方法 2：使用本地音乐

1. 将音乐文件放入 `public/audio/` 目录
2. 修改 URL 为本地路径：

```typescript
{
  id: '2',
  title: '背景音乐',
  artist: '我自己',
  url: '/audio/my-background-music.mp3',
  cover: '🎧',
  genre: 'Ambient'
}
```

#### 方法 3：使用免费音乐资源

1. **SoundHelix** (当前使用)
   - https://www.soundhelix.com/examples/mp3/
   - 免费演示音乐

2. **Free Music Archive**
   - https://freemusicarchive.org/
   - 免费音乐库

3. **Jamendo**
   - https://www.jamendo.com/
   - 独立音乐平台

4. **Bensound**
   - https://www.bensound.com/
   - 免费背景音乐

5. **Mixkit**
   - https://mixkit.co/free-stock-music/
   - 免费音乐和音效

### 🎨 音乐图标推荐

您可以使用任意 emoji 作为音乐图标：

- 🎵 音符
- 🎶 多个音符
- 🎧 耳机
- 🎸 吉他
- 🎹 钢琴
- 🎷 萨克斯
- 🎺 小号
- 🎻 小提琴
- 🪕 班卓琴
- 🔊 音量
- ▶️ 播放
- 🌟 星星
- 💫 闪烁
- ✨ 闪光

### 🎭 音乐风格示例

- **Relaxing** - 放松音乐
- **Electronic** - 电子音乐
- **Ambient** - 环境音乐
- **Jazz** - 爵士乐
- **Classical** - 古典音乐
- **Pop** - 流行音乐
- **Rock** - 摇滚乐
- **Hip-Hop** - 嘻哈音乐
- **R&B** - 节奏布鲁斯
- **Acoustic** - 原声音乐

### 💡 音乐修改技巧

#### 增加更多音乐

继续在数组中添加：

```typescript
{
  id: '6',  // 继续编号
  title: '新歌曲',
  artist: '新艺术家',
  url: '新音乐URL',
  cover: '🎵',
  genre: 'New Genre'
}
```

#### 删除音乐

直接移除对应的对象即可。

#### 调整播放顺序

数组中的顺序就是播放列表中的顺序。

## ⚙️ 高级自定义

### 修改照片数量

当前布局支持 20-30 张照片效果最佳。如果您想使用不同数量：

1. 在 `photos.ts` 中添加或删除照片
2. 调整 `Scene.tsx` 中的布局参数：
   - `radius`: 控制照片分布的范围（当前为 5）
   - 根据照片数量微调

### 修改布局效果

编辑 `src/components/Scene.tsx` 中的布局算法：

#### 螺旋布局调整

```typescript
const getSpiralPosition = (index: number, total: number, radius: number) => {
  const angle = index * 0.5;  // 调整旋转角度
  const y = (index / total - 0.5) * 10;  // 调整高度范围
  // ...
};
```

#### 心形布局调整

```typescript
const getHeartPosition = (index: number, total: number, radius: number) => {
  // 调整心形大小
  const scale = radius * 0.8;  // 增大或减小
  // ...
};
```

### 修改颜色主题

编辑 `src/components/Scene.tsx` 中的光源颜色：

```typescript
<pointLight position={[10, 10, 10]} intensity={1} color="#ffd700" castShadow />
<pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
<pointLight position={[0, 10, -10]} intensity={0.5} color="#4ecdc4" />
```

推荐颜色：
- `#ffd700` 金色
- `#ff6b6b` 粉红色
- `#4ecdc4` 青色
- `#9b59b6` 紫色
- `#3498db` 蓝色
- `#e74c3c` 红色
- `#2ecc71` 绿色
- `#f39c12` 橙色

### 修改背景

编辑 `src/components/Scene.tsx`：

```typescript
<color attach="background" args={['#0a0a0f']} />
```

推荐背景色：
- `#0a0a0f` 深黑色（当前）
- `#1a1a2e` 深蓝色
- `#16213e` 海军蓝
- `#0f0f23` 暗紫色
- `#1e1e2f` 灰紫色

## 📝 完整修改示例

### 示例：创建个人作品集

```typescript
// src/data/photos.ts
export const photos: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    title: '项目一',
    description: '这是我最重要的项目',
    author: '设计师张三'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    title: '项目二',
    description: 'UI 设计作品',
    author: '设计师张三'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop',
    title: '项目三',
    description: '品牌设计',
    author: '设计师张三'
  }
];
```

```typescript
// src/data/musics.ts
export const musics: Music[] = [
  {
    id: '1',
    title: 'Creative Flow',
    artist: 'Production Music',
    url: 'https://example.com/creative-flow.mp3',
    cover: '💡',
    genre: 'Inspiration'
  },
  {
    id: '2',
    title: 'Focus Mode',
    artist: 'Study Music',
    url: 'https://example.com/focus-mode.mp3',
    cover: '🎯',
    genre: 'Focus'
  }
];
```

## 🐛 常见问题

### Q: 图片加载不出来怎么办？

A: 检查以下几点：
1. 图片 URL 是否正确
2. 图片链接是否可访问
3. 图片格式是否支持（JPG、PNG、GIF、WebP）
4. 尝试使用其他图片链接

### Q: 音乐播放不了怎么办？

A: 检查以下几点：
1. 音乐 URL 是否正确
2. 浏览器是否支持该音频格式
3. 尝试使用 MP3 格式
4. 检查浏览器控制台的错误信息

### Q: 照片数量对布局有影响吗？

A: 是的，不同布局适合不同数量：
- 螺旋布局：15-30 张
- 双螺旋：20-40 张
- 心形：20-30 张
- 环形：16-32 张
- 花瓣：18-36 张
- 波浪：20-40 张

### Q: 如何让页面加载更快？

A: 优化建议：
1. 使用适当尺寸的图片（800×600）
2. 使用 CDN 加速的图片服务
3. 减少照片数量
4. 压缩图片文件大小

## 🎉 小技巧

1. **组合布局和音乐**：根据音乐风格选择合适的布局
   - 浪漫音乐 + 心形布局
   - 电子音乐 + 波浪布局
   - 自然音乐 + 花瓣布局

2. **按主题分类**：将照片按主题分组，使用不同布局展示

3. **动态效果**：调整自动旋转速度配合音乐节奏

4. **个性化图标**：使用与照片主题相关的 emoji

## 📞 获取帮助

如果遇到问题：
1. 查看浏览器控制台的错误信息
2. 检查代码语法是否正确
3. 确认文件路径是否正确
4. 重启开发服务器

祝您创建出精彩的作品！🎨🎵
