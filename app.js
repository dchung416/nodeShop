const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
//This is for the handlebars template engine
// const expressHbs = require('express-handlebars'); 

const adminData = require('./routes/admin');
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

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', 'error.html'));
  res.status(404).render('404', { docTitle: 'Page Not Found' })
});

app.listen(3000);