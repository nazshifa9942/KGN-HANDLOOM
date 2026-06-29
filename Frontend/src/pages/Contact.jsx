import "../styles/contact.css";

function Contact() {
  
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
            <p><strong>Mobile:</strong> +91 9471272714</p>
            <p><strong>Email:</strong> kgnhandloom00786@gmail.com</p>

          </div>

          <div className="store-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.935780655789!2d84.92747159999999!3d26.2961818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3992d58335a05ddf%3A0x52af18038cbb3b30!2sKGN%20HANDLOOM%2CGULAB%20MARKET%2CMADARSHA%20ROAD%2CGANDHI%20CHOWK%2CSAHEBGANJ!5e0!3m2!1sen!2sin!4v1782722509169!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="map-frame"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Contact;