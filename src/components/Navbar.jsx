import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import Logo from './Logo';

const NAV_ITEMS = [
  { id: 'bosh-sahifa', label: 'Bosh sahifa' },
  { id: 'avtomobillar', label: 'Avtomobillar' },
  { id: 'dvigatellar', label: 'Dvigatellar' },
  { id: 'bilim', label: 'Bilim' },
  { id: 'yangiliklar', label: 'Yangiliklar' },
  { id: 'aloqa', label: 'Aloqa' },
];

export default function Navbar({ activeSection, theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Logo size="sm" />

        <nav aria-label="Asosiy navigatsiya">
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            onClick={onToggleTheme}
            className="icon-btn"
            aria-label={theme === 'dark' ? 'Yorug‘ rejimga o‘tish' : 'Tungi rejimga o‘tish'}
            title={theme === 'dark' ? 'Yorug‘ rejim' : 'Tungi rejim'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="icon-btn mobile-menu-btn"
            aria-label="Menyuni ochish"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item.id);
            }}
            className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}
