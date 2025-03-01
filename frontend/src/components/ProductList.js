import React from "react";
import "./ProductList.css";
import QuantitySelector from "./QuantitySelector"; // Import the new component

const ProductList = ({ products, cart, addToCart, updateQuantity }) => {
  return (
    <div className="product-list">
      {products.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id);

        return (
          <div key={product.id} className="product-card">
            

            {cartItem ? (
              <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <QuantitySelector
                  quantity={cartItem.quantity}
                  onIncrease={() => updateQuantity(product, cartItem.quantity + 1)}
                  onDecrease={() => updateQuantity(product, cartItem.quantity - 1)}
                />
              </div>
            ) : (
              <button className="add-to-cart" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;