const DeliveryPerson = require('../models/delivery_person.model');

exports.create = (request, response)=>{
    const deliveryPerson = new DeliveryPerson({
        _id: request.body.id,
        name: request.body.name,
        phone: request.body.phone,
        latitude: request.body.latitude,
        longitde: request.body.longitde
    });
    deliveryPerson.save((err,data)=>sendResponse(err,data,request,response));
};

exports.get = (request, response)=>{
    DeliveryPerson.findById(request.params.id, (err,data)=>sendResponse(err,data,request,response));
};

exports.update = (request, response)=>{
    DeliveryPerson.findByIdAndUpdate(request.params.id, { $set: request.body }, { new: true }, (err,data)=>sendResponse(err,data,request,response));
};

exports.delete = (request, response)=>{
    DeliveryPerson.findByIdAndRemove(request.params.id, (err,data)=>sendResponse(err,data,request,response));
};

function sendResponse(err, data, request, response) {
    console.log('['+request.method+'] '+request.url);
    if(err) {
        response.status(500).json({ err: err });
        console.log('[!STORE-ERR] '+err);
    } else response.status(200).json(data);
}