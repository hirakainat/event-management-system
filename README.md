# Evently — Event Management System

A simple React + Redux Toolkit event management app using the Ticketmaster Discovery API.

## Features
- Simulated registration, login and logout (no backend)
- Login state saved in local storage
- Search and city filter for Ticketmaster events
- Event details page
- Register for an event and prevent duplicate registration
- My Events with upcoming/completed sections and cancellation
- Protected event registration and My Events routes

## Requirements
- Node.js and npm
- A Ticketmaster Discovery API key from https://developer.ticketmaster.com/

## Setup
1. Extract the project ZIP and open its folder in VS Code.
2. Open a terminal in the project folder.
3. Install packages:
   ```bash
   npm install
   ```
4. Copy `.env.example` to `.env`.
5. Put your API key in `.env`:
   ```env
   VITE_TICKETMASTER_API_KEY=your_real_key_here
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```
7. Open the local URL printed by Vite.

## Build check
```bash
npm run build
```

## Notes
- Authentication is a frontend-only simulation. Do not use a real password.
- Registrations are stored in local storage on this browser.
- Never commit `.env` or your API key. `.gitignore` excludes `.env`.
- Ticketmaster availability and event data depend on the API response and your API key.
