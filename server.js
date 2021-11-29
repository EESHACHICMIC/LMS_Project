const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 5000;
const student = require('./Student/studentController')
const teacher=require('./Teacher/teacherController')
const app = express()

app.use(express.json())
app.use(student)
app.use(teacher)


mongoose.connect("mongodb://localhost:27017/LMS",
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection successful"))
    .catch((err) => console.log(err));


app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message:`API is working..`
        })
    })

app.listen(port,() => console.log(`Server is running at port ${port}`))