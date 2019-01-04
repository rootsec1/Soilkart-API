const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const firebaseAdmin = require('firebase-admin');
//LOCAL
const config = require('./config');
const serviceAccount = require('./config/sak.json');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection', socket=>{
    console.log('[WEBSOCKET] Client connected');
    socket.on('disconnect', ()=>console.log('[WEBSOCKET] Client disconnected'));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(express.static(__dirname+'/web'));

app.get('/', (request,response)=>{
    console.log('['+request.method+'] '+request.url);
    response.sendFile(__dirname+'/web/index.html');
});

require('./app/routes/store.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/delivery_person.routes')(app);
require('./app/routes/order.routes')(app);
app.listen(config.PORT, '0.0.0.0', ()=>{
    console.log('[SERVER] Listening on port '+config.PORT);
    mongoose.set('useFindAndModify', false);
    mongoose.connect(config.DB_URI, { useNewUrlParser: true })
    .then(()=>{
        console.log('[DB] Successfully hooked to Database');
        firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount),
            databaseURL: "https://soilkart-3d137.firebaseio.com"
        });        
        require('./app/models/store.model').watch().on('change',data=>io.emit('STORES', data));
        require('./app/models/order.model').watch().on('change',data=>io.emit('ORDERS', data));
    })
    .catch(err=>{
        console.log('[!DB-ERR] '+err);
        console.log('[SERVER] Killing process.');
        process.exit();
    });
});