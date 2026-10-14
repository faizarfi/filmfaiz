import React, { useState, useEffect } from 'react';
import { Play, Info, Bookmark, BookmarkCheck, Star, ChevronLeft, ChevronRight, Video } from 'lucide-react';
import { getBackdropUrl } from '../services/api';
import { storage } from '../services/storage';

export default function HeroBanner({
  featuredMovies = [],
  onWatch,
  onOpenDetail,
  onOpenTrailer,
  watchlist,
  setWatchlist
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotate banner every 8 seconds
  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  if (!featuredMovies || featuredMovies.length === 0) {
    return (
      <div
        className="skeleton"
        style={{
          width: '100%',
          height: '75vh',
          minHeight: '520px',
        }}
      />
    );
  }

  const current = featuredMovies[currentIndex] || featuredMovies[0];
  const isBookmarked = storage.isInWatchlist(current.id);

  const handleToggleWatchlist = (e) => {
    e.stopPropagation();
    const updated = storage.toggleWatchlist(current);
    setWatchlist(updated);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredMovies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '80vh',
        height: '80vh',
        maxHeight: '750px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        background: '#07090e',
      }}
    >
      {/* Background Backdrop Image */}
      <div
        key={current.id}
        className="fade-in"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${getBackdropUrl(current.backdrop_path, 'original')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          filter: 'brightness(0.85)',
          transition: 'all 0.7s ease',
        }}
      />

      {/* Cinematic Vignette & Gradients Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to top, #07090e 0%, rgba(7, 9, 14, 0.8) 35%, rgba(7, 9, 14, 0.2) 70%, rgba(7, 9, 14, 0.5) 100%),
            linear-gradient(to right, #07090e 0%, rgba(7, 9, 14, 0.85) 30%, rgba(7, 9, 14, 0.3) 60%, transparent 100%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Banner Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 10, paddingBottom: '4.5rem' }}>
        <div style={{ maxWidth: '680px' }} className="slide-up">
          
          {/* Tags & Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
            <span className="badge badge-hd">4K ULTRA HD</span>
            <span className="badge badge-sub">SUB INDO</span>
            {current.media_type === 'tv' ? (
              <span className="badge badge-series">SERIAL TV</span>
            ) : (
              <span className="badge badge-anime">FILM BIOSKOP</span>
            )}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                color: '#facc15',
                fontSize: '0.85rem',
                fontWeight: 700,
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(250, 204, 21, 0.3)',
              }}
            >
              <Star size={14} fill="#facc15" color="#facc15" />
              <span>{current.vote_average?.toFixed(1) || '8.5'}</span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>TMDB</span>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {current.release_date?.slice(0, 4) || current.first_air_date?.slice(0, 4) || '2026'}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              lineHeight: 1.15,
              fontWeight: 900,
              marginBottom: '1rem',
              color: '#ffffff',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
            }}
          >
            {current.title || current.name}
          </h1>

          {/* Overview text */}
          <p
            style={{
              fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
            }}
          >
            {current.overview ||
              'Saksikan kisah menarik dan penuh aksi dengan kualitas visual terbaik dan subtitle Indonesia lengkap di FaizFilm.'}
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onWatch(current)}
              className="btn btn-primary"
              style={{
                fontSize: '1rem',
                padding: '0.8rem 1.75rem',
                borderRadius: 'var(--radius-full)',
              }}
            >
              <Play size={20} fill="#ffffff" />
              <span>Tonton Sekarang</span>
            </button>

            <button
              onClick={() => onOpenTrailer(current)}
              className="btn btn-secondary"
              style={{
                fontSize: '0.95rem',
                padding: '0.8rem 1.25rem',
                borderRadius: 'var(--radius-full)',
              }}
            >
              <Video size={18} />
              <span>Trailer</span>
            </button>

            <button
              onClick={() => onOpenDetail(current)}
              className="btn btn-secondary"
              style={{
                fontSize: '0.95rem',
                padding: '0.8rem 1.25rem',
                borderRadius: 'var(--radius-full)',
              }}
            >
              <Info size={18} />
              <span>Info Lengkap</span>
            </button>

            <button
              onClick={handleToggleWatchlist}
              className="btn-icon"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: isBookmarked ? 'rgba(229, 9, 20, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                borderColor: isBookmarked ? '#e50914' : 'rgba(255, 255, 255, 0.2)',
                color: isBookmarked ? '#fca5a5' : '#fff',
              }}
              title={isBookmarked ? 'Hapus dari Watchlist' : 'Tambah ke Watchlist'}
            >
              {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Slider Controls (Next/Prev Arrows & Dots) */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          zIndex: 20,
        }}
      >
        <button
          onClick={handlePrev}
          className="btn-icon"
          style={{ width: '38px', height: '38px', borderRadius: '50%' }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {featuredMovies.slice(0, 6).map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: idx === currentIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: 'var(--radius-full)',
                background: idx === currentIndex ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="btn-icon"
          style={{ width: '38px', height: '38px', borderRadius: '50%' }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
