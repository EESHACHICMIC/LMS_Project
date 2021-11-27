const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const { application } = require('express')
const stuSchema = new mongoose.Schema({
    rollNo:{
        type:String,
        required:true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic:{
        type:String,
        required:true
    }
})

const studentList = new mongoose.model("studentRecord", stuSchema)



module.exports = studentList;