// TMDB API Service with multi-key failover and helper endpoints

const TMDB_API_KEYS = [
  '15d2ea6d0dc1d476efbca3eba2b9bbfb',
  '2dca580c2a14b55200e784d157207b4d',
];

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

let activeKeyIndex = 0;

export const getApiKey = () => {
  const customKey =
    localStorage.getItem('faizfilm_custom_api_key') ||
    localStorage.getItem('cinestream_custom_api_key');
  if (customKey && customKey.trim()) {
    return customKey.trim();
  }
  return TMDB_API_KEYS[activeKeyIndex % TMDB_API_KEYS.length];
};

export const switchApiKey = () => {
  activeKeyIndex = (activeKeyIndex + 1) % TMDB_API_KEYS.length;
};

// Generic fetch with fallback retry
async function fetchFromTMDB(endpoint, params = {}) {
  const queryParams = new URLSearchParams({
    api_key: getApiKey(),
    language: 'id-ID',
    include_adult: 'false',
    ...params,
  });

  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 401 || res.status === 429) {
        // Rotate key and retry once
        switchApiKey();
        const retryParams = new URLSearchParams({
          api_key: getApiKey(),
          language: 'id-ID',
          include_adult: 'false',
          ...params,
        });
        const retryRes = await fetch(`${BASE_URL}${endpoint}?${retryParams.toString()}`);
        if (!retryRes.ok) throw new Error(`HTTP error! status: ${retryRes.status}`);
        return await retryRes.json();
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    // If id-ID fails or returns empty translation, fallback to en-US
    if (params.language === 'id-ID') {
      try {
        return await fetchFromTMDB(endpoint, { ...params, language: 'en-US' });
      } catch (err) {
        console.error('TMDB fetch error (fallback):', err);
        throw err;
      }
    }
    console.error(`TMDB fetch error for ${endpoint}:`, error);
    throw error;
  }
}

// Image URLs
export const getPosterUrl = (path, size = 'w500') => {
  if (!path) return 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=80';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path, size = 'original') => {
  if (!path) return 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1280&auto=format&fit=crop&q=80';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Endpoints
export const tmdbApi = {
  // Trending
  getTrending: (mediaType = 'all', timeWindow = 'day', page = 1) => {
    return fetchFromTMDB(`/trending/${mediaType}/${timeWindow}`, { page });
  },

  // Movies
  getPopularMovies: (page = 1) => {
    return fetchFromTMDB('/movie/popular', { page });
  },

  getNowPlayingMovies: (page = 1) => {
    return fetchFromTMDB('/movie/now_playing', { page });
  },

  getTopRatedMovies: (page = 1) => {
    return fetchFromTMDB('/movie/top_rated', { page });
  },

  getUpcomingMovies: (page = 1) => {
    return fetchFromTMDB('/movie/upcoming', { page });
  },

  // TV Series & Drakor
  getPopularTV: (page = 1) => {
    return fetchFromTMDB('/tv/popular', { page });
  },

  getTopRatedTV: (page = 1) => {
    return fetchFromTMDB('/tv/top_rated', { page });
  },

  // Korean Drama (Drakor)
  getKDrama: (page = 1) => {
    return fetchFromTMDB('/discover/tv', {
      page,
      with_origin_country: 'KR',
      sort_by: 'popularity.desc',
      'vote_count.gte': '50',
    });
  },

  // Anime (Bstation style)
  getAnime: (page = 1) => {
    return fetchFromTMDB('/discover/tv', {
      page,
      with_genres: '16', // Animation
      with_origin_country: 'JP',
      sort_by: 'popularity.desc',
      'vote_count.gte': '30',
    });
  },

  // Indonesian Movies (Film Indonesia)
  getIndonesianMovies: (page = 1) => {
    return fetchFromTMDB('/discover/movie', {
      page,
      with_original_language: 'id',
      sort_by: 'popularity.desc',
    });
  },

  // Search
  searchMulti: (query, page = 1) => {
    if (!query) return Promise.resolve({ results: [] });
    return fetchFromTMDB('/search/multi', { query, page });
  },

  // Details
  getDetails: (mediaType, id) => {
    return fetchFromTMDB(`/${mediaType}/${id}`, {
      append_to_response: 'videos,credits,similar,recommendations,external_ids',
    });
  },

  // TV Season & Episodes
  getTVSeason: (tvId, seasonNumber) => {
    return fetchFromTMDB(`/tv/${tvId}/season/${seasonNumber}`);
  },

  // Discover with Filters
  discover: ({ mediaType = 'movie', genreId, year, sortBy = 'popularity.desc', page = 1 }) => {
    const params = {
      page,
      sort_by: sortBy,
    };
    if (genreId) params.with_genres = genreId;
    if (year) {
      if (mediaType === 'movie') params.primary_release_year = year;
      else params.first_air_date_year = year;
    }
    return fetchFromTMDB(`/discover/${mediaType}`, params);
  },

  // Genres
  getGenres: async (mediaType = 'movie') => {
    const res = await fetchFromTMDB(`/genre/${mediaType}/list`);
    return res.genres || [];
  },
};
