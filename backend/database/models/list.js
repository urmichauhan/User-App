const mongoose = require('mongoose');
const ListSchema = new mongoose.Schema({
    userId: String,
    firstname: String,
    middlename:String,
    lastname:String,
    password:String,
    email:String,
    address1:String,
    address2:String,
    city:String,
    state:String,
    zip:Number
});

const List = mongoose.model('List', ListSchema);

module.exports = List;