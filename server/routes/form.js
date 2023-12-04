const express = require('express')
const formController = require('../controllers/form')

const router = express.Router()

router.post('/create-form', formController.createForm)
router.post('/submit-form',formController.submitForm)

module.exports = router