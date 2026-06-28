import { useState } from "react";
import "../styles/contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const whatsappMessage = `Name: ${name}%0AMessage: ${message}`;

    window.open(
      `https://wa.me/911234567890?text=${whatsappMessage}`,
      "_blank"
    );
  }

  return (
    <div className="contact-page">

      {/* HEADER */}
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        We are here to help you personally. Connect with us today.
      </p>

      {/* CONTACT PEOPLE */}
      <div className="contact-people">

        {/* HEAD */}
        <div className="contact-head-wrapper">
          <div className="contact-person-card head">

            <div className="person-avatar">IA</div>

            <h3>Md Iftekhar Alam</h3>

            <div className="contact-actions">
              <a href="tel:+919471272714">Call</a>
              <a href="https://wa.me/919471272714" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* OTHER CONTACTS */}
        <div className="contact-others">

          {/* HOSIERY */}
          <div className="contact-person-card">

            <div className="person-avatar">TA</div>

            <p className="contact-label">For Hosiery Contact</p>
            <h3>Tanveer Alam</h3>

            <div className="contact-actions">
              <a href="tel:+919572781490">Call</a>
              <a href="https://wa.me/919572781490" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </div>

          {/* READYMADE */}
          <div className="contact-person-card">

            <div className="person-avatar">AA</div>

            <p className="contact-label">For Ready-made Dress Contact</p>
            <h3>Azad Alam</h3>

            <div className="contact-actions">
              <a href="tel:+918969040988">Call</a>
              <a href="https://wa.me/918969040988" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </div>

          {/* SAREE */}
          <div className="contact-person-card">

            <div className="person-avatar">AA</div>

            <p className="contact-label">For Saree Contact</p>
            <h3>Asif Alam</h3>

            <div className="contact-actions">
              <a href="tel:+917352272714">Call</a>
              <a href="https://wa.me/917352272714" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* STORE INFO */}
      <div className="store-section">

        <h2 className="store-title">Visit Our Store</h2>

        <div className="store-info">

          <div className="store-details">

            <h3 className="store-name">KGN Handloom</h3>

            <p><strong>Address:</strong></p>
            <p>Madarsha Road, Gandhi Chowk</p>
            <p>Sahebganj</p>
            <p>Post: Karnaul</p>
            <p>District: Muzaffarpur</p>
            <p>PIN: 843125</p>
            <p>Bihar, India</p>

            <p><strong>GST:</strong> 10BBYPA8298Q1ZQ</p>
            <p><strong>Mobile:</strong> +91 7352272714</p>
            <p><strong>Email:</strong> kgnhandloom00786@gmail.com</p>

          </div>

          <div className="store-map">
            <iframe
              src="https://maps.app.goo.gl/iVvjZVgCG5YbPURP9?g_st=iwb"
              width="100%"
              height="250"
              className="map-frame"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Contact;