module.exports = (app) => {
    const EXT = require('../../config').EXT+'/orders';
    const OrderController = require('../controllers/order.controller');

    app.post(EXT, OrderController.create);
    app.get(EXT, OrderController.getAll);
    app.get(EXT+'/:id', OrderController.get);
};