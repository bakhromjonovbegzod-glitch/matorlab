import { useEffect } from 'react';
import { BookCheck, X } from 'lucide-react';

export default function VehicleModal({ vehicle, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!vehicle) return null;

  const specRows = [
    { label: 'Toifa', value: vehicle.category },
    { label: 'Dvigatel hajmi', value: vehicle.engineCapacity },
    { label: 'Dvigatel kodi', value: vehicle.engineCode },
    { label: 'Konfiguratsiya', value: vehicle.cylinders },
    {
      label: 'Ot kuchi',
      value:
        vehicle.horsepowerRpm && vehicle.horsepowerRpm !== 'unavailable'
          ? `${vehicle.horsepower} @ ${vehicle.horsepowerRpm}`
          : vehicle.horsepower,
    },
    { label: 'Aylanish momenti', value: vehicle.torque },
    { label: 'Yoqilg‘i turi', value: vehicle.fuelType },
    { label: 'Transmissiya', value: vehicle.transmission },
    { label: 'Uzatma (Privod)', value: vehicle.drivetrain },
  ].filter((row) => row.value && row.value !== 'unavailable');

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vehicle-modal-title"
      onClick={onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Oynani yopish">
          <X size={20} />
        </button>

        <div style={{ aspectRatio: '16 / 8.5', overflow: 'hidden', borderRadius: '24px 24px 0 0', background: '#050b18' }}>
          <img
            src={vehicle.image}
            alt={vehicle.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div style={{ padding: '28px 28px 32px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
            <h3 id="vehicle-modal-title" style={{ fontSize: '1.65rem', fontWeight: 800 }}>
              {vehicle.name}
            </h3>
            <span className="section-badge" style={{ marginBottom: 0 }}>
              {vehicle.category}
            </span>
          </div>

          <p style={{ color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.65 }}>
            {vehicle.summary}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 12,
              marginBottom: 22,
            }}
          >
            {specRows.map((row) => (
              <div
                key={row.label}
                style={{
                  padding: '13px 16px',
                  borderRadius: 14,
                  background: 'rgba(37, 99, 235, 0.08)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                  {row.label}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{row.value}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 16px',
              borderRadius: 12,
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              fontSize: '0.86rem',
              color: 'var(--text-silver)',
            }}
          >
            <BookCheck size={17} style={{ color: 'var(--accent-cyan-bright)', flexShrink: 0 }} />
            <span>
              <strong>Manba:</strong> {vehicle.source}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
