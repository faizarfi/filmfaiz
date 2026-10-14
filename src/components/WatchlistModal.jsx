import React from 'react';
import { X, Bookmark, Trash2, Play, Film, Tv } from 'lucide-react';
import { getPosterUrl } from '../services/api';
import { storage } from '../services/storage';

export default function WatchlistModal({
  watchlist = [],
  setWatchlist,
  onClose,
  onWatch
}) {
  const handleRemove = (id) => {
    const updated = storage.removeFromWatchlist(id);
    setWatchlist(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('Yakin ingin mengosongkan semua daftar tonton disimpan di FaizFilm?')) {
      const updated = storage.clearWatchlist();
      setWatchlist(updated);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '750px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: 'rgba(13, 17, 26, 0.95)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-lg)',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
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
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Bookmark size={22} color="#e50914" />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                Daftar Disimpan (Watchlist)
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                {watchlist.length} judul tersimpan
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {watchlist.length > 0 && (
              <button
                onClick={handleClearAll}
                className="btn btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.4rem 0.8rem' }}
              >
                Hapus Semua
              </button>
            )}
            <button onClick={onClose} className="btn-icon btn-danger" style={{ borderRadius: '50%' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* List Body */}
        <div style={{ padding: '1.25rem', overflowY: 'auto', flex: 1 }}>
          {watchlist.length === 0 ? (
            <div
              style={{
                padding: '3rem 1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Bookmark size={28} color="var(--text-dim)" />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Belum ada film atau serial yang kamu simpan.
              </p>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Klik tombol ikon Bookmark pada poster film untuk menyimpannya di sini.
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {watchlist.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', overflow: 'hidden' }}>
                    <img
                      src={getPosterUrl(item.poster_path, 'w92')}
                      alt={item.title}
                      style={{
                        width: '50px',
                        height: '75px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    />
                    <div style={{ overflow: 'hidden' }}>
                      <h4
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          color: '#fff',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.title}
                      </h4>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                          marginTop: '0.2rem',
                        }}
                      >
                        <span>{item.release_date?.slice(0, 4) || '2026'}</span>
                        <span>•</span>
                        <span style={{ color: '#facc15' }}>★ {item.vote_average?.toFixed(1) || '8.0'}</span>
                        <span>•</span>
                        <span style={{ textTransform: 'uppercase', color: '#e50914', fontWeight: 700, fontSize: '0.72rem' }}>
                          {item.media_type === 'tv' ? 'Serial' : 'Film'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        onClose();
                        onWatch(item);
                      }}
                      className="btn btn-primary"
                      style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}
                    >
                      <Play size={15} fill="#fff" />
                      <span>Tonton</span>
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="btn-icon btn-danger"
                      title="Hapus dari daftar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
