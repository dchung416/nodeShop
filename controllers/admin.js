const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
  );
  product.save()
  .then(result => {
    console.log('Created Product!');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err))
  // req.user.createProduct({
  //   title: title,
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description
  // })
  // .then(() => {
  //   console.log('Created Product')
  //   res.redirect('/admin/products');
  // })
  // .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      docTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    }) 
  })
  // req.user.getProducts({where: {id: prodId}})
  // Product.findByPk(prodId)
  // .then(products => {
  //   const product = products[0];
  //   if (!product) {
  //     return res.redirect('/');
  //   }
  //   res.render('admin/edit-product', {
  //     docTitle: 'Add Product',
  //     path: '/admin/edit-product',
  //     editing: editMode,
  //     product: product
  //   })
  // })
  .catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImageUrl, prodId)
  product.save()
  .then(result => {
    console.log('updated product');
    res.redirect('/admin/products')
  })
  // Product.findByPk(prodId)
  // .then(product => {
  //   product.title = updatedTitle;
  //   product.price = updatedPrice;
  //   product.imageUrl = updatedImageUrl;
  //   product.description = updatedDescription;
  //   return product.save()
  // })
  // .then(result => {
  //   console.log('updated product');
  //   res.redirect('/admin/products')
  // })
  .catch(err => console.log(err))
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      docTitle: 'Admin Products',
      path: '/admin/products'
    })
  })
  .catch(err => console.log(err))

  // req.user.getProducts()
  // .then(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     docTitle: 'Admin Products',
  //     path: '/admin/products'
  //   })
  // })
  // .catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
  // Product.findByPk(prodId)
  // .then(product => {
  //   return product.destroy();
  // })
  .then(() => {
    console.log('DESTROYED PRODUCT')
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err))
}