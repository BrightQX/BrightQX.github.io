@echo off
chcp 65001 >nul
cd /d "C:\Users\91117\WorkBuddy\20260324161859\blog-app"

echo === 当前目录 ===
cd

echo.
echo === 配置 git 用户信息（如果还没配置）===
git config user.email "brightqx@example.com"
git config user.name "BrightQX"

echo.
echo === git add 所有文件 ===
git add .

echo.
echo === git commit ===
git commit -m "feat: init sakura blog"

echo.
echo === 查看 log ===
git log --oneline -3

echo.
echo === 推送到 main ===
git branch -M main
git push -u origin main

echo.
echo === 完成！===
pause
