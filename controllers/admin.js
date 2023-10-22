const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        docTitle: 'Add product',
        path: '/admin/add-product',
        editing: false
    });
};


exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    req.user.createProduct(
        {
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        userId: req.user.id
    }
    )

    // Product.create({
    //     title: title,
    //     price: price,
    //     imageUrl: imageUrl,
    //     description: description,
    //     userId: req.user.id
    // })
    .then(result => {
        res.redirect('/');
        console.log('created product');
    })
    .catch(error => {
        console.log(error);
    });
    // const product = new Product(null, title, imageUrl, description, price);
    // product.save()
    //     .then(() => {
    //         res.redirect('/');
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    // Product.findByPk(prodId)
        // .then(product => {
        //     if (!product) {
        //     return res.redirect('/');
        // }
        // res.render('admin/edit-product', {
        //     product: product,
        //     docTitle: product.title,
        //     path: '/admin/edit-product',
        //     editing: editMode
        // });
        // })
        // .catch(error => {
        //     console.log(error);
        // });
    req.user.getProducts({ where: { id: prodId } })
        .then(products => {
            const product = products[0];
            if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            product: product,
            docTitle: product.title,
            path: '/admin/edit-product',
            editing: editMode
        });
        })
        .catch(error => {
            console.log(error);
        });
};

exports.postEditProduct = (req, res, next) => { 
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;

    Product.findByPk(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDescription;
            product.imageUrl = updatedImageUrl;
            return product.save();
        })
        .then(result => {
            console.log('updated product');
            res.redirect('/admin/products');
        })
        .catch(error => {
            console.log(error);
    })
    // const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    // updatedProduct.save();
    
}

exports.getProducts = (req, res, next) => {
    // Product.findAll()
    req.user.getProducts()
        .then((products) => {
            res.render('admin/products', {
                prods: products,
                docTitle: 'Product list',
                path: '/admin/products'
            });
        })
        .catch(err => {
        console.log(err)
    });

};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(product => {
            product.destroy();
        })
        .then(result => {
            console.log('PRODUCT DELETED');
            res.redirect('/admin/products');
        })
        .catch(err => {
        console.log(err)
    });

}