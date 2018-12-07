const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    console.log('what is products', products)
    res.render('shop/product-list', {
      prods: products,
      docTitle: 'All Products',
      path: '/products',
    });
  })
  .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
  // Product.findAll({where: {id: prodId}})
  // .then(products => {
  //   res.render('shop/product-detail', {
  //     docTitle: products[0].title,
  //     path: '/products',
  //     product: products[0]
  //   })
  // })
  // .catch(err => console.log(err))
  Product.findByPk(prodId)
  .then(product => {
    res.render('shop/product-detail', {
      docTitle: product.title,
      path: '/products',
      product: product
    })
  })
  .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products => {
    console.log('what is products', products)
    res.render('shop/index', {
      prods: products,
      docTitle: 'Shop',
      path: '/',
    });
  })
  .catch(err => console.log(err))
  // Product.fetchAll()
  // .then(([rows, fieldData]) => {
  //   res.render('shop/index', {
  //     prods: rows,
  //     docTitle: 'Shop',
  //     path: '/',
  //   })
  // })
  // .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        docTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts
      });
    });
  })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
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

exports.postDeleteCartProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
}