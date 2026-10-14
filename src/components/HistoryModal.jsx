import React from 'react';
import { X, History, Trash2, Play, Clock } from 'lucide-react';
import { getPosterUrl } from '../services/api';
import { storage } from '../services/storage';

export default function HistoryModal({
  history = [],
  setHistory,
  onClose,
  onResumeWatch
}) {
  const handleRemove = (id) => {
    const updated = storage.removeHistoryItem(id);
    setHistory(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('Hapus seluruh riwayat tonton?')) {
      const updated = storage.clearHistory();
      setHistory(updated);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Baru saja';
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return 'Baru saja';
    if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
    return `${Math.floor(diff / 86400)} hari yang lalu`;
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
            <History size={22} color="#e50914" />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                Riwayat Menonton
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                {history.length} film / episode yang baru saja dibuka
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="btn btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.4rem 0.8rem' }}
              >
                Kosongkan Riwayat
              </button>
            )}
            <button onClick={onClose} className="btn-icon btn-danger" style={{ borderRadius: '50%' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* History List */}
        <div style={{ padding: '1.25rem', overflowY: 'auto', flex: 1 }}>
          {history.length === 0 ? (
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
                <Clock size={28} color="var(--text-dim)" />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Belum ada riwayat tonton film atau serial.
              </p>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Film yang kamu putar akan otomatis tercatat di sini sehingga kamu bisa melanjutkan kapan saja.
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {history.map((item) => (
                <div
                  key={`${item.id}-${item.watchedAt}`}
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
                          flexWrap: 'wrap',
                        }}
                      >
                        {item.mediaType === 'tv' ? (
                          <span className="badge badge-series">
                            Season {item.season} • Episode {item.episode}
                          </span>
                        ) : (
                          <span className="badge badge-hd">Film Full HD</span>
                        )}
                        <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                          {formatTime(item.watchedAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        onClose();
                        onResumeWatch(item);
                      }}
                      className="btn btn-primary"
                      style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}
                    >
                      <Play size={15} fill="#fff" />
                      <span>Lanjutkan</span>
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="btn-icon btn-danger"
                      title="Hapus riwayat"
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
