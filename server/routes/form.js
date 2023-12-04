const express = require('express')
const formController = require('../controllers/form')

const router = express.Router()

router.get('/create-form', formController.createForm)

module.exports = router