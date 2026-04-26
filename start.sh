#!/bin/bash
echo "Trusty Devil — AntIhackathon 2026"
echo "Εκκίνηση server στο http://localhost:8081 ..."

# Αν τρέχει ήδη server στο 8081, σκότωσέ τον πρώτα
pkill -f "http.server 8081" 2>/dev/null
sleep 0.3

python3 -m http.server 8081 &
SERVER_PID=$!

# Όταν πατηθεί Ctrl+C, σκότωσε τον Python server αυτόματα
trap "kill $SERVER_PID 2>/dev/null" EXIT

sleep 1

if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:8081
else
    xdg-open http://localhost:8081 2>/dev/null || echo "Άνοιξε τον browser στο: http://localhost:8081"
fi

echo "Πάτα Ctrl+C για να σταματήσεις τον server."
wait $SERVER_PID
