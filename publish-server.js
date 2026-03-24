/**
 * 博客本地发布服务
 * 监听 3721 端口，接收控制面板的导出请求
 * 将数据写入 src/data/ 源文件，然后 git push
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 3721;
const ROOT = __dirname;

function jsonToTs(varName, data) {
  return JSON.stringify(data, null, 2);
}

const server = http.createServer((req, res) => {
  // 允许本地跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/publish') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const { posts, config } = JSON.parse(body);

        // 写入 src/data/posts.ts
        if (posts) {
          const postsContent = `import type { Post } from '@/types';\n\nexport const posts: Post[] = ${jsonToTs('posts', posts)};\n`;
          fs.writeFileSync(path.join(ROOT, 'src', 'data', 'posts.ts'), postsContent, 'utf-8');
          console.log('[publish] posts.ts 已更新');
        }

        // 写入 src/data/config.ts
        if (config) {
          const configContent = `import type { SiteConfig } from '@/types';\n\nexport const defaultConfig: SiteConfig = ${jsonToTs('config', config)};\n`;
          fs.writeFileSync(path.join(ROOT, 'src', 'data', 'config.ts'), configContent, 'utf-8');
          console.log('[publish] config.ts 已更新');
        }

        // git add + commit + push
        const now = new Date().toLocaleString('zh-CN');
        execSync(`git -C "${ROOT}" add src/data/`, { stdio: 'pipe' });
        
        // 检查是否有改动
        const status = execSync(`git -C "${ROOT}" status --short src/data/`).toString().trim();
        if (!status) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true, msg: '数据无变化，无需发布' }));
          return;
        }

        execSync(`git -C "${ROOT}" commit -m "content: 博客内容更新 ${now}"`, { stdio: 'pipe' });
        execSync(`git -C "${ROOT}" push`, { stdio: 'pipe' });

        console.log('[publish] 推送成功！');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (err) {
        console.error('[publish] 错误:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n🌸 博客发布服务已启动`);
  console.log(`   监听端口: ${PORT}`);
  console.log(`   保持此窗口开启，然后在控制面板点击「导出并发布」\n`);
});
