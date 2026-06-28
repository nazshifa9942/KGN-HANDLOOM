import "../styles/CatalogBrowse.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CatalogBrowse() {

    const whatsappDefault = "8969040988"; // fallback

    function getWhatsappLink(phone, message) {
        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    }

    const { id } = useParams();
    const [node, setNode] = useState(null);
    const [children, setChildren] = useState([]);
    const [products, setProducts] = useState([]);

    const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");
    const role = loggedInUser?.role || "customer";

    useEffect(() => {
        fetch(`https://kgn-handloom.onrender.com/api/catalog/${id}`)
            .then((res) => res.json())
            .then((data) => setNode(data));

        fetch(`https://kgn-handloom.onrender.com/api/catalog/children/${id}`)
            .then((res) => res.json())
            .then((data) => setChildren(data));

        fetch(`https://kgn-handloom.onrender.com/api/products/catalog/${id}`)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, [id]);

    return (
        <div className="catalog-page">

            {/* HEADER */}
            <div className="catalog-header">
                <h1>{node?.name}</h1>
                <p>
                    {node?.description ||
                        "Explore our carefully selected collection with premium quality, beautiful designs, and trusted craftsmanship."}
                </p>
            </div>

            {/* CHILD CATEGORIES */}
            {children.length > 0 && (
                <>
                    <div className="category-grid">
                        {children.map((child) => (
                            <div key={child._id} className="category-card">

                                <Link
                                    to={`/catalog/${child._id}`}
                                    className="category-link"
                                >
                                    <img
                                        src={child.image}
                                        alt={child.name}
                                        className="category-image"
                                    />

                                    <div className="category-content">
                                        <h3>{child.name}</h3>
                                        <p>{child.description ||
                                            "Premium quality product from our latest collection."}</p>
                                    </div>
                                </Link>

                                {/* ✅ FIXED */}
                                <a
                                    href={getWhatsappLink(
                                        whatsappDefault,
                                        `Hi, I'm interested in "${child.name}" from ${node?.name}. Please share details.`
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button className="whatsapp-btn">
                                        Enquire on WhatsApp
                                    </button>
                                </a>

                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* PRODUCTS */}
            {products.length > 0 && (
                <>
                    <div className="section-header">
                        <h2>Products</h2>
                        <p>Choose your favorite product and enquire instantly on WhatsApp.</p>
                    </div>

                    <div className="product-grid">
                        {products.map((product) => {

                            const phone = product.whatsappNumber || whatsappDefault;

                            return (
                                <div key={product._id} className="product-card">

                                    <img
                                        src={product.images?.[0]}
                                        alt={product.name}
                                        className="product-image"
                                    />

                                    <div className="product-content">
                                        <h3>{product.name}</h3>

                                        <p>
                                            {product.description ||
                                                "Premium quality product from our latest collection."}
                                        </p>

                                        {(role === "admin" || role === "staff") && (
                                            <p className="product-price">
                                                ₹{product.price}
                                            </p>
                                        )}

                                        {/* ✅ FIXED */}
                                        <a
                                            href={getWhatsappLink(
                                                phone,
                                                `Hi, I'm interested in "${product.name}" from ${node?.name}. Please share price and details.`
                                            )}
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
                </>
            )}

        </div>
    );
}

export default CatalogBrowse;