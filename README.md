# Blog MEAN Stack
Aplikacja blogowa zbudowana na stosie technologicznym MEAN (MongoDB, Express, Angular, Node.js).

## Wymagania

- **Node.js** v18+ (pobierz z [nodejs.org](https://nodejs.org/))
- **MongoDB** (lokalna instancja lub Atlas MongoDB)
- **npm**
- **Angular CLI** (instalacja: `npm install -g @angular/cli`)

##  Instalacja i Uruchomienie

### 1. Backend (Express + MongoDB)

```bash
# Przejdź do folderu backend
cd backend/mean-app

# Zainstaluj zależności
npm install

# Uruchom serwer w trybie development
npm start
# lub z nodemon (hot-reload)
npm run dev
```

**Backend będzie dostępny na:** `http://localhost:3000`

### 2. Frontend (Angular)

```bash
# Przejdź do folderu frontend
cd front/angular

# Zainstaluj zależności
npm install

# Uruchom aplikację
ng serve
# lub
npm start
```

**Frontend będzie dostępny na:** `http://localhost:4200`

### 3. Konfiguracja MongoDB

Aplikacja domyślnie łączy się z MongoDB na `mongodb://localhost:27017/blog`

Aby zmienić URL bazy danych, edytuj plik:
```
backend/mean-app/lib/config.ts
```

Zmień linię:
```typescript
const mongoUrl = 'mongodb://localhost:27017/blog'; // Zmień tutaj
```

## Zaimplementowane Funkcjonalności

### System komentarzy
Dodana możliwość komentowania postów.

### Paginacja postów
Zaimplementowana paginacja listy postów do 5 na stronę wyświetlenie ilości wszystkich stron.

### System polubień (like/unlike)
Dodana możliwość polubienia postów.


### Filtr Slangu Młodzieży
Zaimplementowana własna funkcjonalność.


## Struktura Projektu

```
project-root/
├── backend/
│   └── mean-app/
│       ├── lib/
│       │   ├── app.ts              # Konfiguracja Express
│       │   ├── config.ts           # Ustawienia bazy danych
│       │   ├── index.ts            # Punkt wejścia
│       │   ├── controllers/        # Logika biznesowa
│       │   ├── models/             # Modele Mongoose
│       │   ├── schemas/            # Schematy MongoDB
│       │   ├── services/           # Serwisy danych
│       │   ├── middlewares/        # Custom middleware
│       │   └── interfaces/         # TypeScript interfaces
│       ├── package.json
│       ├── tsconfig.json
│       └── nodemon.json
│
├── front/
│   └── angular/
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/     # Komponenty Angular
│       │   │   ├── services/       # Serwisy HTTP
│       │   │   ├── directives/     # Custom directives
│       │   │   ├── pipes/          # Custom pipes
│       │   │   ├── models/         # TypeScript models
│       │   │   ├── app.ts          # Root component
│       │   │   ├── app.routes.ts   # Routing
│       │   │   └── app.config.ts   # App config
│       │   ├── styles.scss         # Global styles
│       │   ├── index.html          # HTML template
│       │   └── main.ts             # Bootstrap
│       ├── angular.json
│       ├── package.json
│       └── tsconfig.json
│
└── README.md                        # Ten plik
```

## Stack Technologiczny

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework webowy
- **MongoDB** - Baza danych NoSQL
- **Mongoose** - ODM dla MongoDB
- **TypeScript** - Statycznie typowany JavaScript
- **bcryptjs** - Haszowanie haseł
- **jsonwebtoken** - JWT authentication
- **nodemon** - Hot reload w development

### Frontend
- **Angular 18** - Framework aplikacji
- **TypeScript** - Statycznie typowany JavaScript
- **RxJS** - Reactive programming
- **SCSS** - Preproceso CSS
- **HttpClient** - HTTP komunikacja
- **Angular Router** - Routing aplikacji
- **Font Awesome** - Biblioteka ikon

## API Endpoints

### Autentykacja
- `POST /api/user/register` - Rejestracja
- `POST /api/user/auth` - Logowanie
- `POST /api/user/logout` - Wylogowanie

### Posty
- `GET /api/posts` - Pobranie postów (z paginacją)
- `POST /api/posts` - Utworzenie posta
- `GET /api/posts/:id` - Pobranie szczegółów posta
- `DELETE /api/posts/:id` - Usunięcie posta
- `GET /api/posts/:id/view` - Inkrementacja licznika wyświetleń

### Komentarze
- `POST /api/comments` - Dodanie komentarza
- `GET /api/comments/:postId` - Pobranie komentarzy posta
- `DELETE /api/comments/:id` - Usunięcie komentarza

### Zakładki
- `POST /api/likes` - Dodanie/usunięcie zakładki
- `GET /api/likes/check/:postId` - Sprawdzenie czy post jest zaznaczony
- `GET /api/likes/bookmarks/:userId` - Pobranie wszystkich zakładek użytkownika

## Podstawowe Operacje

### Rejestracja
1. Przejdź do strony logowania
2. Kliknij "Zarejestruj się tutaj"
3. Wypełnij formularz (imię, email, login, hasło)
4. Kliknij "Rejestruj się"

### Tworzenie Posta
1. Zaloguj się na swoje konto
2. Przejdź do sekcji "Dodaj post"
3. Wypełnij tytuł, tekst i dodaj obrazek
4. Kliknij "Opublikuj"

### Ocenianie Posta
1. Otwórz szczegóły posta
2. Kliknij na gwiazdkę żeby dać ocenę
3. Średnia ocena zostanie zaktualizowana

### Dodanie Komentarza
1. Otwórz szczegóły posta
2. Przewiń do sekcji komentarzy
3. Wpisz komentarz w polu
4. Kliknij "Wyślij"

### Zaznaczenie Posta jako Ulubionego
1. Otwórz szczegóły posta
2. Kliknij ikonę serca (zakładka)
3. Przejdź do "Zakładek" aby zobaczyć wszystkie zaznaczone posty

## Przełączanie Motywu
- Kliknij ikonę słońca/księżyca w górnym prawym rogu
- Preferencja zostanie zapamiętana

## Troubleshooting

### Problem: Błąd połączenia z MongoDB
**Rozwiązanie:** Upewnij się że MongoDB działa lokalnie lub sprawdź URL w `config.ts`

### Problem: Port 3000 już zajęty
**Rozwiązanie:** Zmień port w `backend/mean-app/lib/app.ts`

### Problem: Port 4200 już zajęty
**Rozwiązanie:** Uruchom z innym portem: `ng serve --port 4201`

### Problem: Gwiazdki nie wyświetlają się
**Rozwiązanie:** Upewnij się że Font Awesome jest załadowany (sprawdź `src/index.html`)

