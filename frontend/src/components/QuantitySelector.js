import React from "react";
import "./QuantitySelector.css";

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="quantity-selector">
      <button onClick={onDecrease} disabled={quantity <= 0}>-</button>
      <span>{quantity}</span>
      <button onClick={onIncrease}>+</button>
    </div>
  );
};

export default QuantitySelector;
