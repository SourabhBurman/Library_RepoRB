const { LectureModel } = require("../models/lecture.model");
const { CourseModel } = require("../models/course.model");

const createLecture = async (data)=>{
    const {course, title, date, startTime, endTime, description, link, assignmentLink} = data;
    console.log(data)
    try {
        if(!course || !title || !date || !startTime || !endTime){
            throw new Error("All Fields are required")
        }
        const lecture = await LectureModel.create({course, title, date, startTime, endTime, description, link, assignmentLink});
        if(!lecture){
            throw new Error('Unable to create the lecture at that moment');
        }

        const courseToUpdate = await CourseModel.findById(course);
        if(!courseToUpdate){
            throw new Error('Course not found');
        }
        courseToUpdate.lectures.push(lecture);
        await courseToUpdate.save();

        return lecture;
    } catch (error) {
        throw error;
    }
}


const updateLecture = async (data)=>{
    const {id, title, date, startTime, endTime, description, link, assignmentLink} = data;

    let update = {};
    if (title) update.title = title;
    if (date) update.date = date;
    if (startTime) update.startTime = startTime;
    if (endTime) update.endTime = endTime;
    if (description) update.description = description;
    if (link) update.link = link;
    if (assignmentLink) update.assignmentLink = assignmentLink;

    try {
        const updatedLecture = await LectureModel.findByIdAndUpdate(id, update, {new: true});
        if(!updatedLecture){
            throw new Error("Lecture not found");
        }
        return updatedLecture;
    } catch (error) {
        throw error;
    }
}

const deleteLecture = async (id)=>{
    console.log(id)
    try {
        const deletedLecture = await LectureModel.findByIdAndDelete(id);
        if(!deletedLecture){
            throw new Error("Lecture not found");
        }
        
        const courseToUpdate = await CourseModel.findById(deletedLecture.course);
        if(!courseToUpdate){
            throw new Error('Course not found');
        }
        
        const index = courseToUpdate.lectures.indexOf(id);
        if (index > -1) {
            courseToUpdate.lectures.splice(index, 1);
        }
        await courseToUpdate.save();

        return deletedLecture;
    } catch (error) {
        throw error;
    }
}

const getSingleLecture = async (id)=>{
    try {
        const SingleLeacture = await LectureModel.findById(id);
        if(!SingleLeacture){
            throw new Error("Unable to find the leacture at the moment")
        }

        return SingleLeacture;
    } catch (error) {
        throw error
    }
}

const getAllLecture = async ()=>{
    try {
        const Alllecture = await LectureModel.find();
        if(!Alllecture){
            throw new Error("Unable to find the course at the moment")
        }

        return Alllecture;
    } catch (error) {
        throw error
    }
}

module.exports = { createLecture, updateLecture, deleteLecture, getSingleLecture, getAllLecture }
