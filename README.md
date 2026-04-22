# Trusty Devil — AntIhackathon 2026

**Ομάδα:** Trusty Devil | **Κατηγορία:** Bracket 1 — Μαθητές  
**Διαγωνισμός:** AntIhackathon 2026 — Zone01 Athens  
**Παρουσίαση:** 27 Απριλίου 2026, A+R Expo

---

## Θέμα

Εκπαιδευτική έκθεση για τους κινδύνους της τεχνητής νοημοσύνης: deepfakes, κλωνοποίηση φωνής, χειραγώγηση. Στόχος: ο επισκέπτης να φύγει πιο ενημερωμένος από όσο ήρθε.

---

## Demos

| Σελίδα | Περιγραφή |
| ------ | --------- |
| `index.html` | Landing page — κεντρική σελίδα του περιπτέρου |
| `quiz/` | «Μπορείς να το ξεχωρίσεις;» — 8 ερωτήσεις βασισμένες σε πραγματικά περιστατικά |
| `voice-demo/` | Live κλωνοποίηση φωνής με ElevenLabs API |
| `manifesto/` | The Trustworthy AI Manifesto — ψεύτικο έγγραφο AI ηθικής (EN / ΕΛ toggle) |

---

## Πώς να τρέξεις τοπικά

```bash
python3 -m http.server 8081
```

Άνοιξε τον browser στο: `http://localhost:8081`

> Το voice demo χρειάζεται μικρόφωνο και λειτουργεί μόνο σε `localhost` ή `https`.

---

## Voice Demo — ElevenLabs API

Για πλήρη λειτουργία χρειάζεται API key από [elevenlabs.io](https://elevenlabs.io).  
Χωρίς key υπάρχει **Demo Mode** που προσομοιώνει τη διαδικασία κλωνοποίησης.

---

## Tech Stack

- HTML / CSS / JavaScript — χωρίς frameworks, χωρίς build tools
- [ElevenLabs API](https://elevenlabs.io) — voice cloning
- Web Audio API — real-time waveform visualizer

---

## Δομή Branches

| Branch | Χρήση |
| ------ | ----- |
| `main` | Τελική έκδοση για παρουσίαση |
| `dev` | Integration — δοκιμή πριν πάει στο main |
| `feature/*` | Ξεχωριστό branch για κάθε feature |
