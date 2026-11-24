// Placeholder version. Keep your own Lab 3 ProductCard if you already have one.
// It only needs to accept a `product` prop and an `onAddToCart` prop.
function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <p className="category">{product.category}</p>
      <p className="price">₱{product.price.toFixed(2)}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
