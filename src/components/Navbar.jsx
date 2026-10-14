import React, { useState, useEffect, useRef } from 'react';
import {
  Film,
  Search,
  Bookmark,
  History,
  Tv,
  Sparkles,
  Flame,
  Settings,
  X,
  Menu,
  PlayCircle,
  Shuffle,
  Trophy,
  Radio
} from 'lucide-react';
import { tmdbApi, getPosterUrl } from '../services/api';

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenWatchlist,
  onOpenHistory,
  onOpenSettings,
  onOpenRandom,
  onSelectMovie,
  watchlistCount,
  historyCount
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef(null);

  // Scroll detection for navbar background blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const data = await tmdbApi.searchMulti(searchQuery);
        const filtered = (data.results || [])
          .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
          .filter(item => item.poster_path || item.backdrop_path)
          .slice(0, 8);
        setSearchResults(filtered);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Sparkles },
    { id: 'sports', label: 'Live Olahraga', icon: Trophy, isLive: true },
    { id: 'movies', label: 'Film Barat', icon: Film },
    { id: 'indo', label: 'Film Indo', icon: Film },
    { id: 'kdrama', label: 'Drakor', icon: Flame },
    { id: 'anime', label: 'Anime (Bstation)', icon: PlayCircle },
    { id: 'series', label: 'Serial TV', icon: Tv },
    { id: 'genre', label: 'Genre', icon: Sparkles },
  ];

  const handleItemClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSearchResult = (item) => {
    onSelectMovie({
      ...item,
      media_type: item.media_type || (item.title ? 'movie' : 'tv')
    });
    setShowSearchDropdown(false);
    setSearchQuery('');
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        transition: 'all 0.3s ease',
        background: isScrolled
          ? 'rgba(7, 9, 14, 0.95)'
          : 'linear-gradient(to bottom, rgba(7, 9, 14, 0.9) 0%, rgba(7, 9, 14, 0) 100%)',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
      }}
    >
      <div className="container" style={{ padding: '0.85rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          
          {/* Logo Brand */}
          <div
            onClick={() => handleItemClick('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: '#e50914',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(229, 9, 20, 0.4)',
              }}
            >
              <Film size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.4rem',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    color: '#ffffff',
                  }}
                >
                  Faiz<span style={{ color: '#e50914' }}>Film</span>
                </span>
                <span
                  style={{
                    fontSize: '0.62rem',
                    padding: '0.12rem 0.35rem',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#cbd5e1',
                    fontWeight: 800,
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    letterSpacing: '0.04em',
                  }}
                >
                  NETFLIX • PRIME • SPORTS
                </span>
              </div>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block' }}>
                Nonton Film & Siaran Bola Gratis
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav
            style={{
              display: 'none',
              gap: '0.5rem',
              alignItems: 'center',
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.5rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: isActive ? 'rgba(229, 9, 20, 0.12)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderBottom: isActive ? '2px solid #e50914' : '2px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  <Icon size={15} color={item.isLive ? '#e50914' : 'inherit'} />
                  <span>{item.label}</span>
                  {item.isLive && (
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#e50914',
                        display: 'inline-block',
                      }}
                      className="pulse-live"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search Box & Action Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
            
            {/* Search Input Container */}
            <div ref={searchRef} style={{ position: 'relative', width: '260px' }} className="search-container">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.45rem 0.95rem',
                  gap: '0.5rem',
                  transition: 'all 0.25s ease',
                }}
              >
                <Search size={16} color="var(--text-dim)" />
                <input
                  type="text"
                  placeholder="Cari film, serial, anime..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  onFocus={() => setShowSearchDropdown(true)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#fff',
                    fontSize: '0.85rem',
                    width: '100%',
                    fontFamily: 'inherit',
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-dim)',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Live Search Autocomplete Dropdown */}
              {showSearchDropdown && (searchQuery.trim().length > 0 || isSearching) && (
                <div
                  className="glass-panel slide-up"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    right: 0,
                    minWidth: '320px',
                    borderRadius: 'var(--radius-md)',
                    maxHeight: '420px',
                    overflowY: 'auto',
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 1001,
                    padding: '0.5rem',
                  }}
                >
                  {isSearching ? (
                    <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <div className="skeleton" style={{ height: '24px', marginBottom: '8px' }} />
                      <div className="skeleton" style={{ height: '24px' }} />
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div>
                      <div
                        style={{
                          fontSize: '0.72rem',
                          color: 'var(--text-dim)',
                          padding: '0.4rem 0.6rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                        }}
                      >
                        Hasil Pencarian ({searchResults.length})
                      </div>
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectSearchResult(item)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            transition: 'background 0.2s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                          <img
                            src={getPosterUrl(item.poster_path, 'w92')}
                            alt={item.title || item.name}
                            style={{
                              width: '40px',
                              height: '56px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                            }}
                          />
                          <div style={{ overflow: 'hidden' }}>
                            <div
                              style={{
                                fontSize: '0.88rem',
                                fontWeight: 600,
                                color: '#fff',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {item.title || item.name}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                              <span>{item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4) || 'TBA'}</span>
                              <span>•</span>
                              <span style={{ color: '#facc15', fontWeight: 600 }}>★ {item.vote_average?.toFixed(1) || '0.0'}</span>
                              <span>•</span>
                              <span style={{ textTransform: 'uppercase', color: '#e50914', fontSize: '0.68rem', fontWeight: 700 }}>
                                {item.media_type === 'tv' ? 'Serial' : 'Film'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Tidak ada film atau anime ditemukan untuk "{searchQuery}".
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Random Movie / Feeling Lucky Button */}
            <button
              onClick={onOpenRandom}
              className="btn-icon"
              title="Aku Lagi Bingung (Pilih Film Acak)"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#f5c518',
              }}
            >
              <Shuffle size={16} />
            </button>

            {/* Watchlist Bookmark Button */}
            <button
              onClick={onOpenWatchlist}
              className="btn-icon"
              title="Daftar Disimpan / Bookmark"
              style={{ position: 'relative' }}
            >
              <Bookmark size={18} />
              {watchlistCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: '#f43f5e',
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 8px rgba(244, 63, 94, 0.7)',
                  }}
                >
                  {watchlistCount > 9 ? '9+' : watchlistCount}
                </span>
              )}
            </button>

            {/* Watch History Button */}
            <button
              onClick={onOpenHistory}
              className="btn-icon"
              title="Riwayat Tonton"
              style={{ position: 'relative' }}
            >
              <History size={18} />
              {historyCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: '#e50914',
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 8px rgba(229, 9, 20, 0.7)',
                  }}
                >
                  {historyCount > 9 ? '9+' : historyCount}
                </span>
              )}
            </button>

            {/* Settings & Info Button */}
            <button
              onClick={onOpenSettings}
              className="btn-icon"
              title="Pengaturan & Server"
            >
              <Settings size={18} />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-icon mobile-menu-btn"
              style={{ display: 'none' }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div
            className="glass-panel slide-up"
            style={{
              marginTop: '0.85rem',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
            }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.65rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: isActive ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
                    color: isActive ? '#a5b4fc' : 'var(--text-main)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.92rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenRandom) onOpenRandom();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(236, 72, 153, 0.3)',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))',
                color: '#f472b6',
                fontWeight: 700,
                fontSize: '0.92rem',
                textAlign: 'left',
                cursor: 'pointer',
                marginTop: '0.35rem',
              }}
            >
              <Shuffle size={18} />
              <span>🎲 Pilih Film Acak (Lagi Bingung)</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
        }
        @media (max-width: 991px) {
          .mobile-menu-btn {
            display: flex !important;
          }
          .search-container {
            width: 180px !important;
          }
        }
        @media (max-width: 576px) {
          .search-container {
            width: 130px !important;
          }
        }
      `}</style>
    </header>
  );
}
