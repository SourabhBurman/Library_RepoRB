const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    "name" : {
        type : String,
        required: true,
        trim: true
    },
    "description" : {
        type : String,
        required : true,
        trim : true,
    },
    "prerequisites" : {
        type : String,
        required : false,
        trim : true
    }, 
    "lectures" : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Lecture"
    }]
},{
    timestamps : true,
})

const CourseModel = mongoose.model("Course", CourseSchema)

module.exports = {CourseModel}
