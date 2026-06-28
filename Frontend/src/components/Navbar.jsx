import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Fuse from "fuse.js";
import logo from "../assets/logo.jpg";
import { FiSearch } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const role = loggedInUser?.role;

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const searchRef = useRef();

  // ✅ FETCH ALL PRODUCTS ONCE
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:5000/api/products/all");
        const data = await res.json();
        setAllProducts(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProducts();
  }, []);

  // ✅ FUSE SEARCH (TYPO TOLERANT)
  useEffect(() => {
    if (search.trim() === "") {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const fuse = new Fuse(allProducts, {
        keys: ["name"],
        threshold: 0.4,
      });

      const results = fuse.search(search);
      setSearchResults(results.map((r) => r.item));
    }, 300);

    return () => clearTimeout(timer);
  }, [search, allProducts]);

  // ✅ CLOSE DROPDOWN OUTSIDE CLICK
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar">

      {/* LOGO */}
      <div className="logo-section">
        <img src={logo} alt="KGN Handloom" className="logo" />
        <h2 className="brand-name">KGN Handloom</h2>
      </div>

      {/* SEARCH */}
      <div className="navbar-search" ref={searchRef}>
        
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && search.trim() !== "") {
                navigate(`/search?q=${search}`);
                setSearchResults([]);
              }
            }}
          />

          <span
            className="search-icon"
            onClick={() => {
              if (search.trim() !== "") {
                navigate(`/search?q=${search}`);
                setSearchResults([]);
              }
            }}
          >
            <FiSearch />
          </span>

          {/* DROPDOWN */}
          {searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((product) => (
                <NavLink
                  key={product._id}
                  to={`/products/catalog/${product.catalogNodeId}`}
                  className="search-item"
                  onClick={() => {
                    setSearch("");
                    setSearchResults([]);
                  }}
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                  />
                  <span>{product.name}</span>
                </NavLink>
              ))}
            </div>
          )}

        
      </div>

      {/* NAV LINKS */}
      <div className="nav-links">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/offers"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Offers
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Contact
        </NavLink>

        {(role === "admin" || loggedInUser?.permission === "editor") && (
          <NavLink
            to="/admin/content"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Content Management
          </NavLink>
        )}

        {role === "admin" && (
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Admin Dashboard
          </NavLink>
        )}

        <NavLink to="/login" className="login-btn">
          Login
        </NavLink>

      </div>

    </div>
  );
}

export default Navbar;
