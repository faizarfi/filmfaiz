import React, { useState, useEffect } from 'react';
import {
  X,
  Server,
  Maximize2,
  Minimize2,
  Tv,
  Film,
  Star,
  Info,
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  BookmarkCheck,
  Share2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { STREAM_SERVERS, getEmbedUrl } from '../services/streamServers';
import { tmdbApi, getPosterUrl, getBackdropUrl } from '../services/api';
import { storage } from '../services/storage';
import ShareModal from './ShareModal';

export default function PlayerModal({
  movie,
  initialSeason = 1,
  initialEpisode = 1,
  onClose,
  onSelectRelated,
  watchlist,
  setWatchlist
}) {
  const [activeServer, setActiveServer] = useState(STREAM_SERVERS[0].id);
  const [currentSeason, setCurrentSeason] = useState(initialSeason);
  const [currentEpisode, setCurrentEpisode] = useState(initialEpisode);
  const [isTheater, setIsTheater] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [seasonData, setSeasonData] = useState(null);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');
  const isSeries = mediaType === 'tv';
  const title = movie.title || movie.name || 'Menonton Film';

  // Fetch full details (for seasons list, cast, similar)
  useEffect(() => {
    let isMounted = true;
    const fetchDetails = async () => {
      try {
        const data = await tmdbApi.getDetails(mediaType, movie.id);
        if (isMounted) {
          setMovieDetails(data);
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
      }
    };

    fetchDetails();
    return () => {
      isMounted = false;
    };
  }, [movie.id, mediaType]);

  // Fetch Season episodes if it is a TV series or Anime
  useEffect(() => {
    if (!isSeries) return;

    let isMounted = true;
    setLoadingEpisodes(true);

    const fetchSeason = async () => {
      try {
        const data = await tmdbApi.getTVSeason(movie.id, currentSeason);
        if (isMounted) {
          setSeasonData(data);
        }
      } catch (err) {
        console.error('Error fetching season data:', err);
      } finally {
        if (isMounted) setLoadingEpisodes(false);
      }
    };

    fetchSeason();
    return () => {
      isMounted = false;
    };
  }, [movie.id, isSeries, currentSeason]);

  // Record to Watch History
  useEffect(() => {
    storage.addToHistory({
      id: movie.id,
      title,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      mediaType,
      season: currentSeason,
      episode: currentEpisode,
      serverId: activeServer,
    });
  }, [movie.id, title, movie.poster_path, movie.backdrop_path, mediaType, currentSeason, currentEpisode, activeServer]);

  // Keyboard shortcuts for player control
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      // Arrow Right = next episode (series only)
      if (e.key === 'ArrowRight' && isSeries && seasonData?.episodes) {
        const maxEp = seasonData.episodes.length;
        if (currentEpisode < maxEp) setCurrentEpisode((prev) => prev + 1);
      }
      // Arrow Left = previous episode
      if (e.key === 'ArrowLeft' && isSeries && currentEpisode > 1) {
        setCurrentEpisode((prev) => prev - 1);
      }
      // Number keys 1-6 = switch server
      const num = parseInt(e.key);
      if (num >= 1 && num <= STREAM_SERVERS.length) {
        setActiveServer(STREAM_SERVERS[num - 1].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isSeries, currentEpisode, seasonData]);

  const imdbId = movieDetails?.external_ids?.imdb_id || movieDetails?.imdb_id || movie.imdb_id;

  const embedUrl = getEmbedUrl(activeServer, {
    mediaType,
    id: movie.id,
    imdbId,
    season: currentSeason,
    episode: currentEpisode,
  });

  const handleRefreshPlayer = () => {
    setIframeKey((prev) => prev + 1);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const isBookmarked = storage.isInWatchlist(movie.id);
  const handleToggleBookmark = () => {
    const updated = storage.toggleWatchlist(movie);
    if (setWatchlist) setWatchlist(updated);
  };

  const seasonsList = movieDetails?.seasons?.filter(s => s.season_number > 0) || [];

  return (
    <div
      className="modal-overlay"
      style={{
        padding: isTheater ? '0' : '1.5rem',
        alignItems: isTheater ? 'flex-start' : 'center',
        background: isTheater ? '#000000' : 'rgba(3, 4, 7, 0.92)',
      }}
    >
      <div
        className="glass-panel slide-up"
        style={{
          width: '100%',
          maxWidth: isTheater ? '100%' : '1240px',
          borderRadius: isTheater ? '0' : 'var(--radius-lg)',
          overflow: 'hidden',
          background: isTheater ? '#07090e' : 'var(--bg-glass)',
          border: isTheater ? 'none' : '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-lg)',
          maxHeight: isTheater ? '100vh' : '94vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Modal Top Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'rgba(10, 14, 23, 0.95)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 10px #10b981',
              }}
            />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {title}
                </h3>
                {isSeries && (
                  <span className="badge badge-series">
                    S{currentSeason} : E{currentEpisode}
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                Streaming Gratis Kualitas HD • Server: {STREAM_SERVERS.find(s => s.id === activeServer)?.name}
              </span>
            </div>
          </div>

          {/* Player Bar Action Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handleRefreshPlayer}
              className="btn-icon"
              title="Reload Pemutar Video"
            >
              <RefreshCw size={16} />
            </button>

            <button
              onClick={() => setIsTheater(!isTheater)}
              className="btn-icon"
              title={isTheater ? 'Mode Normal' : 'Mode Bioskop (Theater)'}
            >
              {isTheater ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button
              onClick={handleToggleBookmark}
              className="btn-icon"
              title={isBookmarked ? 'Hapus dari Watchlist' : 'Simpan ke Watchlist'}
              style={{ color: isBookmarked ? '#e50914' : 'inherit' }}
            >
              {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            </button>

            <button
              onClick={() => setShowShareModal(true)}
              className="btn-icon"
              title="Bagikan Film (WhatsApp, Telegram, Salin Link)"
            >
              <Share2 size={16} />
            </button>

            <button
              onClick={onClose}
              className="btn-icon btn-danger"
              style={{ marginLeft: '0.25rem' }}
              title="Tutup Pemutar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: isTheater ? '0' : '1.25rem' }}>
          
          {/* Main Video Player Container (16:9 Aspect Ratio) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              background: '#000000',
              borderRadius: isTheater ? '0' : 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.9)',
              border: isTheater ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <iframe
              key={`${iframeKey}-${embedUrl}`}
              src={embedUrl}
              title={title}
              width="100%"
              height="100%"
              allowFullScreen
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              style={{
                border: 'none',
                width: '100%',
                height: '100%',
                display: 'block',
              }}
            />
          </div>

          {/* Subtitle & Quality Calibration Helper */}
          <div
            style={{
              marginTop: '0.85rem',
              padding: '0.85rem 1.1rem',
              borderRadius: 'var(--radius-md)',
              background: '#12141a',
              border: '1px solid rgba(229, 9, 20, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.85rem', fontWeight: 700 }}>
                <span style={{ fontSize: '1rem' }}>⚡</span>
                <span>Kalibrasi Subtitle & Resolusi 1080p:</span>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveServer('netflix_vip')}
                  style={{
                    background: activeServer === 'netflix_vip' ? '#e50914' : 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    border: '1px solid rgba(229, 9, 20, 0.4)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Netflix VIP (Offset di ⚙️)
                </button>
                <button
                  onClick={() => setActiveServer('prime_video')}
                  style={{
                    background: activeServer === 'prime_video' ? '#00a8e1' : 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    border: '1px solid rgba(0, 168, 225, 0.4)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Prime Video (1080p CDN)
                </button>
                <button
                  onClick={() => setActiveServer('idlix_prime')}
                  style={{
                    background: activeServer === 'idlix_prime' ? '#f59e0b' : 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Idlix (Sub Manual Pas)
                </button>
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              <span style={{ color: '#e50914', fontWeight: 700 }}>• Subtitle Telat / Kecepatan? </span>
              Di player <strong>Netflix VIP (Server 1)</strong>: Klik ikon <strong>Gear (⚙️)</strong> di kanan bawah player ➔ pilih <strong>Subtitles</strong> ➔ geser <strong>Subtitle Offset</strong> (-1.5s / +1.5s) agar teks pas persis dengan suara aktor!
              <br/>
              <span style={{ color: '#00a8e1', fontWeight: 700 }}>• Resolusi 1080p / 4K: </span>
              Resolusi otomatis Full HD 1080p. Bila internet sedang lambat, player akan otomatis menyesuaikan agar tidak buffering.
            </div>
          </div>

          {/* Notice & Server Tip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem',
              marginTop: '0.75rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <ShieldAlert size={18} color="#e50914" style={{ flexShrink: 0 }} />
              <span>
                <strong style={{ color: '#fff' }}>Tips Streaming:</strong> Tersedia server <strong>Netflix VIP</strong>, <strong>Prime Video</strong>, & <strong>Disney+</strong>. Jika buffering, ganti server di bawah.
                <br/>
                <strong style={{ color: '#f5c518', fontSize: '0.78rem' }}>⌨️ Shortcut:</strong>
                <span style={{ fontSize: '0.76rem' }}> Tekan angka <strong>1-7</strong> ganti server • <strong>← →</strong> pindah episode • <strong>ESC</strong> tutup</span>
              </span>
            </div>
            <a
              href={embedUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: '#e50914',
                textDecoration: 'none',
                fontSize: '0.78rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              <span>Buka di Tab Baru</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Multi-Server Selector Bar */}
          <div style={{ marginTop: '1.25rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}
            >
              <Server size={16} color="#e50914" />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                Pilihan Server Streaming (Netflix, Prime Video, Disney+, LK21, Idlix):
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))',
                gap: '0.65rem',
              }}
            >
              {STREAM_SERVERS.map((server) => {
                const isSelected = activeServer === server.id;
                return (
                  <button
                    key={server.id}
                    onClick={() => setActiveServer(server.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected
                        ? (server.badgeBg || 'rgba(229, 9, 20, 0.15)')
                        : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected
                        ? `1px solid ${server.brandColor || '#e50914'}`
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '0.2rem' }}>
                      <span
                        style={{
                          fontSize: '0.84rem',
                          fontWeight: isSelected ? 800 : 600,
                          color: isSelected ? '#ffffff' : 'var(--text-main)',
                        }}
                      >
                        {server.name}
                      </span>
                      {isSelected && (
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: server.brandColor || '#e50914',
                            boxShadow: `0 0 8px ${server.brandColor || '#e50914'}`,
                          }}
                        />
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          color: server.brandColor || '#e50914',
                          fontWeight: 700,
                        }}
                      >
                        {server.tag}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        {server.quality}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Series / Anime / Drakor Episode Switcher Section */}
          {isSeries && (
            <div
              style={{
                marginTop: '1.5rem',
                background: 'rgba(20, 26, 38, 0.6)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Tv size={18} color="#c084fc" />
                  <span style={{ fontSize: '0.98rem', fontWeight: 800, color: '#ffffff' }}>
                    Pilih Season & Episode:
                  </span>
                </div>

                {/* Season Dropdown */}
                {seasonsList.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Season:</span>
                    <select
                      value={currentSeason}
                      onChange={(e) => {
                        setCurrentSeason(Number(e.target.value));
                        setCurrentEpisode(1);
                      }}
                      style={{
                        background: '#0d111a',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        outline: 'none',
                      }}
                    >
                      {seasonsList.map((s) => (
                        <option key={s.id} value={s.season_number}>
                          {s.name || `Season ${s.season_number}`} ({s.episode_count} Episode)
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Episodes Grid Selector */}
              {loadingEpisodes ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: '0.5rem' }}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="skeleton" style={{ height: '42px', borderRadius: 'var(--radius-sm)' }} />
                  ))}
                </div>
              ) : seasonData && seasonData.episodes ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                    gap: '0.5rem',
                    maxHeight: '220px',
                    overflowY: 'auto',
                    paddingRight: '0.4rem',
                  }}
                >
                  {seasonData.episodes.map((ep) => {
                    const isEpActive = currentEpisode === ep.episode_number;
                    return (
                      <button
                        key={ep.id}
                        onClick={() => setCurrentEpisode(ep.episode_number)}
                        style={{
                          padding: '0.6rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          border: isEpActive
                            ? '1px solid #e50914'
                            : '1px solid rgba(255, 255, 255, 0.08)',
                          background: isEpActive ? '#e50914' : 'rgba(255, 255, 255, 0.04)',
                          color: isEpActive ? '#ffffff' : 'var(--text-muted)',
                          fontSize: '0.82rem',
                          fontWeight: isEpActive ? 800 : 600,
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          transition: 'all 0.2s ease',
                        }}
                        title={ep.name || `Episode ${ep.episode_number}`}
                      >
                        <span>EPS {ep.episode_number}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                  Memuat data episode...
                </div>
              )}
            </div>
          )}

          {/* Movie Details / Cast / Related Section */}
          <div
            style={{
              marginTop: '1.75rem',
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '1.5rem',
            }}
            className="player-meta-layout"
          >
            {/* Poster */}
            <img
              src={getPosterUrl(movie.poster_path, 'w342')}
              alt={title}
              style={{
                width: '100%',
                borderRadius: 'var(--radius-md)',
                objectFit: 'cover',
                border: '1px solid var(--border-subtle)',
              }}
            />

            {/* Description & Cast info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                <span className="badge badge-hd">HD 1080P</span>
                <span className="badge badge-sub">SUB INDO</span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    color: '#facc15',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                  }}
                >
                  <Star size={14} fill="#facc15" color="#facc15" />
                  <span>{movie.vote_average?.toFixed(1) || '8.2'}</span>
                </div>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>
                  {movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4)}
                </span>
              </div>

              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '0.65rem' }}>
                {title}
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                {movieDetails?.overview || movie.overview || 'Sinopsis belum tersedia.'}
              </p>

              {/* Cast Chips */}
              {movieDetails?.credits?.cast?.length > 0 && (
                <div style={{ marginTop: '0.85rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                    Pemeran Utama:
                  </span>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                    {movieDetails.credits.cast.slice(0, 6).map((actor) => (
                      <span
                        key={actor.id}
                        style={{
                          fontSize: '0.78rem',
                          padding: '0.25rem 0.6rem',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#e2e8f0',
                        }}
                      >
                        {actor.name} ({actor.character || 'Cast'})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Recommendations row */}
          {movieDetails?.similar?.results?.length > 0 && (
            <div style={{ marginTop: '2.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.85rem' }}>
                Rekomendasi Film Serupa:
              </h4>
              <div
                style={{
                  display: 'flex',
                  gap: '0.85rem',
                  overflowX: 'auto',
                  paddingBottom: '0.5rem',
                }}
              >
                {movieDetails.similar.results.slice(0, 8).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      if (onSelectRelated) onSelectRelated(rel);
                    }}
                    style={{
                      flex: '0 0 130px',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      transition: 'transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    <img
                      src={getPosterUrl(rel.poster_path, 'w185')}
                      alt={rel.title || rel.name}
                      style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover' }}
                    />
                    <div style={{ padding: '0.4rem', fontSize: '0.75rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {rel.title || rel.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showShareModal && (
        <ShareModal movie={movie} onClose={() => setShowShareModal(false)} />
      )}

      <style>{`
        @media (max-width: 768px) {
          .player-meta-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
