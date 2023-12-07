const Form = require('../models/form')
const Response = require('../models/response')

exports.createForm = async (req, res) => {
    try {
        const formData = req.body;

        const newForm = new Form({
            title: formData.title,
            headerImg: formData.headerImg,
            questions: formData.allQuestions.map((question) => {
                if (question.type === 'cloze') {
                    return {
                        type: 'cloze',
                        text: question.text,
                        image: question.image || '',
                        clozeData: {
                            options: question.options,
                            answer: question.answer || '',
                        },
                    };
                } else if (question.type === 'categorize') {
                    return {
                        type: 'categorize',
                        text: question.text,
                        image: question.image || '', 
                        categoryData: {
                            categories: question.categoryData.categories,
                            items: question.categoryData.items,
                            itemDetail: question.categoryData.itemDetail.map((detail) => ({
                                category: detail.category,
                                value: detail.value,
                            })),
                        },
                    };
                } else if (question.type === 'comprehension') {
                    return {
                        type: 'comprehension',
                        image: question.image || '',
                        comprehensionData: {
                            passage: question.passage,
                            questions: question.questions, 
                        },
                    };
                }
              
                return {}; 
            }),
        });
        const savedForm = await newForm.save();
        res.status(200).json({ success: true, savedForm });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })
    }
}

exports.submitForm = async (req, res) => {
    try {
        const formId = req.params.formId;
        const answers = req.body.answers;
        const userId = req.user.id

        const response = new Response({
            formId: formId,
            userId: userId,
            answers: answers,
        });

        await response.save();
        res.status(200).json({ success: true, message: 'Form submitted successfully!' });

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}

exports.getAllForm = async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json({ success: true, forms });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}