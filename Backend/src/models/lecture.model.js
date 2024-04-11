const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
    "course" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    },
    "title" : {
        type : String,
        required: true,
        trim: true
    },
    "date": {
        type: String,
        required: true,
        trim: true
    },
    "startTime": {
        type: String,
        validate: [
            function(startTime) {
                return this.date ? startTime !== undefined : true;
            },
            "Start time is required if date is provided"
        ]
    },
    "endTime": {
        type: String,
        validate: [
            function(endTime) {
                return this.date ? endTime !== undefined : true;
            },
            "End time is required if date is provided"
        ]
    },
    "description" : {
        type : String,
        required : false,
        trim : true
    }, 
    "link" : {
        type : String,
        required : true,
        trim : true
    },
    "assignmentLink":{
        type : String,
        required : false,
        trim : true
    },
    "discussions" : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Discussion"
    }]
},{
    timestamps : true,
})

const LectureModel = mongoose.model("Lecture", LectureSchema)

module.exports = {LectureModel}
