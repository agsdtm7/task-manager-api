const mongoose = require('mongoose')
const validator = require('validator')

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true,
//         validate(value) {
//             if (value.match(/(\w+)/g).length < 2 == true) {
//                 throw new Error('Description is too short.')
//             }
//         }
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     owner: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'User' // reference to the model, see last 2 lines in user model
//     }
// })

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.match(/(\w+)/g).length < 2 == true) {
                throw new Error('Description is too short.')
            }
        }
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // reference to the model, see last 2 lines in user model
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task