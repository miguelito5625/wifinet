const router = require('express').Router();

const appController = require('../controllers/appController');

router.get('/', appController.indexPage);


//Esto tiene que estar de ultimo de todas las rutas
// router.use(appController.error404);


module.exports = router;