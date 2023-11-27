const Router = require('express');

const router = new Router();
const RewiewController = require('../controllers/rewiew_controller');


router.get('/:filename', RewiewController.get)
router.post('/rate', RewiewController.rate);

module.exports = router;
