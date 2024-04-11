const typeDefs = `
type User {
    id: ID!
    email: String!
    name: String
    password: String
    role: String!
    courses: [Course]
    accessToken: String
    createdAt: String
    updatedAt: String
}

type Course {
    id: ID!
    name: String!
    description: String!
    prerequisites: String!
    lectures: [Lecture]
    createdAt: String
    updatedAt: String
}

type Lecture {
    id: ID!
    course: ID!
    title: String!
    date: String!
    startTime: String!
    endTime: String!
    description: String
    link: String!
    assignmentLink: String
    discussions: [Discussion]
    createdAt: String
    updatedAt: String
}

type Discussion {
    id: ID!
    message: String!
    lecture : String!
    user: User!
    createdAt: String
    updatedAt: String
}

type Query {
    users: [User]
    user(id: ID!): User

    courses: [Course]
    course(id: ID!): Course

    lectures: [Lecture]
    lecture(id: ID!): Lecture

    discussions: [Discussion]
    discussion(id: ID!): Discussion
}


type Mutation {
    createUser(email: String!, name: String!, password: String!, role: String!): User
    loginUser(email: String!, password: String!): User
    passwordChange(id: ID!, oldPassword: String, newPassword: String): User
    deleteUser(id: ID!): User
    enrollCourse(userId: ID!, courseId: ID!): User


    createCourse(name: String!, description: String!, prerequisites: String!): Course
    updateCourse(id: ID!, name: String, description: String, prerequisites: String): Course
    deleteCourse(id: ID!): Course

    createLecture(course: ID!, title: String!, date: String!, startTime: String!, endTime: String!, description: String, link: String!, assignmentLink: String): Lecture
    updateLecture(id: ID!, course: ID, title: String, date: String, startTime: String, endTime: String, description: String, link: String, assignmentLink: String): Lecture
    deleteLecture(id: ID!): Lecture

    createDiscussion(message: String!, timestamp: String!): Discussion
    updateDiscussion(id: ID!, message: String, timestamp: String): Discussion
    deleteDiscussion(id: ID!): Discussion
}

`;

module.exports = typeDefs;
