import React from "react";
import QuantitySelector from "../components/QuantitySelector";
import Header from "../components/Header"; // Import Header component
import "./test.css";

const dairyEggsProducts = [
  { id: 9, name: "Milk", price: 5, image: "/images/milk.jpg" },
  { id: 10, name: "Eggs", price: 3, image: "/images/eggs.jpg" },
  { id: 11, name: "Cheese", price: 7, image: "/images/cheese.jpg" },
  { id: 12, name: "Butter", price: 4, image: "/images/butter.jpg" },
  { id: 13, name: "Yogurt", price: 6, image: "/images/yogurt.jpg" }
];

const DairyEggs = ({ cart, addToCart, updateQuantity }) => {
  return (
    <div className="products-container">
      {/* Header with cart count on top */}
      <Header cartCount={cart.length} />
      <h1
        style={{
          fontSize: "2.5rem",
          fontFamily: "'Delicious Handrawn', cursive",
          textAlign: "left"
        }}
      >
        Dairy & Eggs
      </h1>
      <div className="products-grid">
        {dairyEggsProducts.map((product) => {
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
                <button
                  onClick={() => addToCart(product)}
                  className="add-to-cart-button"
                >
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

export default DairyEggs;
