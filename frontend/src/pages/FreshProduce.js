import React from "react";
//import { useNavigate } from "react-router-dom";
import QuantitySelector from "../components/QuantitySelector";
import Header from "../components/Header"; // Import Header component
import "./test.css";

const freshProduceProducts = [
  { id: 1, name: "Apple", price: 2, image: "/images/apple.jpg"},
  { id: 2, name: "Banana", price: 1, image: "/images/banana.jpg"},
  { id: 3, name: "Carrot", price: 3, image: "/images/carrot.jpg"},
  { id: 4, name: "Orange", price: 2, image: "/images/orange.jpg"},
  { id: 5, name: "Tomato", price: 4, image: "/images/tomato.jpg"},
  { id: 6, name: "Onion", price: 5, image: "/images/onion.jpg"},
  { id: 7, name: "Potato", price: 6, image: "/images/potato.jpg"},
  { id: 8, name: "Cucumber", price: 3, image: "/images/cucumber.jpg"}
];

const FreshProduce = ({ cart, addToCart, updateQuantity }) => {
  return (
    <div className="products-container">
      {/* Header with cart count on top */}
      <Header cartCount={cart.length} />
      <h1 style={{ fontSize: "2.5rem", fontFamily: "'Delicious Handrawn', cursive", textAlign: "center" }}>
        Fresh Produce
      </h1>
      <div className="products-grid">
        {freshProduceProducts.map((product) => {
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

export default FreshProduce;