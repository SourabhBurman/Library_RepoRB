const {createCourse, updateCourse, deleteCourse, getAllCourse, getSingleCourse} = require("../controllers/course.controllers");
const { RegisterUser, LoginUser, passwordChange, DeleteUser, getUserProfile, getAllUser, enrollCourse } = require("../controllers/user.controllers");
const { createLecture, updateLecture, deleteLecture, getSingleLecture, getAllLecture } = require("../controllers/leacture.controller");
const authorization = require("../middleware/authorization.middleware");

const resolvers = {
    Query: {
        users: async () => {return await getAllUser()},
        user: async (_, {id}) => {return await getUserProfile(id)},

        courses: async () => {return await getAllCourse()},
        course: async (_, {id}) => {return await getSingleCourse(id) },

        lectures: async () => {return await getAllLecture()},
        lecture: async (_, {id}) => {return await getSingleLecture(id)},

        discussions: async () => {},
        discussion: async (_, {id}) => {},
    },
    Mutation: {
        createUser: async (_, {email,name, password,role}) => {return await RegisterUser({email,name, password,role})},
        loginUser: async (_, {email, password})=> {return await LoginUser({email,password})},
        passwordChange: async (_, {id, oldPassword, newPassword}) => {return await passwordChange({id, oldPassword, newPassword})},
        deleteUser: async (_, {id}) => {return await DeleteUser(id)},
        enrollCourse: async (_, {userId, courseId}, context) => {
            if(context.user){
                return await enrollCourse({userId, courseId})
            }
        },


        createCourse: async (_, {name, prerequisites, description}, context) => {
            if(!authorization(context, "Admin")){
                return await createCourse({name, prerequisites, description})
            }
        }, 
        updateCourse: async (_, {id, name, prerequisites, description}, context) => {
            if(!authorization(context, "Admin")){
                return await updateCourse({id,name, prerequisites, description})
            }
        }, 
        deleteCourse: async (_, {id}, context) => {
            if(!authorization(context, "Admin")){
                return await deleteCourse(id)
            }
        },        

        createLecture: async (_, {course, title, date, startTime, endTime, description, link, assignmentLink}, context) => {
            if(!authorization(context, "Admin")){
                return await createLecture({course, title, date, startTime, endTime, description, link, assignmentLink})
            }
        },
        updateLecture: async (_, {id, title, date, startTime, endTime, description, link, assignmentLink}, context) => {
            if(!authorization(context, "Admin")){
                return await updateLecture({id, title, date, startTime, endTime, description, link, assignmentLink})
            }
        },
        deleteLecture: async (_, {id}, context) => {
            if(!authorization(context, "Admin")){
                return await deleteLecture(id)
            }
        },

        createDiscussion: async (_, {message, timestamp}, context) => {},
        updateDiscussion: async (_, {id, message, timestamp}, context) => {},
        deleteDiscussion: async (_, {id}, context) => {},
    },
};

module.exports = resolvers;
