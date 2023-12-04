const mongoose = require('mongoose')

const formSchema = mongoose.Schema({
    title: String,
    headerImg: String,
    questions: [
        {
            type: String,
            text: String,
            image: String,
        }
    ],

})

module.exports = mongoose.model('Form', formSchema)