import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");
  const role = loggedInUser?.role || "customer";
  const [images, setImages] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  function getWhatsappLink(phone, message) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);


  useEffect(() => {
    fetch("http://localhost:5000/api/catalog/root")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/products/all")
      .then(res => res.json())
      .then(data => {
        setProducts(data);

        // shuffle ONCE only
        const shuffled = [...data]
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);

        setFeaturedProducts(shuffled);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/banners")
      .then(res => res.json())
      .then(data => {
        const activeBanners = data.filter(b => b.isActive);
        const bannerImages = activeBanners.map(b => b.image);
        if (bannerImages.length > 0) {
          setImages(bannerImages);
        } else {
          // fallback image (important)
          setImages([
            "https://images.unsplash.com/photo-1521334884684-d80222895322"
          ]);
        }
      });
  }, []);

  return (
    <div className="home-container">

      <div
        className="hero-section"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="hero-overlay" />

        <div className="hero-content">
          <h1>KGN Handloom</h1>

          <p>
            Premium Sarees • Kurtis • Dress Materials
          </p>

          <Link to="/products">
            <button className="shop-btn">
              Explore Now
            </button>
          </Link>
        </div>
      </div>

      <div className="welcome-section">
        <h2>Welcome to KGN Handloom</h2>

        <p>
          Discover beautiful Sarees, Kurtis, Dress Materials and many more
          collections at wholesale and retail prices. We bring quality,
          tradition and the latest fashion together for every customer.
        </p>
      </div>

      <h2 className="section-title">
        Featured Products
      </h2>

      <div className="featured-grid">
        {featuredProducts.map((product) => {
          const phone = product.whatsappNumber || "8969040988";

          return (
            <div className="product-card" key={product._id}>
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="product-image"
              />

              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>

                {(role === "admin" || role === "staff") && (
                  <p className="product-price">₹{product.price}</p>
                )}

                <a
                  href={`https://wa.me/${phone}?text=${encodeURIComponent(
                    `Hi, I'm interested in "${product.name}". Please share details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="whatsapp-btn">
                    Enquire on WhatsApp
                  </button>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {featuredProducts.length > 0 && (
        <div className="view-all-container">
          <Link to="/products">
            <button className="view-all-btn">
              View All Products →
            </button>
          </Link>
        </div>
      )}


      <h2 className="why-title">
        Why Choose KGN Handloom?
      </h2>

      <div className="why-grid">
        <div className="why-card">
          <div className="why-icon">✨</div>
          <h3>Premium Quality</h3>
          <p>Carefully selected fabrics with excellent finishing.</p>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "15px",
            padding: "30px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.12)"
          }}
        >
          <div style={{ fontSize: "45px" }}>👗</div>
          <h3>Latest Collections</h3>
          <p>New arrivals updated regularly to match current fashion.</p>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "15px",
            padding: "30px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.12)"
          }}
        >
          <div style={{ fontSize: "45px" }}>💰</div>
          <h3>Wholesale Prices</h3>
          <p>Affordable pricing for both retail and wholesale buyers.</p>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "15px",
            padding: "30px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.12)"
          }}
        >
          <div style={{ fontSize: "45px" }}>🤝</div>
          <h3>Trusted Service</h3>
          <p>Friendly support and quick responses on WhatsApp.</p>
        </div>
      </div>


    </div>
  );
}

export default Home;
