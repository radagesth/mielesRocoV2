@echo off
echo Ejecutando npm install...
npm install

if %errorlevel% neq 0 (
    echo Error en npm install.
    exit /b %errorlevel%
) else (
    echo npm install completado.
)
