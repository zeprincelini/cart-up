const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');

require("dotenv").config()

const Product = require('../model/product');

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
    Product.find((err, doc) => {
        if(err){
            return console.log('error retrieving products');
        }
        res.send(doc);
    })
})

router.post('/products', upload, (req, res, next) => {
    console.log("body " + req.body.name)
    console.log("file " + req.file)
    let path = req.file.path;
    cloudinary.uploader.upload(path,{folder: "test-two-asset"}).then((result) => {
    let newProduct = new Product({
        name: req.body.product,
        price: req.body.price,
        path: result.url
    });
    newProduct.save((err, item) => {
        if(err){
            console.log(err)
        }
        res.send(item);
        console.log(item);
    });
    }).catch((err) => {
        console.log(err)
    });
})

module.exports = router;