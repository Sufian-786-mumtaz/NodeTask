const express = require('express');
const { upload } = require("../utils/multer")
const {response} = require("../config/response")
const fileUploaderController = require("../controllers/fileUpload.controller")
const router = express.Router();
router.post('/csv', upload.single('file'), fileUploaderController.fileUploader);
router.get('/generate', fileUploaderController.generateFile);

// router.post('/login', authController.login);

module.exports = router;

