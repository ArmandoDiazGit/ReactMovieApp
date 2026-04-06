# MovieApp

A React-based movie discovery app for browsing, searching, and exploring movies with detailed information, cast, and trailers.

## Features

- **Hero Slider** - Showcase of featured movies on the home page
- **Movie Search** - Real-time search with debounced input
- **Category Browsing** - Explore movies by Popular, Top Rated, Upcoming, and Now Playing
- **Movie Details** - Comprehensive pages with ratings, cast, genres, and trailers
- **Responsive Design** - Optimized for all screen sizes
- **Loading States** - Skeleton loaders for smooth user experience
- **Error Handling** - Retry states and graceful fallbacks

## Screenshots

| Home
|------|
| ![Home](public/screenshots/home.png)

## Tech Stack

![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0.1-646CFF?logo=vite)
![React Router](https://img.shields.io/badge/React_Router-7.13.2-CA4245?logo=react-router)
![Lucide](https://img.shields.io/badge/Lucide_React-1.7.0-61DAFB)

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Routes

| Path | Description |
|------|-------------|
| `/` | Home page with hero slider and movie categories |
| `/search` | Search movies by title, genre, or keyword |
| `/movie/:id` | Detailed movie information page |
| `/movies/:category` | Browse movies by category |
| `*` | 404 Not Found page |
