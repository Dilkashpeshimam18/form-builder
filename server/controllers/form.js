const Form = require('../models/form')
const Response = require('../models/response')

exports.createForm = async (req, res) => {
    try {
        const formData = req.body;

        const newForm = new Form({
            title: formData.title,
            headerImage: formData.headerImage,
            questions: formData.questions,
        });

        await newForm.save((err, savedForm) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ success: true, savedForm });
        });
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

exports.getAllForm=async(req,res)=>{
    try{
        const forms = await Form.find();
        res.status(200).json({success:true,forms});
    }catch(err){
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}