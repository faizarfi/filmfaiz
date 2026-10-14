import React, { useState } from 'react';
import { X, Shuffle, Play, Info, Star, Loader2, Sparkles, Film } from 'lucide-react';
import { tmdbApi, getPosterUrl, getBackdropUrl } from '../services/api';

export default function RandomMovieModal({ onClose, onWatch, onOpenDetail }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const pickRandom = async () => {
    setSpinning(true);
    setLoading(true);
    try {
      const randomPage = Math.floor(Math.random() * 20) + 1;
      const categories = [
        () => tmdbApi.getPopularMovies(randomPage),
        () => tmdbApi.getTopRatedMovies(randomPage),
        () => tmdbApi.getPopularTV(randomPage),
        () => tmdbApi.getKDrama(Math.floor(Math.random() * 5) + 1),
        () => tmdbApi.getAnime(Math.floor(Math.random() * 5) + 1),
      ];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const data = await randomCategory();
      const results = (data.results || []).filter(
        (m) => m.poster_path && m.backdrop_path && m.vote_average > 5
      );

      if (results.length > 0) {
        const picked = results[Math.floor(Math.random() * results.length)];
        // Add a small delay for the spin effect
        await new Promise((resolve) => setTimeout(resolve, 800));
        setMovie(picked);
      }
    } catch (err) {
      console.error('Error picking random:', err);
    } finally {
      setLoading(false);
      setSpinning(false);
    }
  };

  // Pick one on first open
  useState(() => {
    pickRandom();
  });

  const mediaType = movie?.media_type || (movie?.title ? 'movie' : 'tv');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '580px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: 'rgba(13, 17, 26, 0.96)',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(99, 102, 241, 0.15)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            background: '#12141a',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#e50914',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(229, 9, 20, 0.4)',
              }}
            >
              <Shuffle size={18} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
                🎲 Aku Lagi Bingung!
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                Biar FaizFilm pilihkan film untukmu
              </span>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon btn-danger" style={{ borderRadius: '50%' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem' }}>
          {loading || !movie ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem 1rem',
                gap: '1.25rem',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(229, 9, 20, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'spin 1s linear infinite',
                }}
              >
                <Loader2 size={36} color="#e50914" />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Sedang mengocok film untukmu...
              </p>
            </div>
          ) : (
            <div>
              {/* Movie Backdrop Preview */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  marginBottom: '1.25rem',
                  background: '#111622',
                }}
              >
                <img
                  src={getBackdropUrl(movie.backdrop_path, 'w780')}
                  alt={movie.title || movie.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(13, 17, 26, 0.9) 0%, transparent 60%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    right: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.4rem' }}>
                    <span className="badge badge-hd">HD</span>
                    <span className="badge badge-sub">SUB INDO</span>
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>
                    {movie.title || movie.name}
                  </h3>
                </div>
              </div>

              {/* Meta Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#facc15', fontWeight: 700 }}>
                  <Star size={15} fill="#facc15" color="#facc15" />
                  <span>{movie.vote_average?.toFixed(1) || '8.0'}</span>
                </div>
                <span>{movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || '2026'}</span>
                <span style={{ textTransform: 'uppercase', color: '#e50914', fontWeight: 700, fontSize: '0.78rem' }}>
                  {mediaType === 'tv' ? 'Serial TV' : 'Film'}
                </span>
              </div>

              {/* Overview */}
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                }}
              >
                {movie.overview || 'Sinopsis belum tersedia untuk film ini.'}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => {
                    onClose();
                    onWatch({ ...movie, media_type: mediaType });
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  <Play size={18} fill="#fff" />
                  <span>Tonton Sekarang</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenDetail({ ...movie, media_type: mediaType });
                  }}
                  className="btn btn-secondary"
                >
                  <Info size={18} />
                  <span>Info</span>
                </button>

                <button
                  onClick={pickRandom}
                  className="btn btn-secondary"
                  title="Acak lagi!"
                  style={{ minWidth: 'auto' }}
                >
                  <Shuffle size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
