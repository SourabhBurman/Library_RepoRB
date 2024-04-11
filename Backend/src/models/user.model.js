const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    "email" : {
        type : String,
        required: true,
        trim: true
    },
    "name" : {
        type : String,
        required : true,
        trim : true,
    },
    "password" : {
        type : String,
        required : true,
        trim : true,
    },
    "role" : {
        type : String,
        required : true,
        trim : true,
        enum : ["Admin", "Student"]
    }, 
    "courses" : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    }]
},{
    timestamps : true,
})

UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 7)
        next()
    }
})

UserSchema.methods.isPasswordCorrect = async function(email,password){
    const user = UserModel.findOne({email});
    if(!user){
        return false;
    }
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = function (){
    return jwt.sign({
        _id: this._id,
        email: this.email
    }, process.env.ACCESS_TOKEN_SECRET ,{ expiresIn : process.env.ACCESS_TOKEN_EXP})
}

const UserModel = mongoose.model("User", UserSchema)

module.exports = {UserModel}
