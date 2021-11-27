
const studentList = require('./student')
const express = require('express');
const multer=require('multer');
const router = express.Router();
const bcrypt=require('bcrypt')


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

module.exports = router;