# Makkal Kural — Backend API

Node.js + Express + MongoDB backend matching your two current screens
(**Sign in** and **Create your account**). Built so you can keep adding
routes/models as you add more screens (complaints, announcements, admin
dashboard, etc.) without restructuring.

## Stack
- Express 4
- MongoDB + Mongoose
- JWT auth (phone + password, as in your UI)
- bcryptjs for password hashing
- express-validator for input validation
- helmet, cors, rate-limiting for basic security

## 1. Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` — get a free cluster at https://www.mongodb.com/cloud/atlas, or point to a local `mongodb://localhost:27017/makkal_kural`
- `JWT_SECRET` — any long random string (e.g. `openssl rand -hex 32`)

## 2. Seed the ward dropdown

Edit the ward list in `utils/seedWards.js` to your real ward numbers/names, then:

```bash
npm run seed:wards
```

This populates the `wards` collection so `GET /api/wards` returns real data
for your "Select your ward" dropdown.

## 3. Run

```bash
npm run dev     # with nodemon, auto-restart
# or
npm start
```

Server runs on `http://localhost:5000` by default. Health check: `GET /api/health`.

In React Native, point requests at your machine's LAN IP (not `localhost`)
when testing on a physical device or emulator, e.g. `http://192.168.1.5:5000`.

## API Reference

### `GET /api/wards`
Returns the ward list for the dropdown.
```json
{ "success": true, "data": [{ "_id": "...", "number": 1, "name": "Ward 1" }] }
```

### `POST /api/auth/register`
```json
{
  "name": "Ramesh Kumar",
  "phone": "9876543210",
  "password": "mypassword",
  "address": "12 Main Street, Perur",
  "ward": "<ward _id from GET /api/wards>"
}
```
Returns `201` with the created user + JWT token.

### `POST /api/auth/login`
```json
{ "phone": "9876543210", "password": "mypassword" }
```
Returns `200` with the user + JWT token.

### `GET /api/auth/me`
Requires header: `Authorization: Bearer <token>`
Returns the logged-in user's profile.

## Error format
All errors return:
```json
{ "success": false, "message": "..." }
```
Handles duplicate phone numbers, validation errors, and invalid tokens automatically.

## Connecting from React Native

```js
const res = await fetch("http://<your-ip>:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ phone, password }),
});
const json = await res.json();
if (json.success) {
  // save json.data.token (e.g. AsyncStorage / SecureStore) and navigate in
}
```

Store the token with `expo-secure-store` (preferred over AsyncStorage for
auth tokens) and attach it as `Authorization: Bearer <token>` on every
subsequent protected request.

## Suggested next models as you add screens
- `Complaint` (citizen → ward officer issue tracking — fits your "reforms/petitions" theme)
- `Announcement` (admin-posted news per ward/constituency)
- `Poll` / `Survey` (matches a "People's Voice" concept well)
- Add an `admin` role check via the existing `authorize("admin")` middleware for any officer/admin-only screens

## Deployment options (MongoDB-based)
- **Railway** or **Render** — easiest, free/cheap tier, deploys straight from GitHub
- **MongoDB Atlas** free tier (M0) for the database — works with any host above
- Set `MONGO_URI`, `JWT_SECRET`, `CORS_ORIGIN` as environment variables on whichever host you pick
