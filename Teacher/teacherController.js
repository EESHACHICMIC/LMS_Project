
const teacherList = require('./teacher')
const studentList=require('../Student/student')
const express = require('express');
const multer=require('multer')
const router = express.Router();
const bcrypt = require('bcrypt')

const fileStorageEngine = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './Teacher/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine })


router.post('/api/teacher',upload.single('profilePic'), async (req, res, next) => {


    const createDocument = async () => {

        try {
            
            const teacherData = {
                emp_id:req.body.emp_id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                teachingIn:req.body.teachingIn,
                email: req.body.email,
                salary: req.body.salary,
                password: await bcrypt.hash(req.body.password, 10),
                profilePic:req.file.path
            }

            console.log("TeacherData:", teacherData)

            const teacher = new teacherList(teacherData)

            const result = await teacher.save();
            console.log("Result:", result)

            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            console.log(error)
        }

    }
    createDocument();

})


router.get('/api/teacher/all',(req,res)=>{
    
    const displayDocument=async()=>{
        const data= await teacherList.find({}).lean();
        console.log(data)
        res.json({data})
    }
    displayDocument();
})



router.get('/api/teacher/:id',(req,res)=>{
    const findTeacher=async()=>{
       
       let foundTeacher= await teacherList.find({emp_id:Number.parseInt(req.params.id)},{_id:0});
       let teachingInClass=await teacherList.find({emp_id:Number.parseInt(req.params.id)},{_id:0,teachingIn:1})
      

       let foundStudent= await studentList.find({class:teachingInClass[0].teachingIn},{_id:0,rollNo:1,first_name:1,last_name:1,email:1,profilePic:1});

       res.status(200).json({
           success:true,
           TEACHER_INFO:foundTeacher,
           STUDENT_DETAILS:foundStudent[0]==undefined? `Not any student are registred of ${teachingInClass[0].teachingIn} class`:foundStudent
       })

    }
    findTeacher();
})

module.exports = router;