module.exports = (app)=>{
    const EXT = require('../../config').EXT+'/delivery_person';
    const DeliveryPersonController = require('../controllers/delivery_person.controller');

    app.post(EXT, DeliveryPersonController.create);
    app.get(EXT, DeliveryPersonController.get);
    app.put(EXT, DeliveryPersonController.update);
    app.delete(EXT, DeliveryPersonController.delete);
};