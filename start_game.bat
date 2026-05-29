@echo off
title The Chronicles of Trust - Local Service
cd /d "%~dp0"

echo [CHRONOS] Initializing Local Archivist Neural Link...
echo.

if not exist "node_modules\" (
    echo [ERROR] Neural pathways not found (node_modules is missing).
    echo Running 'npm install' now...
    echo.
    call npm install
)

echo [READY] Launching local service...
echo.
npm run dev

pause
