@echo off
echo Trusty Devil - AntIhackathon 2026
echo Εκκινηση server στο http://localhost:8081 ...

start "" python -m http.server 8081
timeout /t 1 /nobreak > nul
start http://localhost:8081

echo Κλεισε αυτο το παραθυρο για να σταματησεις τον server.
pause
