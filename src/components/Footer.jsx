import React from 'react';
import { Film, Heart, Shield, Tv, Sparkles } from 'lucide-react';

export default function Footer({ onSelectTab }) {
  return (
    <footer
      style={{
        background: '#04060a',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '3.5rem 0 2rem 0',
        marginTop: '5rem',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
          className="footer-grid"
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#e50914',
                  boxShadow: '0 4px 14px rgba(229, 9, 20, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Film size={20} color="#fff" />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-heading)' }}>
                Faiz<span style={{ color: '#e50914' }}>Film</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '380px' }}>
              Platform streaming film bioskop, serial TV, drama Korea, anime, dan siaran langsung olahraga gratis kualitas 4K & 1080p Full HD dengan server ala Netflix & Prime Video.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <span className="badge badge-hd">4K / 1080P HD</span>
              <span className="badge badge-sub">SUBTITLE INDONESIA</span>
              <span className="badge badge-series">NETFLIX & PRIME SERVERS</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
              Kategori & Live
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem' }}>
              {[
                { tab: 'sports', label: '🔴 Live Olahraga (Gratis)' },
                { tab: 'movies', label: 'Film Bioskop Terbaru' },
                { tab: 'series', label: 'Serial TV Terpopuler' },
                { tab: 'kdrama', label: 'Drama Korea (Drakor)' },
                { tab: 'anime', label: 'Anime Sub Indo (Bstation)' },
                { tab: 'indo', label: 'Film Bioskop Indonesia' },
                { tab: 'genre', label: 'Jelajah Genre Film' },
              ].map(({ tab, label }) => (
                <button
                  key={tab}
                  onClick={() => onSelectTab(tab)}
                  style={{ background: 'none', border: 'none', color: tab === 'sports' ? '#e50914' : 'var(--text-muted)', fontWeight: tab === 'sports' ? 700 : 400, textAlign: 'left', cursor: 'pointer', padding: 0, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#e50914')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = tab === 'sports' ? '#e50914' : 'var(--text-muted)')}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Server Providers */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
              Server Streaming
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span style={{ color: '#e50914', fontWeight: 700 }}>Server 1: Netflix VIP (4K)</span>
              <span style={{ color: '#00a8e1', fontWeight: 700 }}>Server 2: Prime Video HD</span>
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>Server 3: Disney+ Stream</span>
              <span>VidLink Pro HD</span>
              <span>Idlix Prime Sub Indo</span>
              <span>LK21 VIP Ultra</span>
              <span>Cloud Backup Fast</span>
            </div>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
              Disclaimer & Info
            </h4>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.78rem', lineHeight: 1.6 }}>
              FaizFilm tidak menyimpan file video apa pun di server kami. Semua konten video disediakan oleh penyedia embed pihak ketiga yang tidak berafiliasi. Web ini dibuat sepenuhnya menggunakan <strong>React</strong> untuk kebutuhan rekreasi dan portfolio.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
          }}
        >
          <div>
            © 2026 FaizFilm. Dibuat dengan ❤️ menggunakan React murni.
          </div>
          <div>
            Inspirasi: IDLIX • LayarKaca21 (LK21) • Moviebox • Bstation
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 550px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
