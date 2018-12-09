module.exports = (app) => {
    const EXT = require('../../config').EXT+'/stores';
    const StoreController = require('../controllers/store.controller');

    app.post(EXT, StoreController.create);
    app.get(EXT, StoreController.getAll);
    app.get(EXT+'/:id', StoreController.get);
    app.put(EXT+'/:id', StoreController.update);
    app.delete(EXT+'/:id', StoreController.delete);
};