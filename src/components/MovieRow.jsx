import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

export default function MovieRow({
  title,
  subtitle,
  icon: Icon,
  movies = [],
  onWatch,
  onOpenDetail,
  onViewAll,
  watchlist,
  setWatchlist
}) {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section style={{ marginBottom: '2.5rem', position: 'relative' }}>
      <div className="container">
        
        {/* Row Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {Icon && <Icon size={22} color="#e50914" />}
              <h2
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                {title}
              </h2>
            </div>
            {subtitle && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                {subtitle}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {onViewAll && (
              <button
                onClick={onViewAll}
                className="btn btn-secondary"
                style={{
                  fontSize: '0.78rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                Lihat Semua
              </button>
            )}

            <button
              onClick={() => handleScroll('left')}
              className="btn-icon"
              style={{ padding: '0.4rem', borderRadius: '50%' }}
              title="Geser ke kiri"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="btn-icon"
              style={{ padding: '0.4rem', borderRadius: '50%' }}
              title="Geser ke kanan"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Cards Container */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '0.75rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="movie-row-scroll"
        >
          {movies.map((movie) => (
            <div
              key={`${movie.id}-${movie.media_type || 'item'}`}
              style={{
                flex: '0 0 185px',
                scrollSnapAlign: 'start',
              }}
              className="movie-row-card-item"
            >
              <MovieCard
                movie={movie}
                onWatch={onWatch}
                onOpenDetail={onOpenDetail}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .movie-row-scroll::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 640px) {
          .movie-row-card-item {
            flex: 0 0 145px !important;
          }
        }
      `}</style>
    </section>
  );
}
