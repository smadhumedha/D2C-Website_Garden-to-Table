const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Import the Order model

// Place a new order (Checkout)
router.post("/checkout", async (req, res) => {
    try {
        const { userId, items, totalAmount } = req.body;

        // Validate request body
        if (!userId || !items || !totalAmount) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Create a new order
        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            status: "pending", // Default status
        });

        await newOrder.save();

        res.status(201).json({ message: "Order placed successfully!", order: newOrder });
    } catch (error) {
        console.error("Order Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
});

// Get order by ID
router.get("/:orderId", async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving order", error });
    }
});

// Update order status
router.put("/:orderId", async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order updated successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error });
    }
});

// Delete an order
router.delete("/:orderId", async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order", error });
    }
});

module.exports = router;
