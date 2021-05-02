const router = require('express').Router(),
  controller = require('../controllers/payments')

router.post('/respond', controller.smsPayment);
router.post('/trigger', controller.triggerPayment)

module.exports = router;
