/**
 * vite-plugin-publish-server
 * 将博客发布服务内嵌为 Vite 插件，随 npm run dev 自动启动
 * 监听 3721 端口，无需手动运行「发布服务.bat」
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3721;
const ROOT = __dirname;

function startPublishServer(logger) {
  const server = http.createServer((req, res) => {
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

          if (posts) {
            const postsContent = `import type { Post } from '@/types';\n\nexport const posts: Post[] = ${JSON.stringify(posts, null, 2)};\n`;
            fs.writeFileSync(path.join(ROOT, 'src', 'data', 'posts.ts'), postsContent, 'utf-8');
            logger.info('[发布服务] posts.ts 已更新');
          }

          if (config) {
            const configContent = `import type { SiteConfig } from '@/types';\n\nexport const defaultConfig: SiteConfig = ${JSON.stringify(config, null, 2)};\n`;
            fs.writeFileSync(path.join(ROOT, 'src', 'data', 'config.ts'), configContent, 'utf-8');
            logger.info('[发布服务] config.ts 已更新');
          }

          // git add + commit + push
          const now = new Date().toLocaleString('zh-CN');
          execSync(`git -C "${ROOT}" add src/data/`, { stdio: 'pipe' });

          const status = execSync(`git -C "${ROOT}" status --short src/data/`).toString().trim();
          if (!status) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: true, msg: '数据无变化，无需发布' }));
            return;
          }

          execSync(`git -C "${ROOT}" commit -m "content: 博客内容更新 ${now}"`, { stdio: 'pipe' });
          execSync(`git -C "${ROOT}" push`, { stdio: 'pipe' });

          logger.info('[发布服务] 推送成功！');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true }));
        } catch (err) {
          logger.error('[发布服务] 错误: ' + err.message);
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
    logger.info(`\n🌸 博客发布服务已就绪（端口 ${PORT}），在控制面板点击「导出并发布」即可\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      logger.warn(`[发布服务] 端口 ${PORT} 已被占用，发布服务跳过启动（可能已有实例在运行）`);
    } else {
      logger.error('[发布服务] 启动失败: ' + err.message);
    }
  });

  return server;
}

export function publishServerPlugin() {
  return {
    name: 'vite-plugin-publish-server',
    configureServer(viteServer) {
      startPublishServer(viteServer.config.logger);
    },
  };
}
