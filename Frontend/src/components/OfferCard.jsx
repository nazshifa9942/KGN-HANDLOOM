function OfferCard({ offer }) {
  return (
    <div style={{ 
      border: "1px solid #ddd", 
      padding: "10px",
      borderRadius: "10px"
      }}
    >
      <img
        src={offer.image}
        alt={offer.title}
        style={{
              width: "100%",
              height: "200px",
              objectFit: "cover"
        }}
      />
      
      <div style={{ padding: "10px" }}>
        <h3>{offer.title}</h3>

        <p>{offer.description}</p>
        
        <button 
          style={{
            padding: "8px 12px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
          >
          view Details
        </button>
      </div>
            
    </div>
  );
}

export default OfferCard;