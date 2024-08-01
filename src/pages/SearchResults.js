import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import specialOffersData from '../pages/SpecialOffers';
import menuData from '../components/ViewMenu';
import '../styles.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, user } = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const searchQuery = location.state?.query || '';

  useEffect(() => {
    // Simulated search logic
    const allItems = [...specialOffersData, ...menuData]; // Add popular products and scrolling banner items similarly
    const filteredItems = allItems.filter(item =>
      item.caption.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filteredItems);
  }, [searchQuery]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setMessage('Added to Cart');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleAddToWishlist = (item) => {
    if (user) {
      addToWishlist(item);
      setMessage('Added to Wishlist');
    } else {
      setMessage('You need to be logged in to add items to the wishlist.');
    }
    setTimeout(() => setMessage(''), 2000);
  };

  const handleClear = () => {
    setResults([]);
    navigate('/');
  };

  return (
    <main className="search-results-container">
      <div className="container">
        <h2>Search Results for "{searchQuery}"</h2>
        {results.map((item) => (
          <div key={item.id} className="search-result">
            <img src={item.image} alt={item.caption} />
            <h3>{item.caption}</h3>
            <p>{item.description || 'No description available'}</p>
            <p><strong>{item.price}</strong></p>
            <button className="btn btn-secondary" onClick={() => handleAddToCart(item)}>Order</button>
            <button className="btn btn-info" onClick={() => handleAddToWishlist(item)}>Add to Wishlist</button>
          </div>
        ))}
        {results.length === 0 && <p>No results found.</p>}
        <button className="btn btn-primary" onClick={handleClear}>Clear</button>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </main>
  );
};

export default SearchResults;