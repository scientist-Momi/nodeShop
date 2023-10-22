const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart;

































// const fs = require('fs');
// const path = require('path')
// const rootDir = require('../util/path');
// const p = path.join(rootDir, 'data', 'cart.json');

// module.exports = class Cart {

//     static addProduct(id, productPrice) {
//         // fetch the previous cart
//         fs.readFile(p, (err, fileContent) => {
//             let cart = { products: [], totalPrice: 0 };
//             if (!err) {
//                 cart = JSON.parse(fileContent);
//             }
//             // analyse the cart - finding existing product
//             const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
//             const existingProduct = cart.products[existingProductIndex];
//             let updatedProduct;

//             if (existingProduct) {
//                 updatedProduct = { ...existingProduct };
//                 updatedProduct.qty = updatedProduct.qty + 1;
//                 cart.products = [...cart.products];
//                 cart.products[existingProductIndex] = updatedProduct;
//             } else {
//                 updatedProduct = { id: id, qty: 1 };
//                 cart.products.push(updatedProduct);
//                 // cart.products = { ...cart.products, updatedProduct };
//             }
//             cart.totalPrice = cart.totalPrice + +productPrice;
//             fs.writeFile(p, JSON.stringify(cart, null, 2), err => {
//                 if (err) {
//                     console.log(err);
//                 }
//             });

//         });
        
//         // add new or increase quantity
//     }

//     static deleteProduct(id, productPrice) {
//         fs.readFile(p, (err, fileContent) => {
//             if (err) {
//                 return;
//             }
//             const updatedCart = { ...JSON.parse(fileContent) };
//             const product = updatedCart.products.find(prod => prod.id === id);
//             if (!product) {
//                 return;
//             }
//             const productQty = product.qty;
//             updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
//             updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

//             fs.writeFile(p, JSON.stringify(updatedCart, null, 2), err => {
//                 if (err) {
//                     console.log(err);
//                 }
//             });
//         });
//     }

//     static getCart(cb) {
//         fs.readFile(p, (err, fileContent) => {
//             const cart = JSON.parse(fileContent);
//             if (err) {
//                 cb(null);
//             } else {
//                 cb(cart);
//             }
//         });
//     }
// }