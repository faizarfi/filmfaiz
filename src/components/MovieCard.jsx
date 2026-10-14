import React from 'react';
import { Star, Play, Bookmark, BookmarkCheck, Film, Tv } from 'lucide-react';
import { getPosterUrl } from '../services/api';
import { storage } from '../services/storage';

export default function MovieCard({
  movie,
  onWatch,
  onOpenDetail,
  watchlist,
  setWatchlist
}) {
  if (!movie) return null;

  const title = movie.title || movie.name || 'Judul Film';
  const releaseYear =
    movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || '2026';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '7.8';
  const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');

  const isBookmarked = storage.isInWatchlist(movie.id);

  const handleToggleBookmark = (e) => {
    e.stopPropagation();
    const updated = storage.toggleWatchlist(movie);
    if (setWatchlist) setWatchlist(updated);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    onWatch(movie);
  };

  return (
    <div
      className="movie-card"
      onClick={() => onOpenDetail(movie)}
      title={`${title} (${releaseYear})`}
    >
      {/* Poster Container */}
      <div className="movie-card-poster-wrap">
        <img
          src={getPosterUrl(movie.poster_path, 'w500')}
          alt={title}
          loading="lazy"
          className="movie-card-poster"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=80';
          }}
        />

        {/* Badges Top */}
        <div className="movie-card-badges">
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            <span className="badge badge-hd">HD</span>
            <span className="badge badge-sub">SUB</span>
          </div>
          <div
            className="badge badge-rating"
            style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}
          >
            <Star size={11} fill="#facc15" color="#facc15" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Hover Overlay with Quick Action Buttons */}
        <div className="movie-card-overlay">
          <button
            onClick={handlePlayClick}
            className="play-circle-btn"
            title="Tonton Sekarang"
          >
            <Play size={24} fill="#ffffff" style={{ marginLeft: '2px' }} />
          </button>

          {/* Quick Bookmark Toggle button */}
          <button
            onClick={handleToggleBookmark}
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              background: isBookmarked ? 'rgba(99, 102, 241, 0.9)' : 'rgba(0, 0, 0, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
            }}
            title={isBookmarked ? 'Hapus Simpanan' : 'Simpan ke Watchlist'}
          >
            {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="movie-card-content">
        <h4 className="movie-card-title">{title}</h4>
        <div className="movie-card-meta">
          <span>{releaseYear}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            {mediaType === 'tv' ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#c084fc' }}>
                <Tv size={12} />
                <span>Serial</span>
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#67e8f9' }}>
                <Film size={12} />
                <span>Film</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
