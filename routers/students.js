const router = require('express').Router();
const mongoose = require('mongoose')
const { Student } = require('../module/student');
const _ = require('lodash');

let modules = [
    { module: "math", note: 15 },
    { module: "english", note: 7 },
    { module: "science", note: 9 }
  ];
  
router.post('/', (req, res) => {
    let student = new Student(req.body);
    let validation_res = student.validate_body(req.body);
    if (validation_res.error)
        return res.status(400).send(validation_res.error.message);
    try {
        let student = {
            id: students.length + 1,
            name: req.body.name,
            class: req.body.class,
            module:req.body.module,
            note:req.body.note
        };
        students.push(student);
        let average = calculateAverage(modules);
            res.send(average);

    } catch (error) {
        return res.status(400).send(error.message);
    }

    res.status(201).send(student);
})
router.get('/', async(req, res) => {
    let students = await Student.find();
    res.status(200).send(students);
})

router.get('/id/:id', async(req, res) => {

        let student = await Student.findById(req.params.id)

        if (!student)
            return res.status(404).send('Student is not found')
        res.status(200).send(student);
    })
    /*
    // search via active = true
router.get('/active', async(req, res) => {
        let students = await Student.find({ active: 'true' });
        res.status(200).send(students);
    })
    // search via active = false
router.get('/not/active/size/:size/page/:page', async(req, res) => {
        let students = await Student.find({ active: 'false' })
            .skip((req.params.page - 1) * req.params.size)
            .limit(req.params.size);

        res.status(200).send(students);
    })
    // search via age between two limits
    //operators $eq $neq $in $nin $gt $gte $lt $lte
router.get('/age/min/:min/max/:max', async(req, res) => {
    let students = await Student.find({ age: { $gte: req.params.min, $lt: req.params.max } });
    res.status(200).setHeader('elements-number', students.length).send(students);
});
*/
router.delete('/id/:id', async(req, res) => {

    let student = await Student.findByIdAndRemove(req.params.id);
    if (!student)
        return res.status(404).send('Student is not found')
    res.status(200).send(student);
})

router.put('/id/:id', async(req, res) => {

    let student = await Student.findById(req.params.id);
    if (!student)
        return res.status(404).send('Student is not found')
    student = _.merge(student, req.body);
    await student.save();
    res.status(200).send(student);
})

router.get('/calcul', (req, res) => {
    const result = students.map(student => {
      const { name, modules } = student;
      const bestModule = modules.reduce((a, b) => a.note > b.note ? a : b);
      const worstModule = modules.reduce((a, b) => a.note < b.note ? a : b);
      return {
        name,
        bestModule,
        worstModule
      };
    });
    res.json(result);
  });
  router.get('/average', (req, res) => {
    const totalModules = students.reduce((acc, student) => {
      return acc.concat(student.modules);
    }, []);
    const totalGrades = totalModules.reduce((acc, module) => {
      return acc + module.grade;
    }, 0);
    const averageGrade = totalGrades / totalModules.length;
    res.json({ average: averageGrade });
  }); 
 
  
  
function calculateAverage(modules) {
    let total = 0;
    for (let i = 0; i < modules.length; i++) {
      total += modules[i].note;
    }
    let average = total / modules.length;
    return average;
  }
  
module.exports = router;