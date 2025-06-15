# 🎬 MovieFinder

A modern React-based movie search app that allows users to search movies using the [TMDB API](https://www.themoviedb.org/) and view trending movies. Searches are tracked using [Appwrite](https://appwrite.io) as the backend.

---

## ✨ Features

- 🔍 **Search** for movies in real-time (debounced input)
- 📊 **Trending Movies** section fetched from Appwrite
- 📦 **Appwrite Integration** for tracking search term popularity
- ⚡ **Loading Spinner** for better UX during async calls
- 📱 Responsive and clean UI

---

## 🚀 Tech Stack

- **React** with Hooks
- **TMDB API** for movie data
- **Appwrite** for backend (search count tracking)
- **Tailwind CSS** (or your chosen CSS framework)
- **React-use** for debounce handling

---

## 📸 Screenshots

> *(Add screenshots or screen recordings here if available)*

---

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/movie-finder.git
   cd movie-finder
Install dependencies
npm install

Create a .env file
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id

🧠 Folder Structure
src/
├── components/
│   ├── MovieCard.jsx
│   ├── Search.jsx
│   └── Spinner.jsx
├── App.jsx
├── appwrite.js
└── main.jsx

