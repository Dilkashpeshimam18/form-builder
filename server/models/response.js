const mongoose = require('mongoose')

const responseSchema = mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
    userId: String,
    answers: [
        {
            questionId: mongoose.Schema.Types.ObjectId,
            answer: String,
        }
    ],

})

module.exports = mongoose.model('Responses', responseSchema)