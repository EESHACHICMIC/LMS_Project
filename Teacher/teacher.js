const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const { application } = require('express')
const teacherSchema = new mongoose.Schema({
    emp_id:{
        type:Number,
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
    salary: {
        type: Number, 
        required: true
    },
    teachingIn:{
        type:Array,
        required:true
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

const teacherList = new mongoose.model("teacherRecord", teacherSchema)



module.exports = teacherList;