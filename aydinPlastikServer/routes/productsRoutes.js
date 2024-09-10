const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControlles'); 

router.post('/addProduct', productControllers.postAddProduct);
router.get('/products', productControllers.getProducts);
router.post('/deleteProduct',productControllers.postDeleteProduct);
router.post('/updateProduct', productControllers.updateProduct);
router.get('/products/:productId', productControllers.getProductById);
module.exports = router;
