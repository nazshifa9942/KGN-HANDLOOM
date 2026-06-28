import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Fuse from "fuse.js";

function SearchResults() {
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);

  const location = useLocation();

  // get query from URL
  const query = new URLSearchParams(location.search).get("q");

  // fetch all products once
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://kgn-handloom.onrender.com/api/products/all");
      const data = await res.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  // run search
  useEffect(() => {
    if (!query || products.length === 0) return;

    const fuse = new Fuse(products, {
      keys: ["name"],
      threshold: 0.4,
    });

    const result = fuse.search(query);
    setResults(result.map((r) => r.item));
  }, [query, products]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Results for "{query}"</h2>

      {results.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}>
          {results.map((product) => (
            <div key={product._id} style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "10px"
            }}>
              <img
                src={product.images?.[0]}
                alt={product.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />

              <h4>{product.name}</h4>
              <p>₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;