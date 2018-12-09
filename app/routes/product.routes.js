module.exports = (app) => {
    const EXT = require('../../config').EXT+'/products';
    const ProductController = require('../controllers/product.controller');

    app.post(EXT, ProductController.create);
    app.get(EXT, ProductController.getAll);
    app.get(EXT+'/:id', ProductController.get);
    app.put(EXT+'/:id', ProductController.update);
    app.delete(EXT+'/:id', ProductController.delete);
};