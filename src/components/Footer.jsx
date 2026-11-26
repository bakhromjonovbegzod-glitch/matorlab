import Logo from './Logo';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <Logo size="sm" />

          <nav className="footer-links" aria-label="Quyi navigatsiya">
            <a href="#bosh-sahifa" onClick={(e) => scrollTo(e, 'bosh-sahifa')}>
              Bosh sahifa
            </a>
            <a href="#avtomobillar" onClick={(e) => scrollTo(e, 'avtomobillar')}>
              Avtomobillar
            </a>
            <a href="#dvigatellar" onClick={(e) => scrollTo(e, 'dvigatellar')}>
              Dvigatellar
            </a>
            <a href="#bilim" onClick={(e) => scrollTo(e, 'bilim')}>
              Bilim
            </a>
            <a href="#yangiliklar" onClick={(e) => scrollTo(e, 'yangiliklar')}>
              Yangiliklar
            </a>
            <a href="#aloqa" onClick={(e) => scrollTo(e, 'aloqa')}>
              Aloqa
            </a>
          </nav>
        </div>

        <div
          style={{
            marginTop: 24,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 12,
            fontSize: '0.84rem',
            color: 'var(--text-muted)',
          }}
        >
          <span>© {CURRENT_YEAR} MOTORLAB. Barcha huquqlar himoyalangan.</span>
          <span>Avtomobil muhandisligi va ta’lim platformasi</span>
        </div>
      </div>
    </footer>
  );
}
