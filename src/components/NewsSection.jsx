import { useState } from 'react';
import { ArrowRight, Calendar, Clock, Newspaper, X } from 'lucide-react';
import { NEWS_ITEMS } from '../data/news';

export default function NewsSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section id="yangiliklar" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Newspaper size={14} />
            Yangiliklar va tahlillar
          </div>
          <h2 className="section-title">Avtomobil texnologiyalaridagi so‘nggi tahlillar</h2>
          <p className="section-subtitle">
            Zamonaviy dvigatellar, uzatmalar qutisi va issiqlik boshqaruvi bo‘yicha qisqa va foydali muhandislik maqolalari.
          </p>
        </div>

        <div className="news-grid">
          {NEWS_ITEMS.map((item) => (
            <article key={item.id} className="glass-card learning-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: 'rgba(37, 99, 235, 0.14)',
                    color: 'var(--accent-cyan-bright)',
                    fontWeight: 600,
                  }}
                >
                  {item.category}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <Clock size={14} />
                  {item.readTime}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.35 }}>{item.title}</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {item.excerpt}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 8 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <Calendar size={14} />
                  {item.date}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(item)}
                  className="btn btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.84rem' }}
                >
                  O‘qish
                  <ArrowRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedArticle && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-modal-title"
          onClick={() => setSelectedArticle(null)}
        >
          <div className="modal-content" style={{ padding: '32px 28px' }} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedArticle(null)}
              aria-label="Maqolani yopish"
            >
              <X size={20} />
            </button>

            <span className="section-badge">{selectedArticle.category}</span>
            <h3 id="news-modal-title" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 10, paddingRight: 36 }}>
              {selectedArticle.title}
            </h3>
            <div style={{ display: 'flex', gap: 16, fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: 22 }}>
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span>{selectedArticle.readTime} o‘qish</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {selectedArticle.content.map((para, idx) => (
                <p key={idx} style={{ fontSize: '0.98rem', color: 'var(--text-silver)', lineHeight: 1.72 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
