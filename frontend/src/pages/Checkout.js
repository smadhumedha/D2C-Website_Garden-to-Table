import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css"; // Include any additional styling you want

const Checkout = () => {
 const [deliveryAddress, setDeliveryAddress] = useState("");
 const [paymentMode, setPaymentMode] = useState("COD");
 const [upiId, setUpiId] = useState("");
 const [paymentStatus, setPaymentStatus] = useState(null);
 const navigate = useNavigate();

 const handleDeliveryAddressChange = (e) => {
   setDeliveryAddress(e.target.value);
 };

 const handleUpiIdChange = (e) => {
   setUpiId(e.target.value);
 };

 const handlePaymentModeChange = (e) => {
   setPaymentMode(e.target.value);
 };

 const handlePaymentSubmit = (e) => {
   e.preventDefault();
   if (paymentMode === "UPI" && !upiId) {
     alert("Please enter your UPI ID.");
     return;
   }

   // Simulate a payment request (In real application, this would be an API call)
   if (paymentMode === "UPI") {
     setPaymentStatus("Payment request sent to UPI ID: " + upiId);
   } else {
     setPaymentStatus("Order confirmed! Cash on Delivery selected.");
   }
 };

 return (
   <div className="checkout-container">
     <h2>Checkout</h2>
     
     <form onSubmit={handlePaymentSubmit}>
       <div className="form-group">
         <label htmlFor="delivery-address">Delivery Address:</label>
         <textarea
           id="delivery-address"
           value={deliveryAddress}
           onChange={handleDeliveryAddressChange}
           placeholder="Enter your delivery address"
           required
         ></textarea>
       </div>

       <div className="form-group">
         <label htmlFor="payment-mode">Payment Mode:</label>
         <select
           id="payment-mode"
           value={paymentMode}
           onChange={handlePaymentModeChange}
           required
         >
           <option value="COD">Cash on Delivery (COD)</option>
           <option value="UPI">UPI</option>
         </select>
       </div>

       {paymentMode === "UPI" && (
         <div className="form-group">
           <label htmlFor="upi-id">Enter UPI ID:</label>
           <input
             type="text"
             id="upi-id"
             value={upiId}
             onChange={handleUpiIdChange}
             placeholder="Enter UPI ID"
             required
           />
         </div>
       )}

       <button type="submit" className="submit-btn">Confirm Order</button>
     </form>

     {paymentStatus && <div className="payment-status">{paymentStatus}</div>}
   </div>
 );
};

export default Checkout;


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Checkout.css";

// const Checkout = () => {
//   const [deliveryAddress, setDeliveryAddress] = useState("");
//   const [paymentMode, setPaymentMode] = useState("COD");
//   const [upiId, setUpiId] = useState("");
//   const navigate = useNavigate();

//   const handlePaymentSubmit = async (e) => {
//     e.preventDefault();

//     if (paymentMode === "UPI" && !upiId) {
//       alert("Please enter your UPI ID.");
//       return;
//     }

//     const orderData = {
//       email: "user@example.com", // Replace with actual user's email (Fetch from Auth)
//       deliveryAddress,
//       paymentMode,
//       upiId: paymentMode === "UPI" ? upiId : null,
//     };

//     try {
//       const response = await axios.post("http://localhost:5000/api/orders/checkout", orderData);
//       alert(response.data.message);
//       navigate("/order-success"); // Redirect after success
//     } catch (error) {
//       console.error("Order Error:", error.response?.data || error);
//       alert("Order placement failed! Check console for details.");
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <h2>Checkout</h2>
//       <form onSubmit={handlePaymentSubmit}>
//         <div className="form-group">
//           <label htmlFor="delivery-address">Delivery Address:</label>
//           <textarea
//             id="delivery-address"
//             value={deliveryAddress}
//             onChange={(e) => setDeliveryAddress(e.target.value)}
//             placeholder="Enter your delivery address"
//             required
//           ></textarea>
//         </div>

//         <div className="form-group">
//           <label htmlFor="payment-mode">Payment Mode:</label>
//           <select
//             id="payment-mode"
//             value={paymentMode}
//             onChange={(e) => setPaymentMode(e.target.value)}
//             required
//           >
//             <option value="COD">Cash on Delivery (COD)</option>
//             <option value="UPI">UPI</option>
//           </select>
//         </div>

//         {paymentMode === "UPI" && (
//           <div className="form-group">
//             <label htmlFor="upi-id">Enter UPI ID:</label>
//             <input
//               type="text"
//               id="upi-id"
//               value={upiId}
//               onChange={(e) => setUpiId(e.target.value)}
//               placeholder="Enter UPI ID"
//               required
//             />
//           </div>
//         )}

//         <button type="submit" className="submit-btn">Confirm Order</button>
//       </form>
//     </div>
//   );
// };

//export default Checkout;
