
const studentList = require('./teacher')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

router.post('/api/teacher', async (req, res, next) => {


    const createDocument = async () => {

        try {
            // const stu = new studentList(req.body)
            const teacherData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                salary: req.body.salary,
                password: await bcrypt.hash(req.body.password, 10)

            }
            console.log("SudentData:", teacherData)

            const stu = new studentList(teacherData)

            const result = await stu.save();
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

module.exports = router;