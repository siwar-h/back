const express=require('express');
const {getProduct} = require('../controllers/getProduct');  


const router = express.Router();
// app.use('/api', productsRoute); // Use the products route under /api

// router.post('/add', addProduct);
// router.put('/edit/:_id', updateProduct);
// router.delete('/delete/:_id', deleteProduct);
// router.get('/all', getAllProducts);
// router.get('/:_id', getProductById);
router.get('/products', getProduct);
// router.post('/products', postProducts);


module.exports=router;
