exports.generateOTP = function() {
  return Math.floor(Math.random() * 10000)
}

exports.generateCoin = function({ to, from, value=10 }) {
  const jwt = require('jsonwebtoken')
  if (value > 10000)
    throw new Error('Token limit exceeded')

  return jwt.sign({to, frm: from, val: value, }, process.env.JWT_SECRET, {
    expiresIn: '10d',
    subject: to
  })
}
