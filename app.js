const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
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

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);