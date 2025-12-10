## Install Dependencies
npm install

## Run the app
npm run dev

## Chosen Movie API
This project uses TMDB (The Movie Database) Public API:
/movie/popular
/search/movie
/genre/movie/list
/movie/{id} (details)

Documentation:
https://developer.themoviedb.org/reference/intro/getting-started

## Project Structure
src/
│── api/ - TMDB API wrappers (fetchers)
│── components/ - Reusable UI components
│── hooks/ - Data fetching and logic (React Query)
│── utils/ - Constants and helpers

## Key Components
MovieGrid - Grid with infinite scroll
MovieCard - Poster with basic info
MovieDetails - Popup with full movie info
Header - Search bar and branding
Filters - Genre, year, and rating filters

## Hooks
useInfiniteMovies() - Fetches movies with pagination
useMovieDetails(id) - Fetches detailed info for selected movie
useDebounce() - Improves search performance

## State Management

React Query (instead of Redux) because:
1.Auto caching
2.Auto refetching
3.Stale-while-revalidate behavior
4.Works well with infinite queries
5.Great for handling server-state data

## Key Design Decisions

React Query over Redux
Better for server-based data, less boilerplate, built-in caching and loading management.

Infinite Scroll
Better UX than pagination. Implemented using IntersectionObserver.

Styled-Components
Scoped styling, theme-friendly, supports media queries.

Poster Fallback
Neutral placeholder image when TMDB does not provide a poster.

Mobile-First Responsive Layout
Header collapses on small screens.
Filters wrap automatically.
Movie grid adjusts to screen size.
Popup disables background scroll for better UX.

Debounced Search
Prevents sending API calls on every keystroke.

## Known Limitations

TMDB rate limits may block too many rapid searches.

With TMDB, when invalid year or rating filters are applied, the server sometimes responds with incorrect or inconsistent results.