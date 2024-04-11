const { CourseModel } = require("../models/course.model");


const createCourse = async (data)=>{
    const {name, prerequisites, description} = data;
    try {
        if(!name || !prerequisites || !description){
            throw new Error("All Fields are required")
        }
        const course = await CourseModel.create({name, prerequisites, description});
        if(!course){
            throw new Error('Unable to create the course at that moment');
        }

        return course
    } catch (error) {
        throw error;
    }
}

const deleteCourse = async (id)=>{
    try {
        const deletedCourse = await CourseModel.findByIdAndDelete(id);
        if(!deletedCourse){
            throw new Error("Course not found");
        }
        return deletedCourse;
    } catch (error) {
        throw error;
    }
}

const updateCourse = async (data)=>{
    const {id, name, prerequisites, description} = data;
    
    let update = {};
    if (name) update.name = name;
    if (prerequisites) update.prerequisites = prerequisites;
    if (description) update.description = description;

    try {
        const updatedCourse = await CourseModel.findByIdAndUpdate(id, update, {new: true});
        if(!updatedCourse){
            throw new Error("Course not found");
        }
        return updatedCourse;
    } catch (error) {
        throw error;
    }
}

const getSingleCourse = async (id)=>{
    try {
        const course = await CourseModel.findById(id).populate("lectures");
        if(!course){
            throw new Error("Unable to find the course at the moment")
        }

        return course;
    } catch (error) {
        throw error
    }
}

const getAllCourse = async ()=>{
    try {
        const courses = await CourseModel.find().populate("lectures");
        if(!courses){
            throw new Error("Unable to find the course at the moment")
        }

        return courses;
    } catch (error) {
        throw error
    }
}

module.exports = {createCourse, updateCourse, deleteCourse, getAllCourse, getSingleCourse}