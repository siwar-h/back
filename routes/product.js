// backend/routes/products.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../models/productSchema'); 

// Create the uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to the file name
  }
});

// Initialize Multer middleware
const upload = multer({ storage: storage });

// POST route to add product with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log("hello");
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }
    // console.log("hhhhhh" + req.body)
    const { name, description, price, category } = req.body;
    const image = `/uploads/${req.file.filename}`; // Image URL for MongoDB

    const newProduct = new Product({ name, description, price, category, image });
    console.log(newProduct)
    await newProduct.save();
    
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.log('Error uploading product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
