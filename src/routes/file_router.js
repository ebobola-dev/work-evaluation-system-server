const Router = require('express');

const router = new Router();
const FileController = require('../controllers/file_controller');


router.get('/', FileController.get);
router.post('/upload', FileController.upload);

module.exports = router;
