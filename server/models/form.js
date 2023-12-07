const mongoose = require('mongoose');

const optionSchema = mongoose.Schema({
    text: String,
    isAnswer: Boolean,
});

const mcqSchema = mongoose.Schema({
    id: Number,
    title: String,
    question: String,
    options: [optionSchema],
});


const clozeSchema = mongoose.Schema({

    options: [String],
    answer: String

});

const formSchema = mongoose.Schema({
    title: String,
    headerImg: String,
    questions: [{
        type: {
            type: String,
            enum: ['categorize', 'comprehension', 'cloze'],
        },
        text: String,
        image: String,
        categoryData: {
            categories: [String],
            items: [String],
            itemDetail: [{ category: String, value: String }]
        },
        comprehensionData: {
            passage: String,
            questions: [mcqSchema],
        },
        clozeData: clozeSchema,
    }],
});

module.exports = mongoose.model('Form', formSchema);
