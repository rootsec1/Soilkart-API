const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
//LOCAL
const config = require('./config');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.get('/', (request,response)=>{
    response.status(200).json({ message: 'All API requests should be directed to /api/v1 endpoint.' });
});

app.listen(config.PORT, '0.0.0.0', ()=>{
    console.log('[SERVER] Listening on port '+config.PORT);
    mongoose.connect(config.DB_URI, { useNewUrlParser: true })
    .then(()=>console.log('[DB] Successfully hooked to Database.'))
    .catch(err=>{
        console.log('[!DB-ERR] '+err);
        console.log('[SERVER] Killing process.');
        process.exit();
    });
});