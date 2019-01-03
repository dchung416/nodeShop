const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
  .then(products => {
    console.log(products)
    res.render('shop/product-list', {
      prods: products,
      docTitle: 'All Products',
      path: '/products'
    })
  })
  .catch(err => console.log(err))
  // Product.fetchAll()
  // .then(products => {
  //   res.render('shop/product-list', {
  //     prods: products,
  //     docTitle: 'All Products',
  //     path: '/products',
  //   });
  // })
  // .catch(err => console.log(err));

  // Product.findAll()
  // .then(products => {
  //   console.log('what is products', products)
  //   res.render('shop/product-list', {
  //     prods: products,
  //     docTitle: 'All Products',
  //     path: '/products',
  //   });
  // })
  // .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
  Product.findById(prodId)
  .then(product => {
    res.render('shop/product-detail', {
      docTitle: product.title,
      path: '/products',
      product: product
    })
  })
  .catch(err => console.log(err))
  // Product.findById(prodId)
  // .then(product => {
  //   console.log('controller product', product)
  //   res.render('shop/product-detail', {
  //     docTitle: product.title,
  //     path: '/products',
  //     product: product
  //   })
  // })
  // .catch(err => console.log(err));

  // Product.findByPk(prodId)
  // .then(product => {
  //   res.render('shop/product-detail', {
  //     docTitle: product.title,
  //     path: '/products',
  //     product: product
  //   })
  // })
  // .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
  Product.find()
  .then(products => {
    console.log(products)
    res.render('shop/index', {
      prods: products,
      docTitle: 'Shop',
      path: '/'
    })
  })
  .catch(err => console.log(err))
  // Product.fetchAll()
  // .then(products => {
  //   console.log('what is products', products)
  //   res.render('shop/index', {
  //     prods: products,
  //     docTitle: 'Shop',
  //     path: '/',
  //   });
  // })
  // .catch(err => console.log(err))

  // Product.findAll()
  // .then(products => {
  //   console.log('what is products', products)
  //   res.render('shop/index', {
  //     prods: products,
  //     docTitle: 'Shop',
  //     path: '/',
  //   });
  // })
  // .catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
  req.user.populate('cart.items.productId')
  .execPopulate()
  .then(user => {
    const products = user.cart.items;
    res.render('shop/cart', {
      path: '/cart',
      docTitle: 'Your Cart',
      products: products
    })
  })
  .catch(err => console.log(err))
  //For mongoDb without mongoose
  // req.user.getCart()
  // .then(products => {
  //   res.render('shop/cart', {
  //     path: '/cart',
  //     docTitle: 'Your Cart',
  //     products: products
  //   });
  // })
  // .catch(err => console.log(err))
  //For SQL
  // req.user.getCart()
  // .then(cart => {
  //   return cart.getProducts()
  //   .then(products => {
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       docTitle: 'Your Cart',
  //       products: products
  //     });
  //   })
  //   .catch(err => console.log(err))
  // })
  // .catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
  .then(product => {
    return req.user.addToCart(product)
  })
  .then(result => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err))
  //for SQL
  // let fetchedCart;
  // let newQuantity = 1;
  // req.user.getCart()
  // .then(cart => {
  //   fetchedCart = cart;
  //   return cart.getProducts({ where: { id: prodId }})
  // })
  // .then(products => {
  //   let product;
  //   if (products.length > 0) {
  //     product = products[0];
  //   }
  //   if (product) {
  //     const oldQuantity = product.cartItem.quantity;
  //     newQuantity = oldQuantity + 1;
  //     return product;
  //   }
  //   return Product.findByPk(prodId)
  // })
  // .then(product => {
  //   return fetchedCart.addProduct(product, {
  //     through: { quantity: newQuantity }
  //   });
  // })
  // .then(() => {
  //   res.redirect('/cart');
  // })
  // .catch(err => console.log(err))
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    docTitle: 'Checkout',
    path: '/checkout'
  })
}

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
  .then(orders => {
    res.render('shop/orders', {
      docTitle: 'Your Orders',
      path: '/orders',
      orders: orders
    });
  })
  .catch(err => console.log(err))

  // req.user.getOrders()
  // .then(orders => {
  //   res.render('shop/orders', {
  //     docTitle: 'Your Orders',
  //     path: '/orders',
  //     orders: orders
  //   })
  // })
  // .catch(err => console.log(err))

  // req.user.getOrders({ include: ['products']})
  // .then(orders => {
  //   res.render('shop/orders', {
  //     docTitle: 'Your Orders',
  //     path: '/orders',
  //     orders: orders
  //   })
  // })
  // .catch(err => console.log(err));
}

exports.postOrder = (req, res, next) => {
  req.user.populate('cart.items.productId')
  .execPopulate()
  .then(user => {
    console.log(user.cart.items)
    const products = user.cart.items.map(i => {
      return {
        quantity: i.quantity,
        product: { ...i.productId._doc }
      }
    });
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user
      },
      products: products
    })
    return order.save()
  })
  .then(result => {
    return req.user.clearCart();
  })
  .then(() => {
    res.redirect('/orders');
  })
  .catch(err => console.log(err))

  // let fetchedCart;
  // req.user.addOrder()
  // .then(result => {
  //   res.redirect('/orders');
  // })
  // .catch(err => console.log(err))


  // req.user.getCart()
  // .then(cart => {
  //   fetchedCart = cart;
  //   return cart.getProducts()
  // })
  // .then(products => {
  //   return req.user.createOrder()
  //   .then(order => {
  //     return order.addProducts(products.map(product => {
  //       product.orderItem = {
  //         quantity: product.cartItem.quantity
  //       };
  //       return product;
  //     }))
  //   })
  //   .catch(err => console.log(err))
  // })
  // .then(result => {
  //   return fetchedCart.setProducts(null);
  // })
  // .then(() => {
  //   res.redirect('/orders');
  // })
  // .catch(err => console.log(err))
};

exports.postDeleteCartProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteItemFromCart(prodId)
  .then(result => {
    res.redirect('/cart')
  })
  .catch(err => console.log(err))
  // req.user.getCart()
  // .then(cart => {
  //   return cart.getProducts({ where: { id: prodId }})
  // })
  // .then(products => {
  //   const product = products[0];
  //   return product.cartItem.destroy();
  // })
  // .then(result => {
  //   res.redirect('/cart');
  // })
  // .catch(err => console.log(err))
}
