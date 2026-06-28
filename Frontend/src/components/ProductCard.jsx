import { Link } from "react-router-dom";

function ProductCard({ product, onDelete, onEdit }) {
  return (
    <div>
      <Link to={`/products/${product.id}`}>
      <img 
         src={product.image}
         alt={product.name}
         width="150"
      />

      <h3>{product.name}</h3>
      </Link>
      <p>Price: {product.price}</p>
      <p>Stock: {product.stock}</p>

      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>

      <hr />
    </div>
  );
}

export default ProductCard;