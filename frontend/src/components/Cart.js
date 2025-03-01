  // import React from "react";
  // import { useNavigate } from "react-router-dom";
  // import "./Cart.css";
  // import QuantitySelector from "./QuantitySelector";

  // const Cart = ({ cart, updateQuantity }) => {
  //   const navigate = useNavigate();

  //   const getTotalPrice = () => {
  //     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  //   };

  //   const deliveryCharge = cart.length > 0 ? 25 : 0;
  //   const handlingCharge = cart.length > 0 ? 4 : 0;
  //   const grandTotal = getTotalPrice() + deliveryCharge + handlingCharge;

  //   return (
  //     <div className="cart-container">
  //       <h2>My Cart</h2>

  //       {cart.length === 0 ? (
  //         <div className="empty-cart">
  //           <p>Your cart is empty 😔</p>
  //           <button onClick={() => navigate("/")}>Continue Shopping</button>
  //         </div>
  //       ) : (
  //         <>
  //           {cart.map((item) => (
  //             <div key={item.id} className="cart-item">
  //               <img src={`/images/${item.name.toLowerCase()}.jpg`} alt={item.name} className="cart-item-img" />
  //               <div className="cart-item-details">
  //                 <h3>{item.name}</h3>
  //                 <p>₹{item.price} x {item.quantity}</p>
  //               </div>
  //               <QuantitySelector
  //                 quantity={item.quantity}
  //                 onIncrease={() => updateQuantity(item, item.quantity + 1)}
  //                 onDecrease={() => updateQuantity(item, item.quantity - 1)}
  //               />
  //             </div>
  //           ))}

  //           <div className="bill-details">
  //             <h3>Bill Details</h3>
  //             <p>Items total: <span>₹{getTotalPrice()}</span></p>
  //             <p>Delivery charge: <span>₹{deliveryCharge}</span></p>
  //             <p>Handling charge: <span>₹{handlingCharge}</span></p>
  //             <h3>Grand total: <span>₹{grandTotal}</span></h3>
  //           </div>

  //           <div className="cart-footer">
  //             <button className="checkout-btn" onClick={() => navigate("/checkout")}>
  //               Proceed to Checkout
  //             </button>
  //           </div>
  //         </>
  //       )}
  //     </div>
  //   );
  // };

  //export default Cart;

  import React from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios"; 
  import "./Cart.css";
  import QuantitySelector from "./QuantitySelector";
  
  const Cart = ({ cart, updateQuantity }) => {
    const navigate = useNavigate();
  
    const getTotalPrice = () => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };
  
    const deliveryCharge = cart.length > 0 ? 25 : 0;
    const handlingCharge = cart.length > 0 ? 4 : 0;
    const grandTotal = getTotalPrice() + deliveryCharge + handlingCharge;
  
    const handleCheckout = async () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
  
      const userEmail = localStorage.getItem("email"); 
      console.log("User email from localStorage:", userEmail); // Debugging
  
      if (!userEmail) {
        alert("Please log in before checkout.");
        return;
      }
  
      const orderData = {
        email: userEmail,
        products: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      };
  
      console.log("Checkout request data:", orderData); // Debugging
  
      try {
        const response = await axios.post("http://localhost:5000/checkout", orderData, {
          headers: { "Content-Type": "application/json" },
        });
  
        console.log("Checkout response:", response.data);
        alert(response.data.message);
        navigate("/"); // Redirect to home after successful checkout
      } catch (error) {
        console.error("Checkout failed:", error.response?.data || error);
        alert(error.response?.data?.message || "Checkout failed. Please try again.");
      }
    };
  
    return (
      <div className="cart-container">
        <h2>My Cart</h2>
  
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty 😔</p>
            <button onClick={() => navigate("/")}>Continue Shopping</button>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={`/images/${item.name.toLowerCase()}.jpg`} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price} x {item.quantity}</p>
                </div>
                <QuantitySelector
                  quantity={item.quantity}
                  onIncrease={() => updateQuantity(item, item.quantity + 1)}
                  onDecrease={() => updateQuantity(item, item.quantity - 1)}
                />
              </div>
            ))}
  
            <div className="bill-details">
              <h3>Bill Details</h3>
              <p>Items total: <span>₹{getTotalPrice()}</span></p>
              <p>Delivery charge: <span>₹{deliveryCharge}</span></p>
              <p>Handling charge: <span>₹{handlingCharge}</span></p>
              <h3>Grand total: <span>₹{grandTotal}</span></h3>
            </div>
  
            <div className="cart-footer">
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default Cart;
  