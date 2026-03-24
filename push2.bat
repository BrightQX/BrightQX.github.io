@echo off
chcp 65001 >nul
cd /d "%~dp0"
git add .
git commit -m "feat: 控制面板密码鉴权 + 导出发布功能"
git push
echo.
echo 推送完成！GitHub Actions 将自动构建。
pause
