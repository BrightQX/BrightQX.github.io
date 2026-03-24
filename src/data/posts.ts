import { Post } from '@/types';

export const posts: Post[] = [
  {
    id: '1',
    title: '开始我的写作之旅',
    slug: 'start-my-writing-journey',
    excerpt: '一直以来，我都想把自己的所思所想记录下来。今天，终于迈出了这一步——建了这个博客，开始认真写作。',
    date: '2026-03-20',
    readTime: 3,
    tags: ['随笔', '生活'],
    content: `# 开始我的写作之旅

一直以来，我都想把自己的所思所想记录下来。今天，终于迈出了这一步——建了这个博客，开始认真写作。

## 为什么写作？

写作对我来说，是一种**整理思绪**的方式。每天脑子里装了太多东西：技术、生活、读书笔记、碎碎念……如果不写下来，它们就像沙粒一样，很快就会从指缝间溜走。

> 写作不是为了展示聪明，而是为了理清思路。——某位不知名的人

## 我打算写什么？

大概会涉及这些方向：

- **技术分享**：编程、工具、效率方法
- **读书笔记**：好书不能只读一遍
- **生活随笔**：记录值得记录的瞬间
- **思考碰撞**：对某些问题的个人看法

## 关于更新频率

不立 flag，写多少是多少。但我会尽量保持质量，不水文章。

---

感谢你找到这里。欢迎留言交流 :)
`,
  },
  {
    id: '2',
    title: '我用了半年的效率工具清单',
    slug: 'productivity-tools',
    excerpt: '分享几个真正改变了我工作方式的效率工具，不是广告，是真实使用体验。',
    date: '2026-03-15',
    readTime: 6,
    tags: ['效率', '工具'],
    content: `# 我用了半年的效率工具清单

分享几个真正改变了我工作方式的效率工具，不是广告，是真实使用体验。

## 笔记类

### Obsidian

双向链接笔记，适合构建个人知识图谱。我所有的技术学习和思考都在里面。

**优点：**
- 完全本地，数据在自己手里
- 插件生态强大
- Markdown 原生支持

\`\`\`
// 典型的 Obsidian 笔记结构
[[概念A]] -> [[概念B]] -> [[实践案例]]
\`\`\`

## 写作类

### Typora

最干净的 Markdown 编辑器，没有之一。所见即所得，沉浸式写作体验无敌。

## 代码类

### VS Code + Copilot

AI 加持的编辑器，代码补全速度快到飞起。配合 GitHub Copilot，写模板代码效率提升 3 倍不夸张。

---

工具只是工具，最重要的还是养成**使用习惯**。买了不用，等于没买。
`,
  },
  {
    id: '3',
    title: 'TypeScript 实用技巧：我最常用的 10 个模式',
    slug: 'typescript-practical-tips',
    excerpt: '这些 TypeScript 技巧是我在真实项目中反复用到的，不是教科书上的晦涩概念，而是实战中摸爬滚打出来的经验。',
    date: '2026-03-08',
    readTime: 8,
    tags: ['技术', 'TypeScript', '编程'],
    content: `# TypeScript 实用技巧：我最常用的 10 个模式

这些 TypeScript 技巧是我在真实项目中反复用到的，不是教科书上的晦涩概念，而是实战中摸爬滚打出来的经验。

## 1. 善用 \`satisfies\` 操作符

\`satisfies\` 可以在不改变推断类型的情况下做类型检查：

\`\`\`typescript
const config = {
  port: 3000,
  host: 'localhost',
} satisfies Record<string, string | number>;

// config.port 的类型仍然是 number，而非 string | number
\`\`\`

## 2. 条件类型提取工具

\`\`\`typescript
type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;

type Result = UnwrapPromise<Promise<string>>; // string
\`\`\`

## 3. 模板字面量类型

\`\`\`typescript
type EventName = 'click' | 'focus' | 'blur';
type EventHandler = \`on\${Capitalize<EventName>}\`;
// 'onClick' | 'onFocus' | 'onBlur'
\`\`\`

## 4. 使用 \`as const\` 锁定字面量类型

\`\`\`typescript
const ROLES = ['admin', 'user', 'guest'] as const;
type Role = typeof ROLES[number]; // 'admin' | 'user' | 'guest'
\`\`\`

---

TypeScript 的类型系统深不见底，但掌握这些高频模式，应对日常开发绰绰有余。
`,
  },
  {
    id: '4',
    title: '《深度工作》读书笔记',
    slug: 'deep-work-reading-notes',
    excerpt: '卡尔·纽波特的《深度工作》彻底改变了我对时间管理的认知。记录一些关键观点和我的实践心得。',
    date: '2026-02-28',
    readTime: 5,
    tags: ['读书', '效率', '思考'],
    content: `# 《深度工作》读书笔记

卡尔·纽波特的《深度工作》彻底改变了我对时间管理的认知。记录一些关键观点和我的实践心得。

## 核心观点

> 深度工作（Deep Work）：在无干扰的状态下专注进行职业活动，使个人的认知能力得到极致发挥，这类工作能够创造新价值，提升技能，且难以复制。

与之相对的是**浮浅工作**——非认知要求的、类事务性的任务，往往在受到干扰时执行，不创造太多新价值，且容易复制。

## 为什么深度工作越来越稀缺？

1. **网络的发展**带来了持续性干扰
2. **开放式办公**让专注变得困难
3. **即时回复文化**让人们不断检查消息

## 我的实践

### 时间分块

把每天的工作时间分成几个 90 分钟的深度工作块：

| 时间段 | 安排 |
|--------|------|
| 9:00-10:30 | 深度工作块 1 |
| 11:00-12:30 | 深度工作块 2 |
| 14:00-15:30 | 深度工作块 3 |
| 其余时间 | 邮件、会议、浮浅工作 |

### 关闭通知

工作时关闭所有通知，包括手机。刚开始很不适应，但两周后发现根本不需要那么多即时通知。

---

这本书值得反复读。推荐。
`,
  },
  {
    id: '5',
    title: '用 React + Vite 搭建现代前端项目',
    slug: 'react-vite-modern-setup',
    excerpt: '从零开始搭建一个生产级的 React 项目，包含代码规范、测试、CI/CD 等配置。',
    date: '2026-02-18',
    readTime: 10,
    tags: ['技术', 'React', '前端'],
    content: `# 用 React + Vite 搭建现代前端项目

从零开始搭建一个生产级的 React 项目，包含代码规范、测试、CI/CD 等配置。

## 初始化项目

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
\`\`\`

## 配置路径别名

在 \`vite.config.ts\` 中配置：

\`\`\`typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
\`\`\`

## 添加 ESLint + Prettier

\`\`\`bash
npm install -D eslint prettier eslint-config-prettier
\`\`\`

## 目录结构推荐

\`\`\`
src/
  components/    # 可复用组件
  pages/         # 页面组件
  hooks/         # 自定义 Hook
  utils/         # 工具函数
  types/         # 类型定义
  store/         # 状态管理
\`\`\`

---

这套配置是我目前最顺手的 React 项目起始模板，希望对你也有帮助。
`,
  },
];
