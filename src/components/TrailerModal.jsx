import React, { useState, useEffect } from 'react';
import { X, Play, AlertCircle, Video } from 'lucide-react';
import { tmdbApi } from '../services/api';

export default function TrailerModal({ movie, onClose }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');
  const title = movie.title || movie.name || 'Trailer';

  useEffect(() => {
    let isMounted = true;
    const fetchTrailer = async () => {
      try {
        setLoading(true);
        const data = await tmdbApi.getDetails(mediaType, movie.id);
        const videos = data.videos?.results || [];
        const found =
          videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
          videos.find((v) => v.site === 'YouTube' && v.type === 'Teaser') ||
          videos.find((v) => v.site === 'YouTube');

        if (isMounted) {
          if (found) setTrailerKey(found.key);
        }
      } catch (err) {
        console.error('Error fetching trailer:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTrailer();
    return () => {
      isMounted = false;
    };
  }, [movie.id, mediaType]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '900px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: '#07090e',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Video size={18} color="#f43f5e" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
              Trailer Resmi: {title}
            </h3>
          </div>
          <button onClick={onClose} className="btn-icon btn-danger" style={{ borderRadius: '50%' }}>
            <X size={18} />
          </button>
        </div>

        {/* Video Player */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#000' }}>
          {loading ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'var(--text-muted)',
              }}
            >
              Memuat trailer...
            </div>
          ) : trailerKey ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title={`Trailer ${title}`}
              width="100%"
              height="100%"
              allowFullScreen
              allow="autoplay; encrypted-media; fullscreen"
              style={{ border: 'none' }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: '1rem',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <AlertCircle size={40} color="#f59e0b" />
              <p style={{ color: 'var(--text-muted)', maxWidth: '400px', fontSize: '0.9rem' }}>
                Trailer resmi untuk film ini belum tersedia di basis data YouTube TMDB.
              </p>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' trailer')}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Cari Trailer di YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
