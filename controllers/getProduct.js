const express = require('express');
const router = express.Router();
const Product = require('../models/productSchema'); // Ensure this path is correct

exports.getProduct = async (req, res) => {
    try {
      console.log("hhdf")
      const products = await Product.find();  // Fetch all products from MongoDB
      res.status(200).json(products);  // Return the products as JSON
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Server Error' });
    }
};
