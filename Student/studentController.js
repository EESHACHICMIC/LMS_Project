
const studentList = require('./student')
const express = require('express');
const router = express.Router();
const bcrypt=require('bcrypt')

router.post('/api/student', async (req, res, next) => {


    const createDocument = async () => {

        try {
            // const stu = new studentList(req.body)
            const stuData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                class:req.body.class,
                password: await bcrypt.hash(req.body.password, 10)
                
            }
            console.log("SudentData:", stuData)
            
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