const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const knex  = require('../db/knex');
const redis = require('redis');
const redis_Port = process.env.REDIS_URL || 6379;

require("dotenv").config()

const client = redis.createClient(redis_Port, {
    tls: {
        rejectUnauthorized: false
    }
});

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, './products/'); 
        //cb(null, path.join(__dirname, '../../build/static/products'))
        //cb(null, path.resolve(__dirname, 'build'))    
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
let upload = multer({ storage: storage }).single('img');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
 });

//localhost:3000/api/products
router.get('/products', (req, res, next) => {
    client.get('products', (err, items) => {
        if(err) console.log(err);
        if(items !== null){
            JSON.parse(items);
            res.send(items);
            console.log('fetched from cache')
        }else{
            knex.raw('select * from product').then((products) => {
                res.send(products.rows);
                console.log('fetched from postgres')
                client.setex('products', 100, JSON.stringify(products.rows));
            }).catch((err) =>console.log(err))
        }
    });
})

router.post('/products', upload, (req, res, next) => {
    
    let path = req.file.path;
    cloudinary.uploader.upload(path,{folder: "test-two-asset"}).then((result) => {
        knex.raw('insert into product(product_name, product_price, product_path) values(?, ?, ?)', [req.body.product, req.body.price, result.url])
        .then((doc) => {
            res.send(doc);
        })
        .catch((err) => console.log(err))
    }).catch((err) => {
        console.log(err)
    });
})

module.exports = router;