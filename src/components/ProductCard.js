import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ShopContext } from '../context/ShopContext';

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);
  const { addToCart, addToWishlist } = useContext(ShopContext);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
      {user && <button onClick={() => addToWishlist(product)}>Add to Wishlist</button>}
      <button>Pay with PayPal</button>
    </div>
  );
};

export default ProductCard;