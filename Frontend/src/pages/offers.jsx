import "../styles/offers.css";
import { useEffect, useState } from "react";

function Offers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function fetchOffers() {
      const res = await fetch("http://localhost:5000/api/offers");
      const data = await res.json();
      setOffers(data);
    }

    fetchOffers();
  }, []);

  return (
    <div className="offers-page">
      <h1 className="offers-title">Offers</h1>

      <p className="offers-subtitle">
        Discover our latest deals and exclusive offers crafted specially for you.
      </p>

      <div className="offers-container">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="offer-card"
            style={{
              backgroundImage: `url(${offer.image.replace(
                "/upload/",
                "/upload/c_fill,w_1200,h_500/"
              )})`
            }}
          >
            <div className="overlay"></div>

            <div className="offer-content">
              <h2>{offer.title}</h2>
              <p>{offer.description}</p>

              <button
                className="offer-btn"
                onClick={() => {
                  const message = `Hi, I'm interested in the "${offer.title}" offer.`;
                  const phone = "919876543210"; // replace with your number
                  window.open(
                    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
                    "_blank"
                  );
                }}
              >
                Enquire on WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;