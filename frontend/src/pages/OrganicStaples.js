import React from "react";
//import { useNavigate } from "react-router-dom";
import QuantitySelector from "../components/QuantitySelector";
import Header from "../components/Header"; // Import Header component
import "./test.css";

const organicStaplesProducts = [
  { id: 14, name: "Rice", price: 10, image: "/images/rice.jpg"},
  { id: 15, name: "Wheat Flour", price: 8, image: "/images/wheat flour.jpg"},
  { id: 16, name: "Toor Dal", price: 6, image: "/images/toor dal.jpg"},
  { id: 17, name: "Masoor Dal", price: 7, image: "/images/masoor dal.jpg" },
  { id: 18, name: "Red Rice", price: 12, image: "/images/red rice.jpg"},
  { id: 19, name: "Peanuts", price: 9, image: "/images/peanuts.jpg"},
  { id: 20, name: "Green Gram Dal", price: 11, image: "/images/green gram dal.jpg"},
  { id: 21, name: "Oats", price: 10, image: "/images/oats.jpg"}
];

const OrganicStaples = ({ cart, addToCart, updateQuantity }) => {
  return (
    <div className="products-container">
      {/* Header with cart count on top */}
      <Header cartCount={cart.length} />
      <h1 className="page-heading">Organic Staples</h1>
      <div className="products-grid">
        {organicStaplesProducts.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.name} className="product-image" />
              <p>Price: ${product.price}</p>
              {quantity > 0 ? (
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => updateQuantity(product.id, quantity + 1)}
                  onDecrease={() => updateQuantity(product.id, quantity - 1)}
                />
              ) : (
                <button onClick={() => addToCart(product)} className="add-to-cart-button">
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrganicStaples;
