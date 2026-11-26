import { useMemo, useState } from 'react';
import { ArrowUpRight, Car, Fuel, Gauge, Search, Zap } from 'lucide-react';
import { VEHICLE_CATEGORIES, VEHICLES } from '../data/vehicles';
import VehicleModal from './VehicleModal';

export default function VehicleCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Barchasi');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const filteredVehicles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return VEHICLES.filter((car) => {
      const matchesCategory = activeCategory === 'Barchasi' || car.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;

      return (
        car.name.toLowerCase().includes(query) ||
        car.engineCapacity.toLowerCase().includes(query) ||
        car.engineCode.toLowerCase().includes(query) ||
        car.cylinders.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, activeCategory]);

  return (
    <section id="avtomobillar" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Car size={14} />
            Avtomobillar katalogi
          </div>
          <h2 className="section-title">Ommabop modellar va texnik ko‘rsatkichlar</h2>
          <p className="section-subtitle">
            Avtomobil nomi yoki dvigatel turi bo‘yicha qidiring, toifa bo‘yicha saralang va har bir modelning tasdiqlangan texnik xususiyatlari bilan tanishing.
          </p>
        </div>

        <div className="catalog-controls">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nomi yoki dvigatel bo‘yicha qidirish (masalan: Turbo, 1.5, Onix)..."
              aria-label="Avtomobil yoki dvigatel bo‘yicha qidirish"
            />
          </div>

          <div className="filter-pills" role="group" aria-label="Avtomobil toifalari">
            {VEHICLE_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`filter-pill ${activeCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredVehicles.length === 0 ? (
          <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
            <p style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 8 }}>
              Qidiruv bo‘yicha avtomobil topilmadi
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 18 }}>
              Qidiruv so‘zini o‘zgartirib ko‘ring yoki barcha toifalarni tanlang.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('Barchasi');
              }}
            >
              Filterni tozalash
            </button>
          </div>
        ) : (
          <div className="cars-grid">
            {filteredVehicles.map((car) => (
              <article
                key={car.id}
                className="glass-card car-card"
                onClick={() => setSelectedVehicle(car)}
              >
                <div className="car-image-wrap">
                  <img src={car.image} alt={car.name} loading="lazy" />
                  <span className="car-category-badge">{car.category}</span>
                </div>

                <div className="car-body">
                  <h3 className="car-title">{car.name}</h3>

                  <div className="car-specs-mini">
                    <div className="car-spec-item">
                      <span className="car-spec-label">Dvigatel hajmi</span>
                      <span className="car-spec-val">{car.engineCapacity}</span>
                    </div>

                    {car.horsepower && car.horsepower !== 'unavailable' && (
                      <div className="car-spec-item">
                        <span className="car-spec-label">Quvvati</span>
                        <span className="car-spec-val" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <Zap size={13} style={{ color: 'var(--accent-cyan-bright)' }} />
                          {car.horsepower.split(' (')[0]}
                        </span>
                      </div>
                    )}

                    <div className="car-spec-item">
                      <span className="car-spec-label">Yoqilg‘i turi</span>
                      <span className="car-spec-val" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Fuel size={13} style={{ color: 'var(--accent-cyan-bright)' }} />
                        {car.fuelType}
                      </span>
                    </div>

                    <div className="car-spec-item">
                      <span className="car-spec-label">Moment</span>
                      <span className="car-spec-val" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Gauge size={13} style={{ color: 'var(--accent-cyan-bright)' }} />
                        {car.torque.split(' @')[0]}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: 'auto' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVehicle(car);
                    }}
                  >
                    Batafsil
                    <ArrowUpRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedVehicle && (
        <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
      )}
    </section>
  );
}
