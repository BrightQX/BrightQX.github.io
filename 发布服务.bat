@echo off
chcp 65001 >nul
echo.
echo  🌸 博客发布服务
echo  ================
echo  保持此窗口开启，然后在控制面板点击「导出并发布」
echo.
cd /d "%~dp0"
node publish-server.js
pause
