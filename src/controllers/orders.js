const { response, request } = require('express');
const Order = require('../models/orders')
const User = require('../models/users')


const getOrders = async (req = request, res = response) => {
    try {
        const userId = req.params.userId;

        const orders = await Order.find({ user: userId }).populate("user");

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" })
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error" });
    }
}



const registerOrders = async (req = request, res = response) => {
    try {
        const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
            req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //create an array of product objects from the cart Items
        const products = cartItems.map((item) => ({
            name: item?.title,
            quantity: item.quantity,
            price: item.price,
            image: item?.image,
        }));

        //create a new Order
        const order = new Order({
            user: userId,
            products: products,
            totalPrice: totalPrice,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
        });

        await order.save();

        res.status(200).json({ message: "Order created successfully!" });
    } catch (error) {
        console.log("error creating orders", error);
        res.status(500).json({ message: "Error creating orders" });
    }


}

module.exports = {
    getOrders,
    registerOrders
}