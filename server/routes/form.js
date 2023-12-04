const express = require('express')
const formController = require('../controllers/form')
const { authenticate } = require('../middleware/auth')

const router = express.Router()

router.get('/all-form',formController.getAllForm)
router.post('/create-form', formController.createForm)
router.post('/submit-form/:formId',authenticate,formController.submitForm)

module.exports = router