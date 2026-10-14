import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

export const GENRE_CARDS = [
  { id: '28', name: 'Aksi', emoji: '💥', gradient: 'linear-gradient(135deg, #ef4444, #b91c1c)' },
  { id: '12', name: 'Petualangan', emoji: '🏔️', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  { id: '16', name: 'Animasi', emoji: '🎨', gradient: 'linear-gradient(135deg, #ec4899, #be185d)' },
  { id: '35', name: 'Komedi', emoji: '😂', gradient: 'linear-gradient(135deg, #eab308, #ca8a04)' },
  { id: '80', name: 'Kriminal', emoji: '🔫', gradient: 'linear-gradient(135deg, #6b7280, #374151)' },
  { id: '99', name: 'Dokumenter', emoji: '🎥', gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)' },
  { id: '18', name: 'Drama', emoji: '🎭', gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' },
  { id: '10751', name: 'Keluarga', emoji: '👨‍👩‍👧‍👦', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)' },
  { id: '14', name: 'Fantasi', emoji: '🧙', gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)' },
  { id: '27', name: 'Horor', emoji: '👻', gradient: 'linear-gradient(135deg, #1e1b4b, #312e81)' },
  { id: '10749', name: 'Romantis', emoji: '💕', gradient: 'linear-gradient(135deg, #f472b6, #db2777)' },
  { id: '878', name: 'Sci-Fi', emoji: '🚀', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)' },
  { id: '53', name: 'Thriller', emoji: '😱', gradient: 'linear-gradient(135deg, #78350f, #92400e)' },
  { id: '9648', name: 'Misteri', emoji: '🔍', gradient: 'linear-gradient(135deg, #1e3a5f, #1e40af)' },
  { id: '10752', name: 'Perang', emoji: '⚔️', gradient: 'linear-gradient(135deg, #57534e, #44403c)' },
  { id: '37', name: 'Koboi (Western)', emoji: '🤠', gradient: 'linear-gradient(135deg, #a16207, #854d0e)' },
];

export default function GenreCards({ onSelectGenre }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '1rem',
          }}
        >
          <Sparkles size={22} color="#e50914" />
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
            Jelajah Genre Film
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '0.85rem',
          }}
        >
          {GENRE_CARDS.map((genre) => (
            <button
              key={genre.id}
              onClick={() => onSelectGenre(genre.id, genre.name)}
              style={{
                position: 'relative',
                padding: '1.25rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: genre.gradient,
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                overflow: 'hidden',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Background emoji watermark */}
              <span
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-4px',
                  fontSize: '3.5rem',
                  opacity: 0.2,
                  pointerEvents: 'none',
                }}
              >
                {genre.emoji}
              </span>

              <div
                style={{
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                {genre.emoji}
              </div>
              <div
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                }}
              >
                {genre.name}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  marginTop: '0.3rem',
                  fontSize: '0.72rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 600,
                }}
              >
                <span>Lihat Film</span>
                <ChevronRight size={13} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
