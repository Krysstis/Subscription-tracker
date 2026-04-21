# API dokumentacija

Bazinis URL: `https://localhost:3000/api`

Apsaugotos užklausos reikalauja antraštės:
```
Authorization: Bearer <token>
```

---

## Autentifikacija

### POST /auth/register

Registruoja naują vartotoją.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Atsakymas (201):**
```json
{ "token": "eyJ..." }
```

---

### POST /auth/login

Prisijungia prie esamos paskyros.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Atsakymas (200):**
```json
{ "token": "eyJ..." }
```

---

## Prenumeratos

### GET /subscriptions

Grąžina vartotojo prenumeratų sąrašą.

**Query parametrai:**
| Parametras | Tipas | Aprašymas |
|---|---|---|
| `category` | string | Filtruoja pagal kategoriją (Streaming, Music, Productivity, Gaming, Fitness, Other) |
| `active` | boolean | `true` — tik aktyvios, `false` — tik sustabdytos |
| `sort` | string | Rikiavimas: `name`, `price`, `next_payment_date`, `created_at` |

**Pavyzdys:** `GET /subscriptions?category=Streaming&active=true&sort=price`

---

### GET /subscriptions/:id

Grąžina vieną prenumeratą pagal ID.

**Path parametras:** `id` — prenumeratos ID

**Atsakymas (200):**
```json
{
  "id": 1,
  "name": "Netflix",
  "category": "Streaming",
  "price": "15.99",
  "currency": "EUR",
  "billing_cycle": "monthly",
  "next_payment_date": "2026-04-26",
  "is_active": 1,
  "notes": "Family plan"
}
```

---

### POST /subscriptions

Sukuria naują prenumeratą.

**Body:**
```json
{
  "name": "Netflix",
  "category": "Streaming",
  "price": 15.99,
  "currency": "EUR",
  "billing_cycle": "monthly",
  "next_payment_date": "2026-05-01",
  "notes": "Family plan"
}
```

**Atsakymas (201):** sukurtas objektas

---

### PUT /subscriptions/:id

Pilnas prenumeratos atnaujinimas. Būtina siųsti visus laukus.

**Body:** tie patys laukai kaip POST + `is_active`

**Atsakymas (200):** atnaujintas objektas

---

### PATCH /subscriptions/:id

Dalinis atnaujinimas. Siųsti tik keičiamus laukus.

**Body (pavyzdys):**
```json
{ "is_active": 0 }
```

**Atsakymas (200):** atnaujintas objektas

---

### DELETE /subscriptions/:id

Ištrina prenumeratą.

**Atsakymas (204):** tuščias

---

## Statistika

### GET /stats

Grąžina vartotojo statistiką.

**Query parametrai:**
| Parametras | Tipas | Aprašymas |
|---|---|---|
| `currency` | string | Valiuta mėnesio kaštams (numatyta: EUR) |

**Atsakymas (200):**
```json
{
  "total": 7,
  "active": 6,
  "inactive": 1,
  "monthly_cost": "68.94",
  "currency": "EUR",
  "by_category": [
    { "category": "Streaming", "count": 4, "total_price": "46.96" }
  ]
}
```

---

### GET /subscriptions/upcoming

Grąžina artėjančius mokėjimus.

**Query parametrai:**
| Parametras | Tipas | Aprašymas |
|---|---|---|
| `days` | number | Dienų skaičius į priekį (numatyta: 7) |

**Atsakymas (200):** prenumeratų masyvas

---

## Klaidos

| Kodas | Reikšmė |
|---|---|
| 400 | Validacijos klaida |
| 401 | Nėra arba neteisingas JWT tokenas |
| 404 | Resursas nerastas |
| 409 | El. paštas jau užregistruotas |
| 500 | Serverio klaida |
