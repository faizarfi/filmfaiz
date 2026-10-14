import React, { useState } from 'react';
import { X, Settings, Server, Key, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';
import { STREAM_SERVERS } from '../services/streamServers';

export default function SettingsModal({ onClose }) {
  const [customKey, setCustomKey] = useState(
    localStorage.getItem('faizfilm_custom_api_key') ||
    localStorage.getItem('cinestream_custom_api_key') ||
    ''
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveKey = () => {
    if (customKey.trim()) {
      localStorage.setItem('faizfilm_custom_api_key', customKey.trim());
    } else {
      localStorage.removeItem('faizfilm_custom_api_key');
      localStorage.removeItem('cinestream_custom_api_key');
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      window.location.reload();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: 'rgba(13, 17, 26, 0.96)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-lg)',
          maxHeight: '90vh',
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
            <Settings size={22} color="#e50914" />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                Pengaturan & Status Server
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                Konfigurasi API, Server Streaming & Tips Menonton
              </span>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon btn-danger" style={{ borderRadius: '50%' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Server Status List */}
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Server size={16} color="#10b981" />
              <span>Status Server Embed (MultiEmbed / Smashy / VidSrc / AutoEmbed):</span>
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              {STREAM_SERVERS.map((s) => (
                <div
                  key={s.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>{s.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{s.quality} • {s.speed}</div>
                  </div>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#10b981',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    ONLINE
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AdBlock Recommendations */}
          <div
            style={{
              background: 'rgba(229, 9, 20, 0.06)',
              border: '1px solid rgba(229, 9, 20, 0.22)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
            }}
          >
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={18} color="#e50914" />
              <span>Tips Bebas Iklan Pop-up (100% Bersih):</span>
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Server streaming gratis dari pihak ketiga biasanya menampilkan tab iklan saat pertama kali tombol play diklik. Untuk pengalaman seperti bioskop tanpa iklan sedikitpun:
            </p>
            <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
              <li>Gunakan <strong>Brave Browser</strong> (otomatis blokir pop-up bawaan).</li>
              <li>Atau pasang ekstensi <strong>uBlock Origin</strong> pada Google Chrome / Firefox / Edge.</li>
            </ul>
          </div>

          {/* Custom TMDB API Key (Optional) */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
            }}
          >
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Key size={16} color="#f59e0b" />
              <span>Kunci API TMDB Pribadi (Opsional):</span>
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
              Aplikasi ini sudah dilengkapi API TMDB bawaan aktif. Jika kamu ingin menggunakan API Key TMDB milikmu sendiri:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Masukkan TMDB v3 API Key (32 karakter)"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                style={{
                  flex: 1,
                  background: '#0a0e17',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.55rem 0.85rem',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
              <button onClick={handleSaveKey} className="btn btn-primary" style={{ fontSize: '0.82rem' }}>
                Simpan
              </button>
            </div>

            {savedSuccess && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                <CheckCircle2 size={15} />
                <span>Pengaturan berhasil disimpan! Memuat ulang...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
