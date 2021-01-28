const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = 'mongodb://localhost:27017/productsInfo';
let mongodb;

function connect(callback){
    mongoClient.connect(mongoDbUrl, (err, client) => {
        mongodb = client.db('productsInfo');
        callback();
    });
}

function get(){
    return mongodb.collection('products');
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    get,
    close
};