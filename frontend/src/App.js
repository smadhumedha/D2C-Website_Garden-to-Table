import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import "./components/Header.css";
import Footer from "./components/Footer";
import "./components/Footer.css";
import Categories from "./components/Categories";
import "./components/Categories.css";
import Cart from "./components/Cart";
import "./components/Cart.css";
import Products from "./components/Products";
import "./components/Products.module.css";
import Login from "./components/Login";
import "./components/LoginSignup.css";
import SignUp from "./components/SignUp";
import "./components/SignUp.css";
import FreshProduce from "./pages/FreshProduce";
import DairyEggs from "./pages/DairyEggs";
import OrganicStaples from "./pages/OrganicStaples";
import Checkout from "./pages/Checkout";
import "./App.css";

const App = () => {
  const [cart, setCart] = useState([]);

  // ✅ Add to Cart Function
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // ✅ Update Quantity Function (Works for Both Cart & Product Pages)
  const updateQuantity = (product, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: Math.max(newQuantity, 1) } : item
      )
    );
  };


  return (
    <Router>
      <AppContent cart={cart} addToCart={addToCart} updateQuantity={updateQuantity} />
    </Router>
  );
};

const AppContent = ({ cart, addToCart, updateQuantity }) => {
  const location = useLocation();
  const excludeLayoutPaths = ["/fresh-produce", "/dairy-eggs", "/organic-staples"];

  return (
    <>
      {!excludeLayoutPaths.includes(location.pathname) && <Header cartCount={cart.length} />}

      <Routes>
        <Route path="/" element={<Products addToCart={addToCart} />} />
        <Route path="/fresh-produce" element={<FreshProduce cart={cart} addToCart={addToCart} updateQuantity={updateQuantity} />} />
        <Route path="/dairy-eggs" element={<DairyEggs cart={cart} addToCart={addToCart} updateQuantity={updateQuantity} />} />
        <Route path="/organic-staples" element={<OrganicStaples cart={cart} addToCart={addToCart} updateQuantity={updateQuantity} />} />
        <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      {!excludeLayoutPaths.includes(location.pathname) && <Categories />}
      {!excludeLayoutPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

export default App;
