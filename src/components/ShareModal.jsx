import React from 'react';
import { Share2, X, MessageCircle, Send, Link2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function ShareModal({ movie, onClose }) {
  const [copied, setCopied] = useState(false);

  const title = movie?.title || movie?.name || 'Film';
  const shareText = `🎬 Nonton "${title}" gratis di FaizFilm! Kualitas HD Sub Indo, tersedia multi-server streaming.\n\n🔗 `;
  const shareUrl = window.location.href;
  const fullShareText = shareText + shareUrl;

  const shareOptions = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      color: '#25D366',
      icon: '💬',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(fullShareText)}`,
    },
    {
      id: 'telegram',
      name: 'Telegram',
      color: '#0088cc',
      icon: '✈️',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      color: '#1DA1F2',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullShareText)}`,
    },
    {
      id: 'facebook',
      name: 'Facebook',
      color: '#1877F2',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      id: 'line',
      name: 'LINE',
      color: '#00C300',
      icon: '💚',
      url: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullShareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: 'rgba(13, 17, 26, 0.96)',
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
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Share2 size={20} color="#e50914" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>
              Bagikan Film / Siaran Ini
            </h3>
          </div>
          <button onClick={onClose} className="btn-icon btn-danger" style={{ borderRadius: '50%' }}>
            <X size={18} />
          </button>
        </div>

        {/* Movie title preview */}
        <div
          style={{
            padding: '1rem 1.5rem',
            background: 'rgba(229, 9, 20, 0.06)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <p style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 600 }}>
            🎬 {title}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
            Kirim ke teman agar bisa nonton bareng!
          </p>
        </div>

        {/* Share Buttons Grid */}
        <div style={{ padding: '1.25rem 1.5rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              marginBottom: '1.25rem',
            }}
          >
            {shareOptions.map((opt) => (
              <a
                key={opt.id}
                href={opt.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 0.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${opt.color}22`;
                  e.currentTarget.style.borderColor = `${opt.color}55`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ fontSize: '1.6rem' }}>{opt.icon}</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: opt.color,
                  }}
                >
                  {opt.name}
                </span>
              </a>
            ))}

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 0.5rem',
                borderRadius: 'var(--radius-md)',
                background: copied ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                border: copied ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {copied ? (
                <>
                  <CheckCircle2 size={26} color="#10b981" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>Tersalin!</span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: '1.6rem' }}>🔗</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8' }}>Salin Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
