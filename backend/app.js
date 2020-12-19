const express = require('express');
const app = express();
const mongoose = require("./database/mongoose");

// app.use(cors())
const List = require("./database/models/list");
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Lists operation
app.get('/userList', (req, res) => {
    List.find({}).then(lists => {
        res.send(lists)
    }).catch((error) => {
        console.log(error);
    })
});

app.post('/userList', (req, res) => {
    new List({
        'userId': req.body.userId,
        'firstname':req.body.firstname,
        'middlename':req.body.middlename,
        'lastname':req.body.lastname,
        'password':req.body.password,
        'email':req.body.email,
        'address1':req.body.address1,
        'address2':req.body.address2,
        'city':req.body.city,
        'state':req.body.state,
        'zip':req.body.zip
    }).save()
        .then((list) => res.send(list))
        .catch((error) => {
            console.log(error);
        })
})

app.get('/userList/:_id', (req, res) => {
    List.find({ _id: req.params._id })
        .then((list) => res.send(list))
        .catch((error) => {
            console.log(error);
        })
})

app.patch('/userList/:_id', (req, res) => {
    List.findOneAndUpdate({ _id: req.params._id }, { $set: req.body })
        .then((list) => res.send(list))
        .catch((error) => {
            console.log(error);
        })
})

app.delete('/userList/:_id', (req, res) => {
    List.findByIdAndDelete({ _id: req.params._id }, { $set: req.body })
        .then((list) => res.send(list))
        .catch((error) => {
            console.log(error);
        })
})

app.listen(3000, () => console.log("Server connected on port 3000"));