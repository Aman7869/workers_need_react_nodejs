var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectId;

function register(req, response) {
    // console.log("Aman");
    // console.log(req.body);
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
            // console.log("1 document inserted");
            db.close();
        });
    });
}

function login(req, res) {
    const { email, password } = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("workers_need");
        var query = { email: email, password: password };
        dbo.collection("registration").find(query).toArray(function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                res.send({ message: 400, email: email, user: result[0]['user'] });
            } else {
                res.send({ message: 401 })
            }
            db.close();
        });
    });
}

function profile(req, res) {
    // console.log("profile");
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
            // console.log(result);
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
        var query = { _id: ObjectId(id) };
        // console.log(id);
        dbo.collection("registration").find(query).toArray(function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                res.send({
                    result: result
                });
            } else {
                res.send({ message: 401 })
            }
            // console.log(result);
            db.close();
        });
    });
}


function workers_table(req, response) {
    console.log("workers_table");
    console.log(req.body);
    const { name, email, password, dob, user } = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("workers_need");
        var myobj = { name: name, email: email, password: password, dob: dob, user: user };
        dbo.collection("workers_table").insertOne(myobj, function (err, res) {
            if (err) throw err;
            response.status(200).send({
                message: 'Successfully Register'
            });
            console.log("1 document inserted");
            db.close();
        });
    });
}


// //! Use of Multer
// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, '../reactproject/public/images/')     // './public/images/' directory name where save the file
//         // callBack(null, './images/')     // './public/images/' directory name where save the file
//     },
//     filename: (req, file, callBack) => {
//         console.log("file original = " + file.originalname);
//         callBack(null, Date.now() + path.extname(file.originalname))
//     }
// });


function workers_profile(req, res) {
    const { email } = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("workers_need");
        var query = { email: email };
        dbo.collection("workers_table").find(query).toArray(function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                res.send({
                    result: result
                });
            } else {
                res.send({ message: 401 })
            }
            // console.log(result);
            db.close();
        });
    });
}

function workers_profile_submit(req, response) {
    const { name, email, dob, id, phone, wType } = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("workers_need");
        var myquery = { _id: ObjectId(id) };
        var newvalues = { $set: { name: name, dob: dob, phone: phone, wType: wType } };
        dbo.collection("workers_table").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            response.status(200).send({
                message: 'Profiles edited successfully'
            });
            db.close();
        });
    });
}
function wokers_image_upload(req, response) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("workers_need");
        var myquery = { email: req.body.email };
        var newvalues = { $set: { images: req.file.filename } };
        dbo.collection("workers_table").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            response.status(200).send({
                message: 'Workers Image updated successfully'
            });
            db.close();
        });
    });
}

function get_workers(req, res) {
    const { wType } = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("workers_need");
        var query = { wType: wType };
        dbo.collection("workers_table").find(query).toArray(function (err, result) {
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
module.exports = {
    register: register,
    login,
    profile,
    profile_submit,
    admin,
    admin_edit,
    workers_table,
    workers_profile,
    workers_profile_submit,
    get_workers,
    wokers_image_upload,
};