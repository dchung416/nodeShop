const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
// const sequelize = require('./helpers/database');
// const Product = require('./models/product');
// const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');

//Import Mongo
// const mongoConnect = require('./helpers/database').mongoConnect;
const mongoose = require('mongoose');
const User = require('./models/user');

//This is for the handlebars template engine
// const expressHbs = require('express-handlebars'); 

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

//This command is for the pug template engine
// app.set('view engine', 'pug');
// app.set('views', 'views');

//The following commands are for the handlebars template engine
// app.engine('hbs', expressHbs({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
// app.set('view engine', 'hbs');
// app.set('views', 'views');

//The following commands are for the ejs template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // User.findByPk(1)
  // .then(user => {
  //   req.user = user;
  //   next();
  // })
  // .catch(err => console.log(err));
  User.findById('5c256b495d4694d339af5a83')
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
//   app.listen(3000);
// })
mongoose.connect('mongodb+srv://dchung:U8yPmcj9MBfCUZQ@cluster0-viq0l.mongodb.net/shop?retryWrites=true')
.then(() => {
  User.findOne()
  .then(user => {
    if (!user) {
      const user = new User({
        name: 'Dan',
        email: 'test@test.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  })
  app.listen(3000);
})
.catch(err => console.log(err))

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// sequelize
// // .sync({ force: true })
// .sync()
// .then(result => {
//   // console.log(result)
//   return User.findByPk(1)
//   // app.listen(3000);
// })
// .then(user => {
//   if (!user) {
//     return User.create({
//       name: 'Dan',
//       email: 'test@test.com'
//     })
//   }
//   return user
// })
// .then(user => {
//   // console.log(u);
//   return user.createCart();
// })
// .then(cart => {
//   app.listen(3000);
// })
// .catch(err => console.log(err));
