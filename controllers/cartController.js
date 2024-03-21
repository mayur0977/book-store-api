// controllers/cartController.js
const Cart = require('../models/cartModel');
const Book = require('../models/bookModel');

exports.addToCart = async (req, res, next) => {
  const { bookId, quantity } = req.body;
  const userId = req.user.userId; // Assuming you've extracted userId from JWT
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId });
    }

    // Check if book already exists in the cart, if so, update quantity
    const index = cart.items.findIndex((item) => item.book.equals(bookId));
    if (index !== -1) {
      cart.items[index].quantity += quantity || 1;
    } else {
      cart.items.push({ book: bookId, quantity: quantity || 1 });
    }

    await cart.save();

    res.status(200).json({
      status: 'success',
      message: '',
      data: { cart },
    });
  } catch (error) {
    next(error);
  }
};

exports.getCartDetails = async (req, res, next) => {
  const userId = req.user.userId; // Assuming you've extracted userId from JWT
  // {
  //   path: 'items.book',
  //   select: 'title author price' // Specify the fields you want to populate
  // }
  try {
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'items.book',
      select: 'title thumbnail price previewLink',
    });
    if (!cart) {
      return res.status(200).json({
        status: 'success',
        message: '',
        data: [],
      });
    }

    res.status(200).json({
      status: 'success',
      message: '',
      data: cart.items,
    });
  } catch (error) {
    next(error);
  }
};
