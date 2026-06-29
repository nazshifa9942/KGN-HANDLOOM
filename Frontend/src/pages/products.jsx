import "../styles/products.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [categories, setCategories] = useState([]);

  const defaultWhatsapp = "7352272714";

  function getWhatsappLink(phone, message) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  useEffect(() => {
    fetch("https://kgn-handloom.onrender.com/api/catalog/root")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Explore Our Collections</h1>
        <p>
          KGN Handloom offers a wide range of sarees, kurtis, and dress materials
          with premium quality and affordable wholesale prices.
        </p>
      </div>

      <div className="category-grid">
        {categories.map((category) => {
          const phone = category.whatsappNumber || defaultWhatsapp;
          return (
            <div key={category._id} className="category-card">

              {/* ✅ CLICKABLE PART (GO TO NEXT PAGE) */}
              <Link
                to={`/catalog/${category._id}`}
                className="category-link"
              >
                <img
                  className="category-image"
                  src={category.image}
                  alt={category.name}
                />

                <div className="category-content">
                  <h3 className="category-name">{category.name}</h3>

                  <p className="category-description">
                    {category.description || "Premium quality collection available at best wholesale price."}
                  </p>
                </div>
              </Link>

              {/* ✅ WHATSAPP BUTTON (SEPARATE) */}
              <a
                href={getWhatsappLink(
                  phone,
                  `Hi, I'm interested in ${category.name}. Please share details.`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="whatsapp-btn">
                  Enquire on WhatsApp
                </button>
              </a>

            </div>
            );
        })}
      </div>
    </div>
  );
}

export default Products;