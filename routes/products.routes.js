// post.routes.js

const express = require('express');
const router = express.Router();
const Product = require('../model/product.model')
const ProductController = require('../controllers/products.controller');

router.get('/products', Product);
router.get('/products/random', ProductController.getRandom);
router.get('/products/:id', ProductController.getById);
router.post('/products', ProductController.postNew);
router.put('/products/:id', ProductController.change);
router.delete('/products/:id', ProductController.delete);

module.exports = router;
