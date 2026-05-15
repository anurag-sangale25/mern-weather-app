# MERN Weather Web Application

A full-stack weather dashboard with React, Express, MongoDB, and the OpenWeatherMap current weather and 5-day forecast APIs.

## Features

- Search current weather and forecast by city
- Auto-detect weather from browser geolocation
- Recent searches stored in MongoDB
- Dark mode and unit preference stored in localStorage
- Dynamic weather backgrounds, responsive glassmorphism UI, loading and error states

## Setup

1. Install dependencies from the project root:

```bash
npm install
```

2. Update `server/.env` with your real MongoDB and OpenWeatherMap credentials:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
API_KEY=your_openweathermap_api_key
CLIENT_URL=http://localhost:5173
```

3. Run the app:

```bash
npm run dev
```

- Client: `http://localhost:5173`
- Server: `http://localhost:5000`

## Deployment

- MongoDB Atlas: create a cluster, database user, and network access rule, then place the connection string in `MONGO_URI`.
- Render: deploy `server/`, set environment variables, and use `npm install && npm start`.
- Vercel: deploy `client/`, set `VITE_API_BASE_URL` to your Render backend URL, then build with `npm run build`.
