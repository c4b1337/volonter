import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/main.css";

const AdsPage = ({ ads }) => {
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">
        <i className="fas fa-bullhorn text-primary me-2"></i>
        Оголошення волонтерів
      </h2>
      <div className="row g-4">
        {(!ads || ads.length === 0) && (
          <div className="col-12 text-center text-muted">Оголошень поки немає.</div>
        )}
        {ads && ads.map((ad) => (
          <div className="col-md-6 col-lg-4" key={ad.id}>
            <div className="card h-100 shadow-sm">
              {ad.photo ? (
                <img
                  src={typeof ad.photo === "string" ? ad.photo : URL.createObjectURL(ad.photo)}
                  className="card-img-top"
                  alt="Фото оголошення"
                />
              ) : (
                <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: 180 }}>
                  <i className="fas fa-image fa-3x text-secondary"></i>
                </div>
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-2">{ad.purpose}</h5>
                <div className="mb-2">
                  {ad.author && (
                    <span className="badge bg-primary">
                      <i className="fas fa-user me-1"></i>{ad.author}
                    </span>
                  )}
                  <span className="badge bg-light text-muted ms-2">
                    <i className="far fa-calendar-alt me-1"></i>{ad.date}
                  </span>
                </div>
                <a
                  href={ad.monobank}
                  className="btn btn-outline-primary btn-sm mb-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-university me-1"></i>Підтримати через Monobank
                </a>
                <div className="mb-2">
                  {ad.socials && ad.socials.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      className="btn btn-outline-secondary btn-sm me-2 mb-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-share-alt"></i> Соцмережа
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdsPage;