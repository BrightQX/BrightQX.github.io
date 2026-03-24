@echo off
chcp 65001 >nul
cd /d "C:\Users\91117\WorkBuddy\20260324161859\blog-app"

echo ================================
echo        博客一键发布工具
echo ================================
echo.

:: 检查是否有改动
git status --short > temp_status.txt
set /p STATUS=<temp_status.txt
del temp_status.txt

if "%STATUS%"=="" (
    echo [!] 没有检测到任何修改，无需发布。
    echo.
    pause
    exit /b 0
)

echo [*] 检测到以下修改：
git status --short
echo.

:: 生成提交信息（带时间戳）
for /f "tokens=1-3 delims=/ " %%a in ("%date%") do set MYDATE=%%a-%%b-%%c
for /f "tokens=1-2 delims=: " %%a in ("%time%") do set MYTIME=%%a:%%b

set COMMIT_MSG=update: 博客内容更新 %MYDATE% %MYTIME%

echo [*] 提交信息：%COMMIT_MSG%
echo.

:: 提交并推送
git add .
git commit -m "%COMMIT_MSG%"

echo.
echo [*] 正在推送到 GitHub...
git push

echo.
echo ================================
echo   发布完成！约 2 分钟后生效
echo   https://BrightQX.github.io
echo ================================
echo.
pause
