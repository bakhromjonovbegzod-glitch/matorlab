import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Cog, Droplets, Flame, Gauge, Thermometer, Wind } from 'lucide-react';
import { LEARNING_TOPICS } from '../data/learning';

const ICON_MAP = {
  Flame,
  Wind,
  Cog,
  Gauge,
  Droplets,
  Thermometer,
};

export default function LearningSection() {
  const [expandedId, setExpandedId] = useState(LEARNING_TOPICS[0].id);

  const toggleTopic = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="bilim" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <BookOpen size={14} />
            Bilim markazi
          </div>
          <h2 className="section-title">Avtomobil texnologiyalarini oddiy tilda o‘rganing</h2>
          <p className="section-subtitle">
            Yangi boshlovchilar uchun ham tushunarli bo‘lgan 6 ta asosiy muhandislik mavzusi — bosqichma-bosqich tushuntirishlar bilan.
          </p>
        </div>

        <div className="learning-grid">
          {LEARNING_TOPICS.map((topic) => {
            const IconComponent = ICON_MAP[topic.icon] || BookOpen;
            const isExpanded = expandedId === topic.id;

            return (
              <article key={topic.id} className="glass-card learning-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="learning-icon">
                    <IconComponent size={22} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: 'rgba(37, 99, 235, 0.14)',
                      color: 'var(--accent-cyan-bright)',
                    }}
                  >
                    {topic.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{topic.title}</h3>
                <p style={{ fontSize: '0.93rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {topic.shortDesc}
                </p>

                {isExpanded && (
                  <div
                    style={{
                      marginTop: 6,
                      paddingTop: 14,
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    {topic.steps.map((step, index) => (
                      <p key={index} style={{ fontSize: '0.88rem', color: 'var(--text-silver)', lineHeight: 1.55 }}>
                        {step}
                      </p>
                    ))}
                    <div
                      style={{
                        marginTop: 6,
                        padding: '10px 12px',
                        borderRadius: 10,
                        background: 'rgba(6, 182, 212, 0.1)',
                        border: '1px solid rgba(56, 189, 248, 0.24)',
                        fontSize: '0.84rem',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <strong>Xulosa:</strong> {topic.takeaway}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className="btn btn-secondary"
                  style={{ width: '100%', marginTop: 'auto', padding: '10px 16px', fontSize: '0.88rem' }}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? 'Yopish' : 'Batafsil o‘qish'}
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
