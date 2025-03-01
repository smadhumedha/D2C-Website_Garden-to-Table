//require('dotenv').config();
//const express = require('express');
//const mongoose = require('mongoose');
//const cors = require('cors');
//const bcrypt = require('bcryptjs'); // Import bcrypt
//const app = express();
//
//app.use(express.json());
//app.use(cors());
//
//// MongoDB Connection
//mongoose.connect(process.env.MONGO_URI, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//}).then(() => console.log("MongoDB connected"))
//.catch(err => console.error("MongoDB connection error:", err));
//
//// User Schema
//const UserSchema = new mongoose.Schema({
//    fullName: String,
//    email: String,
//    phone: String,
//    password: String // Hashed password
//});
//
//const User = mongoose.model('User', UserSchema);
//
//// Signup Route (Stores hashed password)
//app.post('/SignUp', async (req, res) => {
//    try {
//        const { fullName, email, phone, password } = req.body;
//
//        // Check if user already exists
//        const existingUser = await User.findOne({ email });
//        if (existingUser) {
//            return res.status(400).json({ message: "User already exists!" });
//        }
//
//        // Hash password before saving
//        const hashedPassword = await bcrypt.hash(password, 10);
//
//        // Save user with hashed password
//        const newUser = new User({ fullName, email, phone, password: hashedPassword });
//        await newUser.save();
//        
//        res.status(201).json({ message: "User registered successfully!" });
//    } catch (error) {
//        res.status(500).json({ error: "Internal Server Error" });
//    }
//});
//
//// Login Route (Validates email and hashed password)
//app.post('/login', async (req, res) => {
//    try {
//        const { email, password } = req.body;
//
//        // Find user by email
//        const user = await User.findOne({ email });
//        if (!user) {
//            return res.status(400).json({ message: "User not found!" });
//        }
//
//        // Compare hashed password
//        const isMatch = await bcrypt.compare(password, user.password);
//        if (!isMatch) {
//            return res.status(400).json({ message: "Invalid credentials!" });
//        }
//
//        res.status(200).json({ message: "Login successful!" });
//    } catch (error) {
//        res.status(500).json({ error: "Internal Server Error" });
//    }
//});
//
//app.listen(5000, () => console.log('Server running on port 5000'));

require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

if (!MONGO_URI || !JWT_SECRET) {
  console.error("❌ Missing required environment variables. Check your .env file.");
  process.exit(1);
}

// ========================
//  MongoDB Connection
// ========================
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// ========================
//  MongoDB Schema Models
// ========================
const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
});

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
const Order = mongoose.model("Order", OrderSchema);

// ========================
//  User Signup API
// ========================
app.post("/signup", async (req, res) => {
  const { fullName, phone, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, phone, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "Signup successful! Please log in." });
  } catch (error) {
    res.status(500).json({ error: "Error signing up", details: error.message });
  }
});

// ========================
//  User Login API
// ========================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful!", token, userId: user._id, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Error logging in", details: error.message });
  }
});

// ========================
//  Checkout API - Save Orders
// ========================
app.post("/checkout", async (req, res) => {
  const { email, products } = req.body;

  try {
    if (!email || !products || products.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found. Please log in again." });
    }

    const totalAmount = products.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = new Order({
      userId: user._id,
      items: products.map((item) => ({
        product: item.name, // Changed `product` field to use `name`
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      status: "pending",
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", details: error.message });
  }
});

// ========================
//  Get All Orders API
// ========================
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders", details: error.message });
  }
});

// ========================
//  Server Start
// ========================
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
