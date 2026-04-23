#!/bin/bash
echo "Trusty Devil — AntIhackathon 2026"
echo "Εκκίνηση server στο http://localhost:8081 ..."

python3 -m http.server 8081 &
SERVER_PID=$!

sleep 1

if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:8081
else
    xdg-open http://localhost:8081 2>/dev/null || echo "Άνοιξε τον browser στο: http://localhost:8081"
fi

echo "Πάτα Ctrl+C για να σταματήσεις τον server."
wait $SERVER_PID
