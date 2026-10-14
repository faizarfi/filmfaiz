// LocalStorage helpers for Bookmarks / Watchlist and Watch History for FaizFilm

const WATCHLIST_KEY = 'faizfilm_watchlist';
const HISTORY_KEY = 'faizfilm_history';
const LEGACY_WATCHLIST_KEY = 'cinestream_watchlist';
const LEGACY_HISTORY_KEY = 'cinestream_history';

export const storage = {
  // Watchlist / Bookmarks
  getWatchlist: () => {
    try {
      let data = localStorage.getItem(WATCHLIST_KEY);
      if (!data) {
        data = localStorage.getItem(LEGACY_WATCHLIST_KEY);
        if (data) {
          localStorage.setItem(WATCHLIST_KEY, data);
        }
      }
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  isInWatchlist: (id) => {
    const list = storage.getWatchlist();
    return list.some(item => item.id === id);
  },

  toggleWatchlist: (item) => {
    const list = storage.getWatchlist();
    const index = list.findIndex(i => i.id === item.id);
    let updated;
    if (index >= 0) {
      updated = list.filter(i => i.id !== item.id);
    } else {
      updated = [
        {
          id: item.id,
          title: item.title || item.name,
          poster_path: item.poster_path,
          backdrop_path: item.backdrop_path,
          vote_average: item.vote_average,
          release_date: item.release_date || item.first_air_date,
          media_type: item.media_type || (item.title ? 'movie' : 'tv'),
          savedAt: Date.now(),
        },
        ...list,
      ];
    }
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
    return updated;
  },

  removeFromWatchlist: (id) => {
    const list = storage.getWatchlist().filter(item => item.id !== id);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
    return list;
  },

  clearWatchlist: () => {
    localStorage.removeItem(WATCHLIST_KEY);
    localStorage.removeItem(LEGACY_WATCHLIST_KEY);
    return [];
  },

  // Watch History
  getHistory: () => {
    try {
      let data = localStorage.getItem(HISTORY_KEY);
      if (!data) {
        data = localStorage.getItem(LEGACY_HISTORY_KEY);
        if (data) {
          localStorage.setItem(HISTORY_KEY, data);
        }
      }
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addToHistory: ({ id, title, poster_path, backdrop_path, mediaType, season = 1, episode = 1, serverId = 'vidlink' }) => {
    const history = storage.getHistory();
    const filtered = history.filter(item => item.id !== id);
    const entry = {
      id,
      title,
      poster_path,
      backdrop_path,
      mediaType,
      season,
      episode,
      serverId,
      watchedAt: Date.now(),
    };
    const updated = [entry, ...filtered].slice(0, 30); // keep last 30
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  },

  clearHistory: () => {
    localStorage.removeItem(HISTORY_KEY);
    localStorage.removeItem(LEGACY_HISTORY_KEY);
    return [];
  },

  removeHistoryItem: (id) => {
    const history = storage.getHistory().filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return history;
  },
};
