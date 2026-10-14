import React, { useState, useEffect } from 'react';
import {
  Flame,
  Film,
  Tv,
  Star,
  Sparkles,
  PlayCircle,
  TrendingUp,
  Clock,
  Compass,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Play,
  Radio
} from 'lucide-react';

import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MovieRow from './components/MovieRow';
import MovieCard from './components/MovieCard';
import PlayerModal from './components/PlayerModal';
import DetailModal from './components/DetailModal';
import TrailerModal from './components/TrailerModal';
import WatchlistModal from './components/WatchlistModal';
import HistoryModal from './components/HistoryModal';
import SettingsModal from './components/SettingsModal';
import FilterBar from './components/FilterBar';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import ScrollToTop from './components/ScrollToTop';
import RandomMovieModal from './components/RandomMovieModal';
import GenreCards from './components/GenreCards';
import SportsSection from './components/SportsSection';
import SportsPlayerModal from './components/SportsPlayerModal';
import ShareModal from './components/ShareModal';

import { tmdbApi, getPosterUrl, getBackdropUrl } from './services/api';
import { storage } from './services/storage';
import { LIVE_MATCHES } from './services/sportsData';

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState('home');

  // Modals state
  const [playerMovie, setPlayerMovie] = useState(null);
  const [playerSeason, setPlayerSeason] = useState(1);
  const [playerEpisode, setPlayerEpisode] = useState(1);
  const [detailMovie, setDetailMovie] = useState(null);
  const [trailerMovie, setTrailerMovie] = useState(null);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showRandomMovie, setShowRandomMovie] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Sports Live Stream State
  const [activeSportsMatch, setActiveSportsMatch] = useState(null);
  const [shareSportsMatch, setShareSportsMatch] = useState(null);

  // Local storage lists
  const [watchlist, setWatchlist] = useState([]);
  const [history, setHistory] = useState([]);

  // Home rows data
  const [trendingAll, setTrendingAll] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [kdramaList, setKdramaList] = useState([]);
  const [animeList, setAnimeList] = useState([]);
  const [indonesianList, setIndonesianList] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [homeLoading, setHomeLoading] = useState(true);

  // Tab category grid data & filters
  const [categoryItems, setCategoryItems] = useState([]);
  const [categoryPage, setCategoryPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSort, setSelectedSort] = useState('popularity.desc');

  // Initialize storage lists
  useEffect(() => {
    setWatchlist(storage.getWatchlist());
    setHistory(storage.getHistory());
  }, []);

  // Fetch Home rows data
  useEffect(() => {
    let isMounted = true;
    const fetchHomeData = async () => {
      try {
        setHomeLoading(true);
        const [
          trendingRes,
          nowPlayingRes,
          popularMoviesRes,
          popularTVRes,
          kdramaRes,
          animeRes,
          indoRes,
          topRatedRes,
        ] = await Promise.all([
          tmdbApi.getTrending('all', 'day'),
          tmdbApi.getNowPlayingMovies(),
          tmdbApi.getPopularMovies(),
          tmdbApi.getPopularTV(),
          tmdbApi.getKDrama(),
          tmdbApi.getAnime(),
          tmdbApi.getIndonesianMovies(),
          tmdbApi.getTopRatedMovies(),
        ]);

        if (isMounted) {
          setTrendingAll((trendingRes.results || []).map(m => ({ ...m, media_type: m.media_type || (m.first_air_date || m.name ? 'tv' : 'movie') })));
          setNowPlaying((nowPlayingRes.results || []).map(m => ({ ...m, media_type: 'movie' })));
          setPopularMovies((popularMoviesRes.results || []).map(m => ({ ...m, media_type: 'movie' })));
          setPopularTV((popularTVRes.results || []).map(m => ({ ...m, media_type: 'tv' })));
          setKdramaList((kdramaRes.results || []).map(m => ({ ...m, media_type: 'tv' })));
          setAnimeList((animeRes.results || []).map(m => ({ ...m, media_type: 'tv' })));
          setIndonesianList((indoRes.results || []).map(m => ({ ...m, media_type: 'movie' })));
          setTopRated((topRatedRes.results || []).map(m => ({ ...m, media_type: 'movie' })));
        }
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        if (isMounted) setHomeLoading(false);
      }
    };

    fetchHomeData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch Category Tab data when activeTab, filters, or page change
  useEffect(() => {
    if (activeTab === 'home') return;

    let isMounted = true;
    const fetchCategoryData = async () => {
      try {
        setCategoryLoading(true);
        let res;

        if (activeTab === 'movies') {
          res = await tmdbApi.discover({
            mediaType: 'movie',
            genreId: selectedGenre,
            year: selectedYear,
            sortBy: selectedSort,
            page: categoryPage,
          });
        } else if (activeTab === 'series') {
          res = await tmdbApi.discover({
            mediaType: 'tv',
            genreId: selectedGenre,
            year: selectedYear,
            sortBy: selectedSort,
            page: categoryPage,
          });
        } else if (activeTab === 'kdrama') {
          res = await tmdbApi.getKDrama(categoryPage);
        } else if (activeTab === 'anime') {
          res = await tmdbApi.getAnime(categoryPage);
        } else if (activeTab === 'indo') {
          res = await tmdbApi.getIndonesianMovies(categoryPage);
        }

        if (isMounted && res) {
          const currentType = (activeTab === 'series' || activeTab === 'kdrama' || activeTab === 'anime') ? 'tv' : 'movie';
          setCategoryItems((res.results || []).map(m => ({ ...m, media_type: m.media_type || currentType })));
          setTotalPages(Math.min(res.total_pages || 1, 50));
        }
      } catch (err) {
        console.error('Error fetching category data:', err);
      } finally {
        if (isMounted) setCategoryLoading(false);
      }
    };

    fetchCategoryData();
    return () => {
      isMounted = false;
    };
  }, [activeTab, categoryPage, selectedGenre, selectedYear, selectedSort]);

  // Reset pagination when switching tabs
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCategoryPage(1);
    setSelectedGenre('');
    setSelectedYear('');
    setSelectedSort('popularity.desc');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Watch action handlers
  const handleWatch = (movie, season = 1, episode = 1) => {
    setPlayerMovie(movie);
    setPlayerSeason(season);
    setPlayerEpisode(episode);
  };

  const handleResumeWatch = (historyItem) => {
    setPlayerMovie({
      id: historyItem.id,
      title: historyItem.title,
      poster_path: historyItem.poster_path,
      backdrop_path: historyItem.backdrop_path,
      media_type: historyItem.mediaType,
    });
    setPlayerSeason(historyItem.season || 1);
    setPlayerEpisode(historyItem.episode || 1);
  };

  // Tab Title helper
  const getTabTitle = () => {
    switch (activeTab) {
      case 'movies':
        return 'Film Bioskop Terlengkap';
      case 'series':
        return 'Serial TV Populer Mancanegara';
      case 'kdrama':
        return 'Drama Korea Terbaru & Hits (Drakor)';
      case 'anime':
        return 'Anime Subtitle Indonesia (Bstation Style)';
      case 'indo':
        return 'Koleksi Film Bioskop Indonesia';
      default:
        return 'Semua Kategori';
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenWatchlist={() => setShowWatchlist(true)}
        onOpenHistory={() => setShowHistory(true)}
        onOpenSettings={() => setShowSettings(true)}
        onOpenRandom={() => setShowRandomMovie(true)}
        onSelectMovie={(movie) => handleWatch(movie)}
        watchlistCount={watchlist.length}
        historyCount={history.length}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeTab === 'home' ? (
          <div>
            {/* Featured Hero Banner */}
            <HeroBanner
              featuredMovies={trendingAll.slice(0, 7)}
              onWatch={handleWatch}
              onOpenDetail={(movie) => setDetailMovie(movie)}
              onOpenTrailer={(movie) => setTrailerMovie(movie)}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
            />

            {/* Quick Banner Info for Netflix / Prime Video / Live Sports Experience */}
            <div className="container" style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.1rem 1.35rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: 'rgba(229, 9, 20, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#e50914',
                      flexShrink: 0,
                    }}
                  >
                    <Trophy size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span>Streaming Multi-Server Cepat & Siaran Langsung Olahraga HD!</span>
                      <span
                        style={{
                          fontSize: '0.62rem',
                          padding: '0.12rem 0.4rem',
                          borderRadius: '4px',
                          background: '#e50914',
                          color: '#fff',
                          fontWeight: 800,
                        }}
                        className="pulse-live"
                      >
                        LIVE NOW
                      </span>
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Tersedia 7 pilihan server pemutar video + live streaming bola, badminton BWF, MotoGP & F1 bebas kuota.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleTabChange('sports')}
                    className="btn btn-primary"
                    style={{ fontSize: '0.82rem', padding: '0.5rem 0.95rem' }}
                  >
                    <Trophy size={15} />
                    <span>Nonton Live Olahraga</span>
                  </button>
                  <button
                    onClick={() => handleTabChange('movies')}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.82rem', padding: '0.5rem 0.95rem' }}
                  >
                    Jelajah Film Bioskop
                  </button>
                </div>
              </div>
            </div>

            {/* Live Sports Highlight on Homepage */}
            <div className="container" style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '6px',
                      background: 'rgba(229, 9, 20, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#e50914',
                    }}
                  >
                    <Radio size={16} className="pulse-live" />
                  </span>
                  <div>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>Saluran TV Olahraga Live 24 Jam Non-Stop</span>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          padding: '0.12rem 0.4rem',
                          borderRadius: '4px',
                          background: '#e50914',
                          color: '#fff',
                          fontWeight: 800,
                        }}
                      >
                        ASLI 24/7
                      </span>
                    </h2>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      SpoTV MotoGP & BWF, beIN Sports Liga Champions, Sky Sports Premier League
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleTabChange('sports')}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.78rem', padding: '0.4rem 0.85rem' }}
                >
                  Semua Saluran Olahraga ({LIVE_MATCHES.length}) →
                </button>
              </div>

              {/* Sports Highlight Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '0.85rem',
                }}
              >
                {LIVE_MATCHES.slice(0, 3).map((match) => (
                  <div
                    key={match.id}
                    onClick={() => setActiveSportsMatch(match)}
                    style={{
                      background: '#13161f',
                      border: '1px solid rgba(229, 9, 20, 0.3)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '0.85rem',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.borderColor = '#e50914';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(229, 9, 20, 0.3)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>{match.teamHome.name}</span>
                      <span
                        style={{
                          background: '#e50914',
                          color: '#fff',
                          padding: '0.12rem 0.4rem',
                          borderRadius: '3px',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                        }}
                      >
                        LIVE 24/7
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', flex: 1 }}>
                        {match.teamHome.name}
                      </div>
                      <div
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          color: '#e50914',
                          padding: '0.2rem 0.5rem',
                          background: 'rgba(229, 9, 20, 0.12)',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        SIARAN LANGSUNG
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      <span>{match.quality} • {match.channels.length} Saluran</span>
                      <span style={{ color: '#e50914', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Play size={12} fill="#e50914" /> Tonton Saluran
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lanjutkan Menonton (Continue Watching) Row */}
            {history.length > 0 && (
              <div className="container" style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '6px',
                        background: 'rgba(229, 9, 20, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#e50914',
                      }}
                    >
                      <Clock size={16} />
                    </div>
                    <div>
                      <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                        Lanjutkan Menonton
                      </h2>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Lanjut nonton dari film/serial terakhir yang kamu buka
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowHistory(true)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.78rem', padding: '0.4rem 0.85rem' }}
                  >
                    Semua Riwayat ({history.length})
                  </button>
                </div>

                {/* Horizontal scroll cards */}
                <div
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    overflowX: 'auto',
                    paddingBottom: '0.75rem',
                    scrollbarWidth: 'thin',
                  }}
                >
                  {history.slice(0, 8).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleResumeWatch(item)}
                      style={{
                        minWidth: '220px',
                        maxWidth: '220px',
                        borderRadius: 'var(--radius-md)',
                        background: '#13161f',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        position: 'relative',
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.borderColor = '#e50914';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      }}
                    >
                      {/* Thumbnail with play overlay */}
                      <div style={{ position: 'relative', width: '100%', height: '124px', overflow: 'hidden' }}>
                        <img
                          src={
                            item.backdrop_path
                              ? getBackdropUrl(item.backdrop_path, 'w780')
                              : getPosterUrl(item.poster_path, 'w342')
                          }
                          alt={item.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          loading="lazy"
                        />
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(11, 12, 16, 0.95) 0%, transparent 60%)',
                          }}
                        />

                        {/* Center play icon */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            background: '#e50914',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 14px rgba(229, 9, 20, 0.5)',
                          }}
                        >
                          <PlayCircle size={20} color="#fff" />
                        </div>

                        {/* Episode badge if series */}
                        {item.mediaType === 'tv' && (
                          <span
                            className="badge badge-series"
                            style={{
                              position: 'absolute',
                              top: '8px',
                              left: '8px',
                              fontSize: '0.65rem',
                              padding: '0.15rem 0.4rem',
                            }}
                          >
                            S{item.season || 1}:E{item.episode || 1}
                          </span>
                        )}
                      </div>

                      {/* Info & Progress bar */}
                      <div style={{ padding: '0.75rem' }}>
                        <h4
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: '#fff',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {item.title}
                        </h4>
                        <div
                          style={{
                            fontSize: '0.72rem',
                            color: '#e50914',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontWeight: 600,
                          }}
                        >
                          <span>Klik untuk Lanjut Nonton</span>
                        </div>
                      </div>

                      {/* Progress bar line */}
                      <div
                        style={{
                          height: '3px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          width: '100%',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: '65%',
                            background: '#e50914',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Home Rows */}
            <div style={{ marginTop: '1.5rem' }}>
              <MovieRow
                title="Sedang Tren Hari Ini"
                subtitle="Film dan serial paling banyak ditonton dalam 24 jam terakhir"
                icon={Flame}
                movies={trendingAll}
                onWatch={handleWatch}
                onOpenDetail={(movie) => setDetailMovie(movie)}
                onViewAll={() => handleTabChange('movies')}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
              />

              <MovieRow
                title="Sedang Tayang di Bioskop (Now Playing)"
                subtitle="Koleksi film box office terbaru ala LK21 & Idlix"
                icon={Film}
                movies={nowPlaying}
                onWatch={handleWatch}
                onOpenDetail={(movie) => setDetailMovie(movie)}
                onViewAll={() => handleTabChange('movies')}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
              />

              <MovieRow
                title="Anime Subtitle Indonesia (Bstation)"
                subtitle="Serial animasi Jepang terpopuler dengan episode lengkap"
                icon={PlayCircle}
                movies={animeList}
                onWatch={handleWatch}
                onOpenDetail={(movie) => setDetailMovie(movie)}
                onViewAll={() => handleTabChange('anime')}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
              />

              <MovieRow
                title="Drama Korea Pilihan (Drakor Hits)"
                subtitle="Koleksi serial drama Korea terpopuler dan terlengkap"
                icon={TrendingUp}
                movies={kdramaList}
                onWatch={handleWatch}
                onOpenDetail={(movie) => setDetailMovie(movie)}
                onViewAll={() => handleTabChange('kdrama')}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
              />

              <MovieRow
                title="Film Bioskop Indonesia"
                subtitle="Karya sinema anak bangsa dari genre horor, romantis hingga aksi"
                icon={Compass}
                movies={indonesianList}
                onWatch={handleWatch}
                onOpenDetail={(movie) => setDetailMovie(movie)}
                onViewAll={() => handleTabChange('indo')}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
              />

              <MovieRow
                title="Serial TV Terpopuler Mancanegara"
                subtitle="Series barat dan global dengan rating tinggi"
                icon={Tv}
                movies={popularTV}
                onWatch={handleWatch}
                onOpenDetail={(movie) => setDetailMovie(movie)}
                onViewAll={() => handleTabChange('series')}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
              />

              <MovieRow
                title="Rating Tertinggi (IMDb 8.0+)"
                subtitle="Film-film mahakarya dengan penilaian terbaik sepanjang masa"
                icon={Star}
                movies={topRated}
                onWatch={handleWatch}
                onOpenDetail={(movie) => setDetailMovie(movie)}
                onViewAll={() => handleTabChange('movies')}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
              />
            </div>
          </div>
        ) : activeTab === 'sports' ? (
          /* Live Sports Stream Hub */
          <div className="container" style={{ paddingTop: '5.5rem', paddingBottom: '3rem' }}>
            <SportsSection
              onWatchMatch={(match) => setActiveSportsMatch(match)}
              onShareMatch={(match) => setShareSportsMatch(match)}
            />
          </div>
        ) : activeTab === 'genre' ? (
          /* Genre Cards View */
          <div className="container" style={{ paddingTop: '5.5rem', paddingBottom: '3rem' }}>
            <GenreCards
              onSelectGenre={(genreId) => {
                setSelectedGenre(genreId);
                handleTabChange('movies');
              }}
            />
          </div>
        ) : (
          /* Category Tab Grid View (Movies, Series, Kdrama, Anime, Indo) */
          <div className="container" style={{ paddingTop: '5.5rem', paddingBottom: '3rem' }}>
            
            {/* Header Title */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    background: 'rgba(229, 9, 20, 0.15)',
                    color: '#e50914',
                    border: '1px solid rgba(229, 9, 20, 0.3)',
                    textTransform: 'uppercase',
                  }}
                >
                  Kategori
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                  Halaman {categoryPage} dari {totalPages}
                </span>
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginTop: '0.35rem' }}>
                {getTabTitle()}
              </h1>
            </div>

            {/* Filter Bar */}
            {(activeTab === 'movies' || activeTab === 'series') && (
              <FilterBar
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
              />
            )}

            {/* Grid of Cards */}
            {categoryLoading ? (
              <div className="movie-grid">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="skeleton"
                    style={{
                      aspectRatio: '2/3',
                      borderRadius: 'var(--radius-md)',
                    }}
                  />
                ))}
              </div>
            ) : categoryItems.length > 0 ? (
              <div className="movie-grid">
                {categoryItems.map((movie) => (
                  <MovieCard
                    key={`${movie.id}-${movie.media_type || activeTab}`}
                    movie={{
                      ...movie,
                      media_type:
                        movie.media_type ||
                        (activeTab === 'series' || activeTab === 'kdrama' || activeTab === 'anime' ? 'tv' : 'movie'),
                    }}
                    onWatch={handleWatch}
                    onOpenDetail={(m) => setDetailMovie(m)}
                    watchlist={watchlist}
                    setWatchlist={setWatchlist}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: '4rem 1rem',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                }}
              >
                Tidak ada film yang cocok dengan filter yang dipilih. Coba reset filter.
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  marginTop: '3rem',
                }}
              >
                <button
                  onClick={() => {
                    setCategoryPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 100, behavior: 'smooth' });
                  }}
                  disabled={categoryPage === 1}
                  className="btn btn-secondary"
                  style={{ opacity: categoryPage === 1 ? 0.4 : 1 }}
                >
                  <ChevronLeft size={18} />
                  <span>Sebelumnya</span>
                </button>

                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
                  {categoryPage} / {totalPages}
                </span>

                <button
                  onClick={() => {
                    setCategoryPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 100, behavior: 'smooth' });
                  }}
                  disabled={categoryPage === totalPages}
                  className="btn btn-secondary"
                  style={{ opacity: categoryPage === totalPages ? 0.4 : 1 }}
                >
                  <span>Berikutnya</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={handleTabChange} />

      {/* MODALS */}
      {/* 1. Main Streaming Video Player Modal */}
      {playerMovie && (
        <PlayerModal
          movie={playerMovie}
          initialSeason={playerSeason}
          initialEpisode={playerEpisode}
          onClose={() => {
            setPlayerMovie(null);
            setHistory(storage.getHistory());
          }}
          onSelectRelated={(rel) => handleWatch(rel)}
          watchlist={watchlist}
          setWatchlist={setWatchlist}
        />
      )}

      {/* 2. Full Movie Details Modal */}
      {detailMovie && (
        <DetailModal
          movie={detailMovie}
          onClose={() => setDetailMovie(null)}
          onWatch={handleWatch}
          onOpenTrailer={(m) => setTrailerMovie(m)}
          watchlist={watchlist}
          setWatchlist={setWatchlist}
        />
      )}

      {/* 3. Trailer Modal */}
      {trailerMovie && (
        <TrailerModal
          movie={trailerMovie}
          onClose={() => setTrailerMovie(null)}
        />
      )}

      {/* 4. Watchlist Modal */}
      {showWatchlist && (
        <WatchlistModal
          watchlist={watchlist}
          setWatchlist={setWatchlist}
          onClose={() => setShowWatchlist(false)}
          onWatch={handleWatch}
        />
      )}

      {/* 5. History Modal */}
      {showHistory && (
        <HistoryModal
          history={history}
          setHistory={setHistory}
          onClose={() => setShowHistory(false)}
          onResumeWatch={handleResumeWatch}
        />
      )}

      {/* 6. Settings & Server Status Modal */}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* 7. Random Movie Modal (Aku Lagi Bingung) */}
      {showRandomMovie && (
        <RandomMovieModal
          onClose={() => setShowRandomMovie(false)}
          onWatch={handleWatch}
          onOpenDetail={(m) => setDetailMovie(m)}
        />
      )}

      {/* 8. Modern Animated Splash Screen */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {/* 9. Sports Live Stream Player Modal */}
      {activeSportsMatch && (
        <SportsPlayerModal
          match={activeSportsMatch}
          onClose={() => setActiveSportsMatch(null)}
          onShare={(match) => setShareSportsMatch(match)}
        />
      )}

      {/* 10. Sports Share Modal */}
      {shareSportsMatch && (
        <ShareModal
          movie={{
            title: shareSportsMatch.eventTitle || shareSportsMatch.name || (shareSportsMatch.teamHome ? `${shareSportsMatch.teamHome.name} vs ${shareSportsMatch.teamAway?.name || 'Live'}` : 'Siaran Langsung Olahraga'),
            overview: `Saksikan siaran langsung olahraga gratis: ${shareSportsMatch.competition || shareSportsMatch.tournament || 'Live Sports'} di FaizFilm! Kualitas ${shareSportsMatch.quality || '1080p 60FPS'}.`,
          }}
          onClose={() => setShareSportsMatch(null)}
        />
      )}

      {/* 11. Floating Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
