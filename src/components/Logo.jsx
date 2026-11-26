export default function Logo({ showTagline = true, size = 'md' }) {
  const iconSize = size === 'sm' ? 36 : 44;

  return (
    <a href="#bosh-sahifa" className="logo-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="motorlabGearGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <path
          d="M32 7L35.8 11.4L41.4 9.8L42.8 15.4L48.5 16.6L47.1 22.2L51.9 25.8L48.1 30.2L50.8 35.4L45.5 37.8L45.6 43.6L39.9 43.5L37.6 48.8L32.3 46.2L27.9 49.9L24.4 45.1L18.8 46.5L17.6 40.8L12 39.4L13.6 33.8L9.2 30.1L13 25.7L10.4 20.5L15.7 18.1L15.6 12.3L21.3 12.4L23.6 7.1L28.9 9.7L32 7Z"
          fill="rgba(11, 22, 44, 0.9)"
          stroke="url(#motorlabGearGrad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="31" cy="29" r="14.5" stroke="#38BDF8" strokeOpacity="0.45" strokeWidth="1.4" strokeDasharray="3 3" />
        <path
          d="M21.5 37V21.5H26L31 30.4L36 21.5H40.5V37H36.6V27.9L32 35.8H30L25.4 27.9V37H21.5Z"
          fill="#F8FAFC"
        />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span style={{ fontSize: size === 'sm' ? '1.15rem' : '1.35rem', fontWeight: 800, letterSpacing: '0.03em' }}>
          <span style={{ color: 'var(--text-primary)' }}>MOTOR</span>
          <span style={{ color: '#2563EB' }}>LAB</span>
        </span>
        {showTagline && (
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--text-secondary)',
              marginTop: 2,
            }}
          >
            Drive. Learn. Explore.
          </span>
        )}
      </div>
    </a>
  );
}
