const Form = require('../models/form')

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