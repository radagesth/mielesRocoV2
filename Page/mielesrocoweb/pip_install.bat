echo Ejecutando pip install...
pip install -r requirements.txt

if %errorlevel% neq 0 (
    echo Error en pip install.
    exit /b %errorlevel%
) else (
    echo pip install completado.
)