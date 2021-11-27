
const teacherList = require('./teacher')
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

module.exports = router;