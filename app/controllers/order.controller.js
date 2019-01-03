const Order = require('../models/order.model');

exports.create = (request, response)=>{
    const order = new Order({
        store: request.body.store,
        products: request.body.products
    });
    order.save((err,data)=>{
        sendResponse(err,data,request,response);
    });
};

exports.getAll = (request, response)=>{
    if(request.query.status && request.query.store==='warlock') Order.find({ status: request.query.status }, (err,data)=>sendResponse(err,data,request,response));
    else if(request.query.store) Order.find({ store: request.query.store }, (err,data)=>sendResponse(err,data,request,response));
    else sendResponse('Query param "store" missing',null,request,response);
};

exports.get = (request, response)=>{
    Order.findById(request.params.id, (err,data)=>sendResponse(err,data,request,response));  
};

exports.update = (request, response)=>{
    Order.findByIdAndUpdate(request.params.id, { $set: request.body }, { new: true, runValidators: true }, (err,data)=>{
        firebaseDatabase.ref("orders").child(request.params.id).set(data);
        sendResponse(err,data,request,response);
    });
};

function sendResponse(err, data, request, response) {
    console.log('['+request.method+'] '+request.url);
    if(err) {
        response.status(500).json({ err: err });
        console.log('[!STORE-ERR] '+err);
    } else response.status(200).json(data);
}