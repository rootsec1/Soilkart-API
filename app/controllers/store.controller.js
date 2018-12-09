const Store = require('../models/store.model');

exports.create = (request, response)=>{
    const store = new Store({
        _id: request.body.id,
        name: request.body.name,
        phone: request.body.phone,
        image: request.body.image,
        latitude: request.body.latitude,
        longitude: request.body.longitude,
        landmark: request.body.landmark
    });
    store.save((err,data)=>sendResponse(err, data, request, response));
};

exports.getAll = (request, response)=>{
    Store.find({}, (err,data)=>sendResponse(err,data,request,response));
};

exports.get = (request, response)=>{
    Store.findById(request.params.id, (err,data)=>sendResponse(err,data,request,response));
};

exports.update = (request, response)=>{
    Store.findByIdAndUpdate(request.params.id, { $set: request.body }, { new: true }, (err,data)=>sendResponse(err,data,request,response));
};

exports.delete = (request, response)=>{
    Store.findByIdAndRemove(request.params.id, (err,data)=>sendResponse(err,data,request,response));
};

function sendResponse(err, data, request, response) {
    if(err) {
        response.status(500).json({ err: err });
        console.log('[!STORE-ERR] '+err);
    } else response.status(200).json(data);
}