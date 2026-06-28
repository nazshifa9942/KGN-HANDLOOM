import { Link } from "react-router-dom";
import "../styles/content.css";

function ContentManagement() {
  return (
    <div className="content-page">

      {/* HEADER */}
      <div className="content-header">
        <h1>Manage Website</h1>
        <p>Control what customers see on your website</p>
      </div>

      {/* GRID */}
      <div className="content-grid">

        <Link to="/admin/catalog" className="content-card">
          <div className="card-icon">📦</div>
          <h3>Categories</h3>
          <p>Manage categories and products</p>
        </Link>

        <Link to="/admin/add-product" className="content-card">
          <div className="card-icon">🖼️</div>
          <h3>Add Product</h3>
          <p>Add end Product</p>
        </Link>

        <Link to="/admin/banners" className="content-card">
          <div className="card-icon">🖼️</div>
          <h3>Homepage Images</h3>
          <p>Upload and manage banner images</p>
        </Link>

        <Link to="/admin/offers" className="content-card">
          <div className="card-icon">🎁</div>
          <h3>Offers</h3>
          <p>Manage promotional offers</p>
        </Link>

      </div>

    </div>
  );
}

export default ContentManagement;