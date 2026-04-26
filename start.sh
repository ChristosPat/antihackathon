#!/bin/bash
echo "Trusty Devil — AntIhackathon 2026"
echo "Εκκίνηση server στο http://localhost:8081 ..."

open_browser() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open http://localhost:8081
    else
        xdg-open http://localhost:8081 2>/dev/null || echo "Άνοιξε τον browser στο: http://localhost:8081"
    fi
}

if lsof -nP -iTCP:8081 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "Η θύρα 8081 χρησιμοποιείται ήδη. Υπάρχει ήδη server σε λειτουργία."
    open_browser
    exit 0
fi

python3 -m http.server 8081 &
SERVER_PID=$!

# Όταν πατηθεί Ctrl+C, σκότωσε τον Python server αυτόματα
trap "kill $SERVER_PID 2>/dev/null" EXIT

sleep 1

if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "Αποτυχία εκκίνησης server στη θύρα 8081."
    echo "Έλεγξε αν το python3 είναι διαθέσιμο ή αν υπάρχει conflict στη θύρα."
    exit 1
fi

open_browser

echo "Πάτα Ctrl+C για να σταματήσεις τον server."
wait $SERVER_PID
