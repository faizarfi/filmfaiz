import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('FaizFilm Error Boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            background: '#07090e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              textAlign: 'center',
              animation: 'slideUp 0.4s ease forwards',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(244, 63, 94, 0.15)',
                border: '2px solid rgba(244, 63, 94, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
              }}
            >
              <AlertTriangle size={36} color="#f43f5e" />
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.8rem',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '0.75rem',
              }}
            >
              Oops! Terjadi Kesalahan
            </h2>

            <p
              style={{
                color: 'var(--text-muted, #94a3b8)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                marginBottom: '2rem',
              }}
            >
              Sepertinya ada yang salah saat memuat halaman ini. Jangan khawatir, coba muat ulang halaman atau kembali ke beranda.
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center' }}>
              <button
                onClick={this.handleReload}
                className="btn btn-primary"
                style={{ fontSize: '0.95rem', padding: '0.75rem 1.5rem' }}
              >
                <RefreshCw size={18} />
                <span>Muat Ulang</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="btn btn-secondary"
                style={{ fontSize: '0.95rem', padding: '0.75rem 1.5rem' }}
              >
                <Home size={18} />
                <span>Ke Beranda</span>
              </button>
            </div>

            {this.state.error && (
              <details
                style={{
                  marginTop: '2rem',
                  textAlign: 'left',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  padding: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    color: 'var(--text-dim, #64748b)',
                    fontWeight: 600,
                  }}
                >
                  Detail Teknis (untuk developer)
                </summary>
                <pre
                  style={{
                    marginTop: '0.75rem',
                    fontSize: '0.72rem',
                    color: '#f87171',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                  }}
                >
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
