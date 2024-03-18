// controllers/orderController.js
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

exports.createOrder = async (req, res, next) => {
  const userId = req.user.userId; // Assuming you've extracted userId from JWT

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.book');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const orderItems = cart.items.map((item) => ({
      book: item.book._id,
      quantity: item.quantity,
    }));

    const totalPrice = cart.items.reduce((total, item) => {
      return total + item.book.price * item.quantity;
    }, 0);

    const order = new Order({
      user: userId,
      items: orderItems,
      totalPrice,
    });

    await order.save();

    // Clear the cart after placing the order
    await Cart.findOneAndDelete({ user: userId });

    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.getOrderDetails = async (req, res, next) => {
  const userId = req.user.userId; // Assuming you've extracted userId from JWT

  try {
    const order = await Order.find({ user: userId }).populate('items.book');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};
