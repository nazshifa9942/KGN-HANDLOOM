import "../styles/Footer.css";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import logo from "../assets/logo.jpg";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* ================= COLUMN 1 ================= */}
        <div className="footer-col brand">

          <img src={logo} alt="KGN Handloom" className="footer-logo" />

          <h2>KGN Handloom</h2>

          <p className="tagline">
            Wholesale Fashion with Quality & Trust
          </p>

          <div className="footer-item">
            <FaMapMarkerAlt />
            <div>
              Madarsha Road, Gandhi Chowk<br />
              Sahebganj<br />
              Post: Karnaul<br />
              District: Muzaffarpur<br />
              PIN: 843125<br />
              Bihar, India<br />
              GST: 10BBYPA8298Q1ZQ
            </div>
          </div>

          <div className="footer-item">
            <FaPhoneAlt />
            <span>+91 9471272714</span>
          </div>

          <div className="footer-item">
            <FaEnvelope />
            <span>kgnhandloom00786@gmail.com</span>
          </div>

        </div>

        {/* ================= COLUMN 2 ================= */}
        <div className="footer-col">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/offers">Offers</Link>
          <Link to="/contact">Contact</Link>

        </div>

        {/* ================= COLUMN 3 ================= */}
        <div className="footer-col">

          <h3>Follow Us</h3>

          <a href="https://www.instagram.com/kgnhandloomsahebganj?igsh=MXA2bjl2cXU3NjdvYw%3D%3D&utm_source=qr" target="_blank">
            <FaInstagram /> Instagram
          </a>

          <a href="#" target="_blank">
            <FaFacebook /> Facebook
          </a>

          <a href="https://maps.app.goo.gl/iVvjZVgCG5YbPURP9?g_st=iwb" target="_blank">
            <SiGooglemaps /> Google Maps
          </a>

        </div>

        {/* ================= COLUMN 4 ================= */}
        <div className="footer-col">

          <h3>Contact Us</h3>

          <div className="footer-item">
            <FaPhoneAlt />
            <span>Customer Care: +91 9471272714</span>
          </div>

          <div className="footer-item">
            <FaPhoneAlt />
            <span>WhatsApp: +91 9471272714</span>
          </div>

          <div className="footer-item">
            <FaEnvelope />
            <span>kgnhandloom00786@gmail.com</span>
          </div>

        </div>

      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="footer-bottom">
        © 2026 KGN Handloom • Wholesale Fashion with Quality & Trust
      </div>

    </footer>
  );
}

export default Footer;