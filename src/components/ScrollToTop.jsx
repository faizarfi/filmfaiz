import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll ke atas"
      title="Kembali ke atas"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 800,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: '#e50914',
        border: 'none',
        color: '#ffffff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(229, 9, 20, 0.45)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)';
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.7), 0 0 60px rgba(99, 102, 241, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.5), 0 0 40px rgba(99, 102, 241, 0.15)';
      }}
    >
      <ArrowUp size={22} />
    </button>
  );
}
