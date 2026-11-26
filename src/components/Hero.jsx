import { ArrowRight, BookOpen, Car, Cpu, Layers } from 'lucide-react';
import { VEHICLES } from '../data/vehicles';
import { LEARNING_TOPICS } from '../data/learning';

export default function Hero() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="bosh-sahifa" className="hero">
      <div className="engineering-grid-bg" aria-hidden="true" />

      <div className="container hero-grid">
        <div>
          <div className="section-badge">
            <Cpu size={14} />
            MOTORLAB Muhandislik Platformasi
          </div>

          <h1 className="hero-title">
            Avtomobillar olamiga <span>xush kelibsiz!</span>
          </h1>

          <p className="hero-subtitle">
            Avtomobillar, dvigatellar va texnologiyalar haqida kerakli ma’lumotlarni bir joyda o‘rganing.
          </p>

          <div className="hero-cta">
            <button type="button" className="btn btn-primary" onClick={() => scrollToSection('avtomobillar')}>
              Boshlash
              <ArrowRight size={18} />
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => scrollToSection('bilim')}>
              <BookOpen size={18} />
              Ma’lumot olish
            </button>
          </div>

          <div className="hero-stats">
            <div className="glass-card stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, color: 'var(--accent-cyan-bright)' }}>
                <Car size={18} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>KATALOG</span>
              </div>
              <div className="stat-value">{VEHICLES.length} ta</div>
              <div className="stat-label">Ommabop avtomobil modeli</div>
            </div>

            <div className="glass-card stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, color: 'var(--accent-cyan-bright)' }}>
                <Cpu size={18} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>3D LAB</span>
              </div>
              <div className="stat-value">4 xil</div>
              <div className="stat-label">Dvigatel va turbo tizim</div>
            </div>

            <div className="glass-card stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, color: 'var(--accent-cyan-bright)' }}>
                <Layers size={18} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>BILIM</span>
              </div>
              <div className="stat-value">{LEARNING_TOPICS.length} ta</div>
              <div className="stat-label">O‘zbek tilida o‘quv bo‘limi</div>
            </div>
          </div>
        </div>

        <div className="hero-visual-wrap">
          <div className="hero-visual-frame">
            <img
              src="/images/hero-car.jpg"
              alt="MOTORLAB zamonaviy sport avtomobili 3D vizual ko‘rinishi"
              loading="eager"
            />
            <div className="hero-hud-bar">
              <span>AERODINAMIK KONSEPT • STUDIO RENDER</span>
              <span style={{ color: '#22d3ee', fontWeight: 700 }}>DRIVE • LEARN • EXPLORE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
