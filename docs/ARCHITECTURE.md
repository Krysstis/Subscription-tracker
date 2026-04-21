# Architektūra

## Bendra schema

```
Naršyklė (Frontend)
    ↕ HTTPS / Fetch API
Express serveris (Backend)
    ↕ mysql2
MySQL duomenų bazė
```

## Backend struktūra

```
backend/
├── server.js           — serverio paleidimas, middleware, routes prijungimas
├── config/
│   └── database.js     — MySQL connection pool
├── middleware/
│   ├── auth.js         — JWT tikrinimas
│   └── validation.js   — įvesties validacija (express-validator)
├── routes/
│   ├── auth.js         — /api/auth maršrutai
│   ├── subscriptions.js — /api/subscriptions maršrutai
│   └── stats.js        — /api/stats maršrutai
└── controllers/
    ├── authController.js          — register, login
    ├── subscriptionController.js  — CRUD operacijos
    └── statsController.js         — statistika, artėjantys mokėjimai
```

## Frontend struktūra

```
frontend/
├── index.html              — prisijungimas / registracija
├── dashboard.html          — prenumeratų sąrašas ir statistika
├── subscription-form.html  — prenumeratos kūrimas ir redagavimas
├── css/
│   └── style.css           — stiliai
└── js/
    ├── api.js          — centralizuotas fetch wrapper
    ├── auth.js         — login/register/logout logika
    ├── dashboard.js    — dashboard logika
    ├── subscription.js — formos logika
    ├── translations.js — LT/EN tekstai
    └── language.js     — kalbų perjungimo sistema
```

## Užklausos kelias

```
1. Naršyklė siunčia HTTP užklausą
2. server.js — cors, json, morgan middleware
3. routes/ — nukreipia į atitinkamą controller
4. middleware/auth.js — tikrina JWT (apsaugotoms užklausoms)
5. middleware/validation.js — tikrina įvesties duomenis
6. controllers/ — vykdo verslo logiką, kviečia DB
7. Atsakymas grąžinamas JSON formatu
```

## Saugumas

| Mechanizmas | Paskirtis |
|---|---|
| HTTPS (TLS) | Šifruotas ryšys tarp naršyklės ir serverio |
| JWT | Vartotojo tapatybės patvirtinimas be sesijų |
| bcrypt | Slaptažodžių šifravimas duomenų bazėje |
| express-validator | Įvesties validacija prieš DB užklausas |
| CORS | Leidžia užklausas tik iš nurodyto frontend adreso |
| User isolation | Visi DB filtrai turi `WHERE user_id = ?` |

## Duomenų bazė

Dvi lentelės: `users` ir `subscriptions` su `FOREIGN KEY` ryšiu.

`ON DELETE CASCADE` — ištrynus vartotoją, visos jo prenumeratos ištrinamos automatiškai.
