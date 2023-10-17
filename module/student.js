const mongoose = require('mongoose');
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const uniqueValidator = require('mongoose-unique-validator');
const student_schema = new mongoose.Schema({

    nom: {
        type: String,
        required: true 
    },
    classe: {
        type: String,
        required: true 
    },
    
     modules:{
            module:{
                type:String,
                required: true 
            },
            note:{
                type :Number,
                required: true 
            }
        }
        
})
student_schema.plugin(uniqueValidator)
const validation_schema = Joi.object({
    nom: Joi.string().min(5).max(50).required(),
    classe: Joi.string().min(5).max(50).required(),
    module: Joi.string().min(5).max(50).required(),
    note: Joi.number().integer().positive().required()
   
        /* note: Joi.number().integer().positive().required(),

        modules: {
            module: Joi.string(),
            note: Joi.string()
        } */
})
student_schema.methods.validate_body = function (body) {
    return validation_schema.validate(body);
}

const Student = mongoose.model('Student', student_schema);
module.exports.Student = Student;