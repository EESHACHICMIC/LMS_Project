
const studentList = require('./student')
const express = require('express');
const multer=require('multer');
const router = express.Router();
const bcrypt=require('bcrypt');
const teacherList = require('../Teacher/teacher');


const fileStorageEngine = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './Student/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine })


router.post('/api/student',upload.single('profilePic'), async (req, res, next) => {
            // console.log(req.file)
            // console.log(req.body);

    const createDocument = async () => {

        try {
            // const stu = new studentList(req.body)
            const stuData = {
                rollNo:req.body.rollNo,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                class:req.body.class,
                password: await bcrypt.hash(req.body.password, 10),
                profilePic: req.file.path
                
            }
                     
            const stu=new studentList(stuData)
            
            const result = await stu.save();
            console.log("Result:",result)

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

router.get('/api/student/all',(req,res)=>{
    const displayDocument=async()=>{
        const data= await studentList.find({}).lean();
        console.log(data)
        res.json({data})
    }
    displayDocument();
})


router.get('/api/student/:id',(req,res)=>{
    const findStudent=async()=>{
       
       let foundStu= await studentList.find({rollNo:Number.parseInt(req.params.id)},{_id:0});
       let stuClass=await studentList.find({rollNo:Number.parseInt(req.params.id)},{_id:0,class:1})
    //    console.log(stuClass[0].class);

       let foundTeacher= await teacherList.find({teachingIn:stuClass[0].class},{_id:0,emp_id:1,first_name:1,last_name:1,email:1,profilePic:1});
       console.log(foundStu);
       console.log(foundTeacher);

       res.status(200).json({
           success:true,
           STUDENT_INFO:foundStu,
           TEACHER_DETAILS:foundTeacher[0]==undefined?`No any Teacher is alloted for ${stuClass} student`:foundTeacher
       })

    }
    findStudent();
})
module.exports = router;