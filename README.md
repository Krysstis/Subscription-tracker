# Subscription Tracker

Web aplikacija prenumeratų (Netflix, Spotify ir kt.) sekimui su statistika, kategorijomis ir artėjančių mokėjimų peržiūra.

## Technologijos

**Backend:** Node.js, Express, MySQL, JWT, bcrypt, HTTPS  
**Frontend:** HTML, CSS, JavaScript, Fetch API

## Reikalavimai

- Node.js
- XAMPP (MySQL)
- OpenSSL (SSL sertifikatams)

## Paleidimas

### 1. Duomenų bazė

Paleisk XAMPP ir įvykdyk phpMyAdmin:

```sql
-- schema.sql turinys
-- seed.sql turinys (testiniai duomenys)
```

### 2. Backend

```bash
cd backend
npm install
```

Sukurk `.env` failą (pagal `.env.example`):

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=subscription_tracker
JWT_SECRET=tavo_slaptas_raktas
JWT_EXPIRES_IN=1h
```

Sugeneruok SSL sertifikatą:

```bash
openssl req -x509 -newkey rsa:2048 -keyout certs/key.pem -out certs/cert.pem -days 365 -nodes -subj "//CN=localhost"
```

Paleisk serverį:

```bash
npm start
```

Serveris veikia: `https://localhost:3000`

### 3. Frontend

Atidaryk `https://localhost:3000/api/health` naršyklėje ir priimk saugumo įspėjimą.

Tada atidaryk `frontend/index.html` su Live Server (VS Code plėtinys).

## API

Pilnas API aprašymas: [docs/API.md](docs/API.md)

## Funkcionalumas

- Registracija ir prisijungimas (JWT)
- Prenumeratų pridėjimas, redagavimas, šalinimas
- Filtravimas pagal kategoriją ir aktyvumą
- Statistika: aktyvios prenumeratos, mėnesio kaštai
- Artėjantys mokėjimai (7 dienų perspektyva)
- LT/EN kalbų perjungimas

## Testavimo duomenys

```
El. paštas: test@example.com
Slaptažodis: password
```
