import { useState } from 'react';
import { CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topic: 'Avtomobil texnik ma’lumotlari',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      return;
    }
    setSubmitted(true);
    setFormState({
      name: '',
      email: '',
      topic: 'Avtomobil texnik ma’lumotlari',
      message: '',
    });
  };

  return (
    <section id="aloqa" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Mail size={14} />
            Aloqa
          </div>
          <h2 className="section-title">Savol yoki takliflaringiz bormi?</h2>
          <p className="section-subtitle">
            Platforma bo‘yicha fikr-mulohazalaringiz yoki qo‘shilishini istagan avtomobil modellari haqida bizga yozing.
          </p>
        </div>

        <div className="contact-grid">
          <div className="glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8 }}>MOTORLAB Muhandislik Markazi</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.65 }}>
                Biz avtomobil ixlosmandlari va yangi boshlovchilar uchun ishonchli, tushunarli va o‘zbek tilidagi texnik bilimlarni bir joyga jamlaymiz.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="learning-icon" style={{ width: 42, height: 42 }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Elektron pochta</div>
                  <div style={{ fontWeight: 600 }}>info@motorlab.uz</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="learning-icon" style={{ width: 42, height: 42 }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Bog‘lanish</div>
                  <div style={{ fontWeight: 600 }}>+998 71 200 00 00</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="learning-icon" style={{ width: 42, height: 42 }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Manzil</div>
                  <div style={{ fontWeight: 600 }}>Toshkent shahri, O‘zbekiston</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 28 }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                <CheckCircle2 size={48} style={{ color: 'var(--accent-cyan-bright)', margin: '0 auto 14px' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8 }}>Xabaringiz qabul qilindi!</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
                  Murojaatingiz uchun rahmat. Taklif va savollaringiz albatta ko‘rib chiqiladi.
                </p>
                <button type="button" className="btn btn-secondary" onClick={() => setSubmitted(false)}>
                  Yana xabar yuborish
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Ismingiz
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    className="form-control"
                    placeholder="Masalan: Azizbek"
                    value={formState.name}
                    onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Elektron pochta
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    className="form-control"
                    placeholder="azizbek@example.uz"
                    value={formState.email}
                    onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-topic" className="form-label">
                    Mavzu
                  </label>
                  <select
                    id="contact-topic"
                    className="form-control"
                    value={formState.topic}
                    onChange={(e) => setFormState((prev) => ({ ...prev, topic: e.target.value }))}
                  >
                    <option value="Avtomobil texnik ma’lumotlari">Avtomobil texnik ma’lumotlari</option>
                    <option value="3D Dvigatel bo‘limi">3D Dvigatel bo‘limi</option>
                    <option value="O‘quv qo‘llanmalar">O‘quv qo‘llanmalar</option>
                    <option value="Hamkorlik va takliflar">Hamkorlik va takliflar</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Xabar matni
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    className="form-control"
                    placeholder="Savolingiz yoki taklifingizni yozing..."
                    value={formState.message}
                    onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Yuborish
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
