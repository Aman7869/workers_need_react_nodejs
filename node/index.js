
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var express = require('express');
var ObjectId = require('mongodb').ObjectId;
var cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("./public"));
// app.use(bodyParser.urlencoded({ extended: true }));
var customApi = require('./Api/api');

app.post('/register', (req, response) => {
    customApi.register(req, response);
    console.log("called after function called");
});

app.post('/login', (req, res) => {
    customApi.login(req, res);
});

app.post('/profile', (req, res) => {
    customApi.profile(req, res);
});


app.post('/profile_submit', (req, response) => {
    customApi.profile_submit(req, response);
});


//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../reactproject/public/images/')     // './public/images/' directory name where save the file
        // callBack(null, './images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        console.log("file original = " + file.originalname);
        callBack(null, Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({
    storage: storage
});


app.post('/image_upload', upload.single('image'), (req, response) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("workers_need");
        var myquery = { email: req.body.email };
        var newvalues = { $set: { images: req.file.filename } };
        dbo.collection("registration").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;

            response.status(200).send({
                message: 'Image updated successfully'
            });
            db.close();
        });
    });
});


app.post('/admin', (req, res) => {
    customApi.admin(req, res);
});


app.post('/admin_edit', (req, res) => {
    customApi.admin_edit(req, res);

    // const { id } = req.body;
    // MongoClient.connect(url, function (err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("workers_need");
    //     // var query = { _id: id };
    //     var query = { _id: ObjectId(id) };
    //     console.log(id);
    //     dbo.collection("registration").find(query).toArray(function (err, result) {
    //         if (err) throw err;
    //         if (result.length > 0) {
    //             res.send({
    //                 result: result
    //             });
    //         } else {
    //             res.send({ message: 401 })
    //         }
    //         console.log(result);
    //         db.close();
    //     });
    // });
});

app.post('/delete', (req, res) => {
    const { id } = req.body;
    // console.log(id);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("workers_need");
        // var query = { _id: id };
        var query = { _id: ObjectId(id) };
        dbo.collection("registration").deleteOne(query, function (err, obj) {
            if (err) throw err;
            else res.send({
                message: 'data deleted successfully'
            });
            db.close();
        });
    });
});

app.post('/learn', (req, response) => {
    console.log("learn");
    console.log(req.body);
    const { name, email, password } = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("workers_need");
        var myobj = { name: name, email: email, password: password }; // for decrypt use atob
        dbo.collection("Test").insertOne(myobj, function (err, res) {
            if (err) throw err;
            response.status(200).send({
                message: 'Successfully Register'
            });
            console.log("1 document inserted");
            db.close();
        });
    });
});



console.log("Aman");
app.listen(3000, () => {
    console.log('running server');
});