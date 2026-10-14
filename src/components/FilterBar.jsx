import React from 'react';
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

export const GENRES_LIST = [
  { id: '', name: 'Semua Genre' },
  { id: '28', name: 'Aksi (Action)' },
  { id: '12', name: 'Petualangan' },
  { id: '16', name: 'Animasi' },
  { id: '35', name: 'Komedi' },
  { id: '80', name: 'Kriminal' },
  { id: '99', name: 'Dokumenter' },
  { id: '18', name: 'Drama' },
  { id: '10751', name: 'Keluarga' },
  { id: '14', name: 'Fantasi' },
  { id: '27', name: 'Horor' },
  { id: '10749', name: 'Romantis' },
  { id: '878', name: 'Sci-Fi' },
  { id: '53', name: 'Thriller' },
  { id: '9648', name: 'Misteri' },
];

export const YEARS_LIST = [
  { id: '', name: 'Semua Tahun' },
  { id: '2026', name: '2026' },
  { id: '2025', name: '2025' },
  { id: '2024', name: '2024' },
  { id: '2023', name: '2023' },
  { id: '2022', name: '2022' },
  { id: '2021', name: '2021' },
  { id: '2020', name: '2020' },
];

export const SORT_OPTIONS = [
  { id: 'popularity.desc', name: 'Paling Populer' },
  { id: 'vote_average.desc', name: 'Rating Tertinggi' },
  { id: 'primary_release_date.desc', name: 'Rilis Terbaru' },
];

export default function FilterBar({
  selectedGenre,
  setSelectedGenre,
  selectedYear,
  setSelectedYear,
  selectedSort,
  setSelectedSort,
  totalResults
}) {
  return (
    <div
      style={{
        background: 'rgba(15, 20, 32, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.25rem',
        border: '1px solid var(--border-subtle)',
        marginBottom: '2rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SlidersHorizontal size={18} color="#e50914" />
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
            Filter & Urutkan
          </span>
          {totalResults !== undefined && (
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginLeft: '0.5rem' }}>
              ({totalResults} judul)
            </span>
          )}
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          
          {/* Genre select */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            style={{
              background: '#0d111a',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.45rem 0.85rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {GENRES_LIST.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>

          {/* Year select */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{
              background: '#0d111a',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.45rem 0.85rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {YEARS_LIST.map((y) => (
              <option key={y.id} value={y.id}>
                {y.name}
              </option>
            ))}
          </select>

          {/* Sort By select */}
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            style={{
              background: '#0d111a',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.45rem 0.85rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Reset Filters button */}
          {(selectedGenre || selectedYear || selectedSort !== 'popularity.desc') && (
            <button
              onClick={() => {
                setSelectedGenre('');
                setSelectedYear('');
                setSelectedSort('popularity.desc');
              }}
              className="btn btn-secondary"
              style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem' }}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
