var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectId;

function register(req, response) {
    console.log("Aman");
    console.log(req.body);
    const { name, email, password, dob, user } = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("workers_need");
        var myobj = { name: name, email: email, password: password, dob: dob, user: user };
        dbo.collection("registration").insertOne(myobj, function (err, res) {
            if (err) throw err;
            response.status(200).send({
                message: 'Successfully Register'
            });
            console.log("1 document inserted");
            db.close();
        });
    });
}

function login(req, res) {
    const { email, password } = req.body;
    // console.log(req.body);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("workers_need");
        var query = { email: email, password: password };
        dbo.collection("registration").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log('result');
            console.log(result);
            // console.log("User",result[0].user);
            if (result.length > 0) {
                res.send({ message: 400, email: email });
            } else {
                res.send({ message: 401 })
            }
            console.log(result);
            db.close();
        });
    });
}

function profile(req, res) {
    console.log("profile");
    const { email } = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("workers_need");
        var query = { email: email };
        dbo.collection("registration").find(query).toArray(function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                res.send({
                    result: result
                });
            } else {
                res.send({ message: 401 })
            }
            console.log(result);
            db.close();
        });
    });
}
function profile_submit(req, response) {
    const { name, email, dob, id, phone } = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("workers_need");
        var myquery = { _id: ObjectId(id) };
        var newvalues = { $set: { name: name, dob: dob, phone: phone } };
        dbo.collection("registration").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            response.status(200).send({
                message: 'Profiles edited successfully'
            });
            db.close();
        });
    });
}
function admin(req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("workers_need");
        dbo.collection("registration").find({}).toArray(function (err, result) {  // for find all
            if (err) throw err;
            if (result.length > 0) {
                res.send({
                    result: result
                });
            } else {
                res.send({ message: 401 })
            }
            db.close();
        });
    });
}

function admin_edit(req, res) {
    const { id } = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("workers_need");
        // var query = { _id: id };
        var query = { _id: ObjectId(id) };
        console.log(id);
        dbo.collection("registration").find(query).toArray(function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                res.send({
                    result: result
                });
            } else {
                res.send({ message: 401 })
            }
            console.log(result);
            db.close();
        });
    });
}

module.exports = {
    register: register,
    login,
    profile,
    profile_submit,
    admin,
    admin_edit,
};