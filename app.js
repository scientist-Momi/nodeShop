const path = require('path');

const rootDir = require('./util/path');

const express = require('express');
const bodyParser = require('body-parser');
const fOFController = require('./controllers/404');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM product')
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    })
        .catch(err => {
            console.log(err);
        });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

//for 404 page
app.use( fOFController.get404Page);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        return User.findByPk(1);
    // console.log(result);

    })
    .then(user => {
        if (!user) {
            User.create({ name: 'John', email: 'john@gmail.com' });
        }
        return user;
    })
    // .then(user => {
    //     // console.log(user);
    //     return user.createCart();
    // })
    .then(cart => {
        app.listen(3000);
    })
    .catch(error => {
    console.log(error);
});



























// app.use('/', (req, res, next) => {
//     // console.log('public Middleware');
//     next();
// });
// app.use('/add-user', (req, res, next) => {
//     // console.log('first Middleware');
//     res.send('<form action="/user" method="POST"><input type="text" name="username" placeholder="enter username"><button type="submit">Add User</button></form>');
// });
// app.post('/user', (req, res, next) => {
//     console.log(req.body.username);
//     res.redirect('/');
    
//     // res.send('<h1>welcome!</h1>');
// });
// app.use('/', (req, res, next) => {
//     // console.log('second Middleware');
//     res.send('<h1>welcome!</h1>');
// });



























// app.use((req, res, next) => {
//     console.log('First Middleware');
//     next(); //allows request to continue to the next middleware
// });

// app.use((req, res, next) => {
//     console.log('second Middleware');
//     res.send('<h1>welcome!</h1>');
// });

// const server = http.createServer(app);

// server.listen(3000);

// app.listen(3000);