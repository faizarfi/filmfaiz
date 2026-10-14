import React, { useState } from 'react';
import {
  Trophy,
  Activity,
  Zap,
  Flame,
  Compass,
  Star,
  Shield,
  Play,
  Users,
  Radio,
  ExternalLink,
  Tv,
  CheckCircle2,
  Globe,
  Calendar,
  Clock
} from 'lucide-react';
import {
  SPORTS_CATEGORIES,
  SPORTS_TV_CHANNELS,
  TODAY_LIVE_SCHEDULE,
  LIVE_STREAMING_PORTALS
} from '../services/sportsData';

export default function SportsSection({ onWatchMatch, onShareMatch }) {
  const [activeViewMode, setActiveViewMode] = useState('channels'); // 'channels' | 'schedule' | 'portals'
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredChannels = SPORTS_TV_CHANNELS.filter((ch) => {
    if (selectedCategory === 'all') return true;
    return ch.category === selectedCategory || ch.category === 'all';
  });

  const filteredSchedule = TODAY_LIVE_SCHEDULE.filter((match) => {
    if (selectedCategory === 'all') return true;
    return match.category === selectedCategory || match.category === 'all';
  });

  return (
    <div className="container" style={{ paddingTop: '5.5rem', paddingBottom: '3.5rem' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '0.2rem 0.55rem',
              borderRadius: '4px',
              background: '#e50914',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              letterSpacing: '0.04em',
            }}
          >
            <Radio size={12} className="pulse-live" />
            SIARAN STREAMING ASLI
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            100% Siaran Langsung Real-Time • Bukan Siaran Ulang / Bukan Dummy
          </span>
        </div>

        <h1 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#ffffff' }}>
          Siaran Langsung Olahraga (Live Sports Real-Time)
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '820px', marginTop: '0.35rem', lineHeight: 1.6 }}>
          Saksikan siaran olahraga asli 24 jam non-stop dari jaringan internasional (<strong>SpoTV MotoGP</strong>, <strong>beIN Sports</strong>, <strong>Sky Sports PL</strong>, <strong>Trans7 Live</strong>, <strong>BWF Badminton</strong>, hingga <strong>TNT Sports UFC</strong>) serta pertandingan hari ini tanpa rekayasa.
        </p>
      </div>

      {/* Main View Mode Tabs (Saluran TV 24/7, Jadwal Pertandingan Hari Ini, Portal Live) */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '1.75rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => setActiveViewMode('channels')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: activeViewMode === 'channels' ? '#e50914' : 'rgba(255, 255, 255, 0.04)',
            border: activeViewMode === 'channels' ? '1px solid #e50914' : '1px solid rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <Tv size={16} />
          <span>Saluran TV Olahraga Live 24 Jam ({SPORTS_TV_CHANNELS.length})</span>
        </button>

        <button
          onClick={() => setActiveViewMode('schedule')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: activeViewMode === 'schedule' ? '#e50914' : 'rgba(255, 255, 255, 0.04)',
            border: activeViewMode === 'schedule' ? '1px solid #e50914' : '1px solid rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <Calendar size={16} />
          <span>Jadwal & Laga Live Hari Ini ({TODAY_LIVE_SCHEDULE.length})</span>
        </button>

        <button
          onClick={() => setActiveViewMode('portals')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: activeViewMode === 'portals' ? '#e50914' : 'rgba(255, 255, 255, 0.04)',
            border: activeViewMode === 'portals' ? '1px solid #e50914' : '1px solid rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <Globe size={16} />
          <span>Server Siaran Langsung Real-Time ({LIVE_STREAMING_PORTALS.length})</span>
        </button>
      </div>

      {/* Category Filter Pills (Shown for Channels and Schedule) */}
      {(activeViewMode === 'channels' || activeViewMode === 'schedule') && (
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.6rem',
            marginBottom: '1.75rem',
            scrollbarWidth: 'none',
          }}
        >
          {SPORTS_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid #e50914' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: isSelected ? '#e50914' : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? '#ffffff' : 'var(--text-muted)',
                  fontSize: '0.84rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 1: SALURAN TV OLAHRAGA 24/7 */}
      {activeViewMode === 'channels' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filteredChannels.map((channel) => (
            <div
              key={channel.id}
              style={{
                background: '#13161f',
                border: '1px solid rgba(229, 9, 20, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#e50914';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(229, 9, 20, 0.25)';
              }}
            >
              <div>
                {/* Header: Channel Name, Live Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        flexShrink: 0,
                      }}
                    >
                      <img src={channel.logo} alt={channel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                        {channel.name}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: '#e50914', fontWeight: 700 }}>
                        {channel.tag}
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      background: '#e50914',
                      color: '#ffffff',
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} className="pulse-live" />
                    LIVE 24 JAM
                  </span>
                </div>

                {/* Description */}
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.55, marginBottom: '0.85rem' }}>
                  {channel.description}
                </p>

                {/* Quality & Broadcaster Meta */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', paddingTop: '0.65rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <span>{channel.quality}</span>
                  <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Users size={12} /> {channel.viewers} menonton
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => onWatchMatch(channel)}
                  className="btn btn-primary"
                  style={{ flex: 1, fontSize: '0.84rem', padding: '0.6rem' }}
                >
                  <Play size={14} fill="#fff" />
                  <span>Buka Pemutar Saluran</span>
                </button>

                <a
                  href={channel.directUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '0.6rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    whiteSpace: 'nowrap',
                  }}
                  title="Buka Siaran Langsung di Tab Baru Bebas Proteksi"
                >
                  <span>Feed Asli</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODE 2: JADWAL & LAGA LIVE HARI INI */}
      {activeViewMode === 'schedule' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filteredSchedule.map((item) => (
            <div
              key={item.id}
              style={{
                background: '#13161f',
                border: item.status === 'LIVE' ? '1px solid rgba(229, 9, 20, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#e50914';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = item.status === 'LIVE' ? 'rgba(229, 9, 20, 0.4)' : 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div>
                {/* Header: Tournament & Status */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.tournament}
                  </span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      background: item.status === 'LIVE' ? '#e50914' : 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                    }}
                  >
                    {item.timeWIB}
                  </span>
                </div>

                {/* Match Title */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.65rem', lineHeight: 1.35 }}>
                  {item.eventTitle}
                </h3>

                {/* Meta: Broadcaster & Quality */}
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div>Penyiaran: <strong style={{ color: '#fff' }}>{item.broadcaster}</strong></div>
                  <div>Kualitas: <span style={{ color: '#10b981' }}>{item.quality}</span></div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => onWatchMatch(item)}
                  className="btn btn-primary"
                  style={{ flex: 1, fontSize: '0.84rem', padding: '0.6rem' }}
                >
                  <Play size={14} fill="#fff" />
                  <span>Nonton Siaran Langsung</span>
                </button>

                <a
                  href={item.directUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '0.6rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    whiteSpace: 'nowrap',
                  }}
                  title="Buka Feed di Tab Baru"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODE 3: PORTAL SIARAN PERTANDINGAN HARI INI */}
      {activeViewMode === 'portals' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {LIVE_STREAMING_PORTALS.map((portal) => (
            <div
              key={portal.id}
              style={{
                background: '#13161f',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-md)',
                padding: '1.35rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = portal.badgeColor || '#e50914';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: portal.badgeColor || '#ffffff',
                      border: `1px solid ${portal.badgeColor || '#ffffff'}40`,
                    }}
                  >
                    {portal.badge}
                  </span>
                  <Radio size={14} color="#10b981" className="pulse-live" />
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.65rem' }}>
                  {portal.name}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.55, marginBottom: '1rem' }}>
                  {portal.description}
                </p>

                {/* Features List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {portal.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: '#e2e8f0' }}>
                      <CheckCircle2 size={13} color="#10b981" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={portal.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  padding: '0.65rem',
                }}
              >
                <span>Buka Siaran Langsung di {portal.name.split(' ')[0]}</span>
                <ExternalLink size={15} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
