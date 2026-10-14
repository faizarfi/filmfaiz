import React, { useState, useEffect } from 'react';
import { Film } from 'lucide-react';

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadeOut(true);
          setTimeout(() => onFinish(), 450);
          return 100;
        }
        return prev + Math.random() * 20 + 8;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0b0c10',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
        transition: 'opacity 0.45s ease',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      {/* Cinematic Logo */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          zIndex: 2,
          animation: 'logoAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '14px',
            background: '#e50914',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 30px rgba(229, 9, 20, 0.4)',
          }}
        >
          <Film size={34} color="#ffffff" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '2.8rem',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: '#ffffff',
            }}
          >
            Faiz<span style={{ color: '#e50914' }}>Film</span>
          </h1>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginTop: '0.25rem',
            }}
          >
            Cinema • Series • Live Sports
          </p>
        </div>
      </div>

      {/* Sleek Progress Bar */}
      <div
        style={{
          width: '240px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '9999px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${Math.min(progress, 100)}%`,
              background: '#e50914',
              borderRadius: '9999px',
              transition: 'width 0.15s ease',
            }}
          />
        </div>

        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-dim)',
            fontWeight: 600,
          }}
        >
          Memuat tayangan terbaik... {Math.round(Math.min(progress, 100))}%
        </span>
      </div>

      <style>{`
        @keyframes logoAppear {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
