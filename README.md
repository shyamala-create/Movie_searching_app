
# Movie Searching App

A modern React application to search for movies, series, and episodes using the OMDB API. Features include live search, type filtering, pagination, and detailed views for each movie.

## Features
- Search for movies, series, or episodes by title
- Filter results by type (Movie, Series, Episode)
- Pagination for large result sets
- View detailed information for each movie, including:
  - Large poster
  - Title
  - Release year
  - Genre
  - Plot summary
  - Ratings
  - Cast
- Responsive and clean UI with Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v16 or above recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Movie-searching-app
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure
- `src/pages/home.jsx` — Main search and results page
- `src/pages/movieDetails.jsx` — Detailed view for each movie
- `src/services/searchApi.js` — API utility for OMDB requests
- `public/` — Static assets (icons, etc.)

## API
This app uses the [OMDB API](http://www.omdbapi.com/) with a demo API key. For production, get your own API key from [OMDB](http://www.omdbapi.com/apikey.aspx).

## Customization
- Update the OMDB API key in the code for your own usage.
- Style the app further using Tailwind CSS classes.

## License
MIT
