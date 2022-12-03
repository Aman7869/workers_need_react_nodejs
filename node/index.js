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
var nodemailer = require('nodemailer');
var http = require('http');

app.post('/register', (req, response) => {
    customApi.register(req, response);
    // ------------------Email working--------------------
    // var { email } = req.body;
    // var nodemailer = require('nodemailer');
    // var admin_email = "7869215831amankaithwas@gmail.com";
    // console.log(admin_email);
    // console.log(email);
    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: admin_email,
    //         pass: 'prvxfqkbrnhcpxbb'
    //     }
    // });

    // var mailOptions = {
    //     from: admin_email,
    //     to: email,
    //     subject: "Mail from Worker's need site.",
    //     html: '<h1>Welcome</h1><p>This has been come from workers need project , You have been successfully register.!</p>'
    //     // text: 'That was easy!'
    // };
    //     transporter.sendMail(mailOptions, function (error, info) {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             console.log('Email sent: ' + info.response);
    //         }
    //     });
    // ------------------Email--------------------
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
        callBack(null, file.originalname)
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
app.post('/wokers_image_upload', upload.single('image'), (req, response) => {
    customApi.wokers_image_upload(req, response);
});

app.post('/admin', (req, res) => {
    customApi.admin(req, res);
});

app.post('/admin_edit', (req, res) => {
    customApi.admin_edit(req, res);
});

app.post('/workers_table', (req, response) => {
    customApi.workers_table(req, response);
});
app.post('/workers_profile', (req, response) => {
    customApi.workers_profile(req, response);
});
app.post('/workers_profile_submit', upload.single('image'), (req, response) => {
    console.log("workers_profile_submit");
    customApi.workers_profile_submit(req, response);
});
app.post('/get_workers', (req, response) => {
    console.log("get_workers");
    customApi.get_workers(req, response);
});

app.post('/delete', (req, res) => {
    const { id } = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("workers_need");
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