var express = require('express');
var router = express.Router();
const db = require('../dbConf/db');
const objectId = require('mongodb').ObjectID;

/**
 * To get all available products
 */
router.get('/', function (req, res){
    db.get().find({}).toArray()
        .then((products, error) => {
            if (products) {
                res.status(200);
                res.send(products);
            }
            if (error) {
                // Handle response errors.
            }
        });
});

/**
 * To get a product by productId
 * @param productId
 */
router.get('/:productId', function(req, res){

    const productId = req.params.productId;

    // Validations
    // Check the input param data, if corrupted then send 400 Bad request

    db.get().findOne({}, {productId: productId})
        .then((product, error) => {
            if (product) {
                res.status(200);
                res.send(product);
            }
            if (error) {
                // Handle response errors.
            }
    });
});

/**
 * To save new products information
 * @input products data in req.body
 */
router.post('/save', function(req, res){

    const requestPayload = req.body;

    // Validations
    // Check the input data, if corrupted then send 400 Bad request

   db.get().insertOne(requestPayload).then(value => {
       res.status(201);
       res.json(value.ops[0]);
   }, error => {
       // Handle response error if insert gets failed.
   });
});

/**
 * To delete a product using productId
 * @param productId
 */
router.delete('/delete/:id', function(req, res){

    const docId = req.params.id;

    // Validations
    // Check the input param data, if corrupted then send 400 Bad request

   db.get().deleteOne({_id: objectId(docId)}).then(value => {
       res.json(200);
       res.json({message:"Document deletion successful"});
   }, error => {
       // Handle response error if delete gets failed.
   });
});

/**
 * To update a product
 * @input product data in req.body
 */
router.put('/update', function(req, res){

    const productData = req.body;

    // Validations
    // Check the input param data, if corrupted then send 400 Bad request.
    // Check the data in the req body and return 400, if data is corrupted.

    let productInfo = {
        productName: productData.productName,
        description: productData.description
    }

    db.get().updateOne({_id: objectId(productData._id)}, {$set: productInfo}).then(value => {
        res.json(200);
        res.json({message:"Document update successful"});
    }, error => {
        // Handle response error if put gets failed.
    });
});

module.exports = router;