const mongoose = require("mongoose");

const DiscussionSchema = new mongoose.Schema({
    "lecture" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Lecture"
    },
    "user" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    "message" : {
        type : String,
        required: true,
        trim: true
    }
},{
    timestamps : true,
})

const DiscussionModel = mongoose.model("Discussion", DiscussionSchema)

module.exports = {DiscussionModel}
