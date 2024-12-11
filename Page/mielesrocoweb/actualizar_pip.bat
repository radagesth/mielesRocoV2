@echo off
echo Actualizando pip...
python.exe -m pip install --upgrade pip

if %errorlevel% neq 0 (
    echo Error al actualizar pip.
    exit /b %errorlevel%
) else (
    echo pip actualizado.
)