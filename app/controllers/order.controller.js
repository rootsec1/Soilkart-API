const Order = require('../models/order.model');
const Store = require('../models/store.model');
const firebaseAdmin = require('firebase-admin');

exports.create = (request, response)=>{
    const order = new Order({
        store: request.body.store,
        products: request.body.products
    });
    order.save((err,data)=>{
        if(err) sendResponse(err,null,request,response);
        else {
            //Broadcasting new order to delivery guy's devices
            const message = {
                "data": { "event": "NEW" },
                "topic": "ORDERS"
            };
            firebaseAdmin.messaging().send(message, true)       //TODO: Remove true to remove dry run
            .then(fcmResponse => {
                sendResponse(err,data,request,response);
                console.log('[FCM] Successfully sent message: '+fcmResponse);
            })
            .catch(err => console.log('[FCM] Error sending message: '+err));
        }
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
        if(err) sendResponse(err,null,request,response);
        else {
            //Sending only to individual device using FCM token
            Store.findById(data.store, (errStore, dataStore)=>{
                if(errStore) sendResponse(errStore, null, request, response);
                else {
                    const fcmToken = dataStore.fcm_token;
                    const message = {
                        "data": { "event": "UPDATED" },
                        "token": fcmToken
                    };
                    firebaseAdmin.messaging().send(message, true)       //Remove true to remove dry run
                    .then(fcmResponse => {
                        sendResponse(err,data,request,response);
                        console.log('[FCM] Successfully sent message: '+fcmResponse);
                    })
                    .catch(err => console.log('[FCM] Error sending message: '+err));
                }
            });
        }
    });
};

function sendResponse(err, data, request, response) {
    console.log('['+request.method+'] '+request.url);
    if(err) {
        response.status(500).json({ err: err });
        console.log('[!STORE-ERR] '+err);
    } else response.status(200).json(data);
}