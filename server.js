/*const express = require('express')
require('./config/connect')
const app = express()
const student = require('./module/Student')
app.use(express.json());
app.post('/add', async(req, res) => {

    try {
        data = req.body;
        std = new student(data);
        savedstudent = await std.save();
        res.status(200).send(savedstudent)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.put('/update/:id', async(req, res) => {

    try {
        id = req.params.id;
        newdata = req.body;
        updated = await student.findByIdAndUpdate({ _id: id }, newdata)
        res.status(200).send(updated)
    } catch (error) {
        res.status(400).send(error)
    }
})
app.delete('/delete/:id', function(req, res) {


    id = req.params.id;
    student.findOneAndDelete({ _id: id })
        .then(
            (deletedset) => {
                res.send(deletedset);
            }
        )
        .catch(
            (err) => {
                res.send(err);
            }
        );

})
app.get('/all', async(req, res) => {

    try {
        stud = await student.find()
        res.status(200).send(stud)
    } catch (error) {
        res.status(400).send(error)
    }
})
app.get('/getid/:id', async(req, res) => {

    try {
        id = req.params.id;
        stud = await student.findById({ _id: id })
        res.status(200).send(stud)
    } catch (error) {
        res.status(400).send(error)
    }
})








app.listen(5000, console.log('server run'))
*/
const express = require("express");
require("./config/connect");
const student_router = require("./routers/students");

const app = express();
const port = 5000;
app.use(express.json());
app.use("/api/students", student_router);

app.listen(port, () => console.log(`Student app listening on port ${port}!`));