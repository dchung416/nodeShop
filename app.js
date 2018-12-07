const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./helpers/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

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
  User.findByPk(1)
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User), { constraints: true, onDelete: 'CASCADE' };
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
.sync({ force: true })
// .sync()
.then(result => {
  // console.log(result)
  return User.findByPk(1)
  // app.listen(3000);
})
.then(user => {
  if (!user) {
    return User.create({
      name: 'Dan',
      email: 'test@test.com'
    })
  }
  return user
})
.then(u => {
  // console.log(u);
  app.listen(3000);
})
.catch(err => console.log(err));

// app.listen(3000);