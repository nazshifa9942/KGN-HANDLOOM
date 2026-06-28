import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/products";
import Offers from "./pages/offers";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import AddUser from "./pages/AddUser";
import CatalogManagement from "./pages/CatalogManagement";
import CatalogBrowse from "./pages/CatalogBrowse";
import ProtectedRoute from "./components/ProtectedRoute";
import HeroBannerManager from "./components/HeroBannerManager";
import ContentManagement from "./components/ContentManagement";
import SearchResults from "./pages/SearchResults";
import AddOffers from "./pages/AddOffers";


function App() {
  return (
    <div>
      <Navbar />

      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/catalog/:id" element={<CatalogBrowse />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/banners" element={<HeroBannerManager />} />
          <Route path="/admin/content" element={<ContentManagement />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/admin/offers" element={<AddOffers />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "staff"]}
                allowedPermissions={["editor"]}
              >
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "staff"]}
                allowedPermissions={["editor"]}
              >
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/create-user"
            element={
              <ProtectedRoute
                allowedRoles={["admin"]}
              >
                <AddUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/edit-user/:id"
            element={
              <ProtectedRoute
                allowedRoles={["admin"]}
              >
                <AddUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/catalog"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "staff"]}
                allowedPermissions={["editor"]}
              >
                <CatalogManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </ div>
  );
}

export default App;