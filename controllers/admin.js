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
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(() => {
    console.log('Created Product')
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err))
  // Product.create({
  //   title: title,
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description,
  //   // userId: req.user.id
  // })
  // .then(() => {
  //   console.log('Created Product')
  //   res.redirect('/admin/products');
  // })
  // .catch(err => console.log(err))

  // const product = new Product(null, title, imageUrl, description, price);

  // product.save()
  // .then(() => {
  //   res.redirect('/');
  // })
  // .catch(err => console.log(err));
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
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
  .catch(err => console.log(err))
  
  // Product.findById(prodId, product => {
  //   if (!product) {
  //     return res.redirect('/');
  //   }
  //   res.render('admin/edit-product', {
  //     docTitle: 'Add Product',
  //     path: '/admin/edit-product',
  //     editing: editMode,
  //     product: product
  //   })
  // });
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  Product.findByPk(prodId)
  .then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDescription;
    return product.save()
  })
  .then(result => {
    console.log('updated product');
    res.redirect('/admin/products')
  })
  .catch(err => console.log(err))

  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDescription,
  //   updatedPrice
  // );
  // updatedProduct.save();
  // res.redirect('/admin/products')
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      docTitle: 'Admin Products',
      path: '/admin/products'
    })
  })
  .catch(err => console.log(err))

  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     docTitle: 'Admin Products',
  //     path: '/admin/products'
  //   })
  // })
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then(product => {
    return product.destroy();
  })
  .then(() => {
    console.log('DESTROYED PRODUCT')
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err))
  // Product.deleteById(prodId);
  // res.redirect('/admin/products');
}