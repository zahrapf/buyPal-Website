const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");


const registrationSchema = new Schema({
    firstName:
    {
        type: String,
        required: true
    },
    lastName:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    dateCreated:
    {
        type: Date,
        default: Date.now()
    },
    type:
    {
        type: String,
        default: "User"
    }
});

registrationSchema.pre("save", function(next) 
{
    bcrypt.genSalt(12)
    .then((salt) => {

        bcrypt.hash(this.password, salt)
        .then((encryptPassword)=> {

            this.password = encryptPassword;
            next();
        })
        .catch(err=>console.log(`${err} occured while hashing the password!`));
    })
    .catch(err=>console.log(`${err} occured when salting!`));


});


const userModel = mongoose.model('Registered_user', registrationSchema);
module.exports=userModel;