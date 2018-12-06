const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      docTitle: 'All Products',
      path: '/products',
    })
  });
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
  // console.log(Product.findById(prodId));
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      docTitle: product.title,
      path: '/products',
      product: product
    })
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      docTitle: 'Shop',
      path: '/',
    })
  });
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    docTitle: 'Your Cart',
    path: '/cart'
  })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  })
  res.redirect('/cart');
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    docTitle: 'Checkout',
    path: '/checkout'
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    docTitle: 'Your Orders',
    path: '/orders'
  })
}