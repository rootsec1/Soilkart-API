const Product = require('../models/product.model');

exports.create = (request, response)=>{
    const product = new Product({
        name: request.body.name,
        category: request.body.category,
        price: request.body.price,
        unit: request.body.unit,
        discount: request.body.discount,
        image: request.body.image
    });
    product.save((err,data)=>sendResponse(err,data,request,response));
};

exports.getAll = (request, response)=>{
    if(request.query.category) Product.find({ category: request.query.category }, (err,data)=>sendResponse(err,data,request,response));
    else Product.find({}, (err,data)=>sendResponse(err,data,request,response));
};

exports.get = (request, response)=>{
    Product.findById(request.params.id, (err,data)=>sendResponse(err,data,request,response));
};

exports.update = (request, response)=>{
    Product.findByIdAndUpdate(request.params.id, { $set: request.body }, { new: true }, (err,data)=>sendResponse(err,data,request,response));
};

exports.delete = (request, response)=>{
    Product.findByIdAndRemove(request.params.id, (err,data)=>sendResponse(err,data,request,response));
};

function sendResponse(err, data, request, response) {
    console.log('['+request.method+'] '+request.url);
    if(err) {
        response.status(500).json({ err: err });
        console.log('[!STORE-ERR] '+err);
    } else response.status(200).json(data);
}