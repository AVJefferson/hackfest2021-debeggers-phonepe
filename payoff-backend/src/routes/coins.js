const router = require('express').Router(),
  controller = require('../controllers/coins')

router.post('/', controller.createCoin)

module.exports = router
