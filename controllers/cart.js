// backend/routes/cart.js
const express = require('express');
const router = express.Router();

// Sample cart data (in-memory or connected to database)
let userCarts = {};  // In-memory storage, you should replace this with a DB model later

// Add item to the user's cart
router.post('/add', (req, res) => {
  const { userId, product } = req.body;

  if (!userCarts[userId]) {
    userCarts[userId] = [];
  }
  
  userCarts[userId].push(product);
  res.status(200).json({ message: 'Product added to cart' });
});

// Get user's cart by user ID
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  if (!userCarts[userId]) {
    return res.status(404).json({ message: 'No cart found for this user' });
  }

  res.json(userCarts[userId]);
});

// Delete item from user's cart
router.delete('/remove', (req, res) => {
  const { userId, productId } = req.body;

  if (!userCarts[userId]) {
    return res.status(404).json({ message: 'No cart found for this user' });
  }

  userCarts[userId] = userCarts[userId].filter(item => item.id !== productId);
  res.status(200).json({ message: 'Product removed from cart' });
});

module.exports = router;
