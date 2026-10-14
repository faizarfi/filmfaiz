import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Video,
  Star,
  Clock,
  Calendar,
  Bookmark,
  BookmarkCheck,
  Film,
  Tv,
  Users,
  Share2
} from 'lucide-react';
import { tmdbApi, getPosterUrl, getBackdropUrl } from '../services/api';
import { storage } from '../services/storage';
import ShareModal from './ShareModal';

export default function DetailModal({
  movie,
  onClose,
  onWatch,
  onOpenTrailer,
  watchlist,
  setWatchlist
}) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);

  const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');
  const title = movie.title || movie.name || 'Detail Film';

  useEffect(() => {
    let isMounted = true;
    const fetchFull = async () => {
      try {
        setLoading(true);
        const data = await tmdbApi.getDetails(mediaType, movie.id);
        if (isMounted) setDetails(data);
      } catch (err) {
        console.error('Error fetching details:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchFull();
    return () => {
      isMounted = false;
    };
  }, [movie.id, mediaType]);

  const isBookmarked = storage.isInWatchlist(movie.id);
  const handleToggleBookmark = () => {
    const updated = storage.toggleWatchlist(movie);
    if (setWatchlist) setWatchlist(updated);
  };

  const runtime = details?.runtime
    ? `${Math.floor(details.runtime / 60)}j ${details.runtime % 60}m`
    : details?.number_of_seasons
    ? `${details.number_of_seasons} Season (${details.number_of_episodes || 0} Eps)`
    : 'N/A';

  const releaseDate =
    details?.release_date || details?.first_air_date || movie.release_date || movie.first_air_date || '2026';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '920px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          position: 'relative',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(13, 17, 26, 0.95)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-icon btn-danger"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 30,
            borderRadius: '50%',
          }}
        >
          <X size={20} />
        </button>

        {/* Backdrop Banner Header */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '280px',
            backgroundImage: `url(${getBackdropUrl(details?.backdrop_path || movie.backdrop_path)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(13, 17, 26, 1) 0%, rgba(13, 17, 26, 0.4) 100%)',
            }}
          />
        </div>

        {/* Body Content */}
        <div
          style={{
            padding: '1.75rem',
            marginTop: '-100px',
            position: 'relative',
            zIndex: 10,
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr',
              gap: '2rem',
            }}
            className="detail-grid"
          >
            {/* Poster */}
            <div>
              <img
                src={getPosterUrl(details?.poster_path || movie.poster_path, 'w500')}
                alt={title}
                style={{
                  width: '100%',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              />

              {/* Action Buttons Under Poster */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '1rem' }}>
                <button
                  onClick={() => {
                    onClose();
                    onWatch({ ...movie, media_type: mediaType });
                  }}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <Play size={18} fill="#fff" />
                  <span>Nonton Sekarang</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenTrailer(movie);
                  }}
                  className="btn btn-secondary"
                  style={{ width: '100%' }}
                >
                  <Video size={18} />
                  <span>Lihat Trailer</span>
                </button>

                <button
                  onClick={handleToggleBookmark}
                  className="btn btn-secondary"
                  style={{
                    width: '100%',
                    color: isBookmarked ? '#e50914' : 'inherit',
                  }}
                >
                  {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                  <span>{isBookmarked ? 'Tersimpan di Watchlist' : 'Simpan ke Watchlist'}</span>
                </button>

                <button
                  onClick={() => setShowShare(true)}
                  className="btn btn-secondary"
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                  }}
                >
                  <Share2 size={18} />
                  <span>Bagikan Film</span>
                </button>
              </div>
            </div>

            {/* Info Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                <span className="badge badge-hd">HD 1080P</span>
                <span className="badge badge-sub">SUBTITLE INDONESIA</span>
                {mediaType === 'tv' ? (
                  <span className="badge badge-series">SERIAL TV</span>
                ) : (
                  <span className="badge badge-anime">FILM BIOSKOP</span>
                )}
              </div>

              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                {title}
              </h1>

              {details?.tagline && (
                <p style={{ fontStyle: 'italic', color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  "{details.tagline}"
                </p>
              )}

              {/* Meta Stats row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '0.75rem 0',
                  borderTop: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)',
                  marginBottom: '1.25rem',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#facc15', fontWeight: 700 }}>
                  <Star size={16} fill="#facc15" color="#facc15" />
                  <span>{details?.vote_average ? details.vote_average.toFixed(1) : movie.vote_average?.toFixed(1) || '8.0'}</span>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>/ 10</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <Calendar size={15} />
                  <span>{releaseDate}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <Clock size={15} />
                  <span>{runtime}</span>
                </div>
              </div>

              {/* Genre Pills */}
              {details?.genres?.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                    {details.genres.map((g) => (
                      <span
                        key={g.id}
                        style={{
                          fontSize: '0.78rem',
                          padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--radius-full)',
                          background: 'rgba(99, 102, 241, 0.15)',
                          color: '#a5b4fc',
                          border: '1px solid rgba(99, 102, 241, 0.3)',
                          fontWeight: 600,
                        }}
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Synopsis */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                  Sinopsis:
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                  {details?.overview || movie.overview || 'Sinopsis belum tersedia untuk judul ini.'}
                </p>
              </div>

              {/* Cast */}
              {details?.credits?.cast?.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Users size={16} color="#e50914" />
                    <span>Pemeran Utama:</span>
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem' }}>
                    {details.credits.cast.slice(0, 6).map((actor) => (
                      <div
                        key={actor.id}
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.4rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        {actor.profile_path ? (
                          <img
                            src={getPosterUrl(actor.profile_path, 'w45')}
                            alt={actor.name}
                            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#252e42' }} />
                        )}
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {actor.name}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {actor.character}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showShare && (
        <ShareModal movie={movie} onClose={() => setShowShare(false)} />
      )}

      <style>{`
        @media (max-width: 680px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
