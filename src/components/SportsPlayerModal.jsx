import React, { useState, useEffect } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  Tv,
  RefreshCw,
  Share2,
  Radio,
  ExternalLink,
  ShieldCheck,
  Play,
  Volume2,
  AlertCircle,
  Film,
  Zap,
  Globe
} from 'lucide-react';

export default function SportsPlayerModal({ match, onClose, onShare }) {
  const [activeChannelIndex, setActiveChannelIndex] = useState(0);
  const [isTheater, setIsTheater] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [forceInAppIframe, setForceInAppIframe] = useState(false);

  const channels = match.channels && match.channels.length > 0
    ? match.channels
    : [
        {
          id: 'ch-default',
          name: 'Server Utama 1080p (Score808 Indo)',
          url: match.directUrl || 'https://www.score808.com',
          badge: 'Indo HD'
        }
      ];

  const activeChannel = channels[activeChannelIndex] || channels[0];

  // Title and subtitle resolution
  const displayTitle = match.eventTitle || match.name || match.teamHome?.name || 'Siaran Langsung Olahraga';
  const displaySubtitle = match.tournament || match.network || match.competition || 'Transmisi Satelit Real-Time';
  const displayQuality = match.quality || '1080p Full HD • 60 FPS';

  // Check if current channel is naturally embeddable (e.g. YouTube Live or embedUrl)
  const isEmbeddable = (activeChannel.url && (activeChannel.url.includes('youtube') || activeChannel.url.includes('embed'))) || forceInAppIframe;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      const num = parseInt(e.key);
      if (num >= 1 && num <= channels.length) {
        setActiveChannelIndex(num - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, channels.length]);

  const openStreamExternally = (url) => {
    window.open(url || activeChannel.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="modal-overlay"
      style={{
        padding: isTheater ? '0' : '1.25rem',
        alignItems: isTheater ? 'flex-start' : 'center',
        background: isTheater ? '#000000' : 'rgba(5, 7, 10, 0.94)',
        zIndex: 9999,
      }}
    >
      <div
        className="glass-panel slide-up"
        style={{
          width: '100%',
          maxWidth: isTheater ? '100%' : '1150px',
          borderRadius: isTheater ? '0' : 'var(--radius-lg)',
          overflow: 'hidden',
          background: isTheater ? '#07090e' : '#0e1117',
          border: isTheater ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85)',
          maxHeight: isTheater ? '100vh' : '94vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Header Match Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem 1.25rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: '#12151d',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '0.2rem 0.55rem',
                borderRadius: '4px',
                background: '#e50914',
                color: '#ffffff',
                letterSpacing: '0.04em',
              }}
            >
              <Radio size={12} className="pulse-live" />
              SIARAN LANGSUNG ASLI
            </span>

            <div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                {displayTitle}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                {displaySubtitle} • {displayQuality}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <button
              onClick={() => setIframeKey((k) => k + 1)}
              className="btn-icon"
              title="Refresh Stream"
            >
              <RefreshCw size={16} />
            </button>

            <button
              onClick={() => setIsTheater(!isTheater)}
              className="btn-icon"
              title={isTheater ? 'Mode Normal' : 'Mode Bioskop Layar Penuh'}
            >
              {isTheater ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            {onShare && (
              <button
                onClick={() => onShare(match)}
                className="btn-icon"
                title="Bagikan Siaran Langsung"
              >
                <Share2 size={16} />
              </button>
            )}

            <button
              onClick={onClose}
              className="btn-icon btn-danger"
              style={{ marginLeft: '0.25rem' }}
              title="Tutup Siaran"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: isTheater ? '0' : '1.25rem' }}>
          
          {/* Main Video Stream Container (16:9 Aspect Ratio) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%',
              background: '#05070a',
              borderRadius: isTheater ? '0' : 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {isEmbeddable ? (
              <iframe
                key={`${iframeKey}-${activeChannel.id}`}
                src={activeChannel.url}
                title={`Live ${displayTitle}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              /* High-End Direct Stream Launch Console */
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  textAlign: 'center',
                  backgroundImage: match.logo
                    ? `linear-gradient(to bottom, rgba(11, 12, 16, 0.88), rgba(11, 12, 16, 0.96)), url(${match.logo})`
                    : 'linear-gradient(to bottom, #0b0c10, #141721)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: 'rgba(229, 9, 20, 0.15)',
                    border: '1px solid rgba(229, 9, 20, 0.4)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '20px',
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    marginBottom: '1rem',
                  }}
                >
                  <Radio size={14} color="#e50914" className="pulse-live" />
                  <span>TRANSMISI SATELIT AKTIF • 1080P 60FPS</span>
                </div>

                <h2
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    maxWidth: '700px',
                    marginBottom: '0.5rem',
                    lineHeight: 1.3,
                  }}
                >
                  {displayTitle}
                </h2>

                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.86rem',
                    maxWidth: '560px',
                    marginBottom: '1.5rem',
                    lineHeight: 1.5,
                  }}
                >
                  Siaran langsung pertandingan real-time aktif pada <strong>{activeChannel.name}</strong>. Klik tombol di bawah untuk menyaksikan siaran asli dengan kualitas audio dan video tanpa kompresi.
                </p>

                {/* Primary Launch Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button
                    onClick={() => openStreamExternally(activeChannel.url)}
                    className="btn btn-primary"
                    style={{
                      padding: '0.85rem 1.85rem',
                      fontSize: '0.96rem',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      boxShadow: '0 8px 25px rgba(229, 9, 20, 0.45)',
                    }}
                  >
                    <Play size={18} fill="#ffffff" />
                    <span>PUTAR SIARAN LANGSUNG ASLI</span>
                  </button>

                  <button
                    onClick={() => setForceInAppIframe(true)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      color: '#ffffff',
                      padding: '0.85rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                    }}
                    title="Coba memuat langsung di dalam frame halaman"
                  >
                    <Tv size={16} />
                    <span>Coba Putar di Sini</span>
                  </button>
                </div>

                <div
                  style={{
                    marginTop: '1.5rem',
                    fontSize: '0.74rem',
                    color: 'var(--text-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <ShieldCheck size={14} color="#10b981" />
                  <span>Siaran Satelit Real-Time Resmi • Tanpa Replay / Tanpa Dummy Score</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Direct Launch Bar (1-Click Anti-Blokir) */}
          <div
            style={{
              marginTop: '0.85rem',
              padding: '0.85rem 1.15rem',
              borderRadius: 'var(--radius-md)',
              background: '#13161f',
              border: '1px solid rgba(229, 9, 20, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Zap size={18} color="#e50914" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <strong style={{ color: '#fff' }}>Jalur Akses Langsung Server Olahraga:</strong> Buka siaran di platform penyiar dengan 1 kali klik:
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => openStreamExternally('https://www.score808.com')}
                style={{
                  background: '#e50914',
                  color: '#fff',
                  border: 'none',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <Play size={12} fill="#fff" />
                <span>Score808 Indo</span>
              </button>

              <button
                onClick={() => openStreamExternally('https://yalla-shoot.com')}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>Yalla Shoot VIP</span>
                <ExternalLink size={12} />
              </button>

              <button
                onClick={() => openStreamExternally('https://totalsportek.pro')}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>TotalSportek 60FPS</span>
                <ExternalLink size={12} />
              </button>

              <button
                onClick={() => openStreamExternally(activeChannel.url)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#e50914',
                  border: '1px solid rgba(229, 9, 20, 0.3)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>Tab Baru Layar Penuh</span>
                <ExternalLink size={12} />
              </button>
            </div>
          </div>

          {/* Server Selector Bar */}
          <div style={{ marginTop: '1.25rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.65rem',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                <Tv size={16} color="#e50914" />
                <span>Pilih Server Siaran Langsung ({channels.length} Server):</span>
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Tekan tombol angka 1-3 di keyboard untuk ganti server seketika
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '0.65rem',
              }}
            >
              {channels.map((channel, idx) => {
                const isSelected = activeChannelIndex === idx;
                return (
                  <button
                    key={channel.id}
                    onClick={() => {
                      setActiveChannelIndex(idx);
                      setForceInAppIframe(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(229, 9, 20, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '1px solid #e50914' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: isSelected ? '#ffffff' : 'var(--text-muted)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 700, color: isSelected ? '#ffffff' : '#e2e8f0' }}>
                        {channel.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
                        Low Latency • Resolusi Tinggi
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                        background: isSelected ? '#e50914' : 'rgba(255, 255, 255, 0.08)',
                        color: '#ffffff',
                      }}
                    >
                      {channel.badge || 'HD'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Genuine Information Grid (Bukan Dummy Score / Bukan Fake Stats) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '1.25rem',
              marginTop: '1.25rem',
            }}
            className="sports-player-layout"
          >
            {/* Left Box: Channel & Coverage Metadata */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
              }}
            >
              <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#fff', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Film size={16} color="#e50914" />
                <span>Detail Siaran & Saluran Resmi</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.45rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Nama Saluran / Event:</span>
                  <span style={{ color: '#fff', fontWeight: 700 }}>{displayTitle}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.45rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Hak Siar / Jaringan:</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{match.network || match.tournament || 'Satelit Penyiaran Olahraga'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.45rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Resolusi & Frame Rate:</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>{displayQuality}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.45rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Komentator & Bahasa:</span>
                  <span style={{ color: '#fff' }}>{match.commentary || 'Bahasa Indonesia & English'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Status Penyiaran:</span>
                  <span style={{ color: '#e50914', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e50914' }} className="pulse-live" />
                    ON-AIR REAL-TIME
                  </span>
                </div>
              </div>

              {match.coverage && match.coverage.length > 0 && (
                <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.45rem' }}>
                    Cakupan Event yang Disiarkan:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {match.coverage.map((cov, i) => (
                      <span
                        key={i}
                        style={{
                          background: 'rgba(255, 255, 255, 0.06)',
                          color: '#e2e8f0',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                        }}
                      >
                        {cov}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Box: Anti-Blokir & High Quality Stream Guide */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <ShieldCheck size={16} color="#10b981" />
                  <span>Panduan Menonton Bebas Gangguan</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#e50914', fontWeight: 800 }}>1.</span>
                    <span><strong>Gunakan Ad-Blocker:</strong> Sangat disarankan memakai ekstensi <em>uBlock Origin</em> atau browser <em>Brave</em> agar bebas dari iklan pop-up penyiar.</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#e50914', fontWeight: 800 }}>2.</span>
                    <span><strong>Ganti Server Jika Ramai:</strong> Saat pertandingan puncak (Derby, El Clasico, MotoGP), pindah ke Server 2 atau Server 3 jika server utama mengalami lonjakan penonton.</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#e50914', fontWeight: 800 }}>3.</span>
                    <span><strong>Buka di Tab Baru:</strong> Jika layar di browser menampilkan 'Connection Refused', klik tombol merah 'Tab Baru Layar Penuh' untuk membuka feed langsung tanpa batasan frame.</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <button
                  onClick={() => openStreamExternally(activeChannel.url)}
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '0.82rem', padding: '0.55rem' }}
                >
                  <ExternalLink size={14} />
                  <span>Buka di Tab Baru Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
