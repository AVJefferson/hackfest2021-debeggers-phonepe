exports.smsBodyParser = function (body) {
  if (typeof body == 'string') {
    let lines = body.split('\n')
    if (lines[0] == 'Payment')
      return { to: lines[1], amount: parseInt(lines[2]), type: 'Payment' }
    else if (lines[0] == 'OTP') return { otp: parseInt(lines[1]), type: 'OTP' }
  }
}

exports.reqBodyParser = function (body) {
  if (body.type === 'Payment')
    return {
      type: body.type,
      amount: parseInt(body.amount),
      to: body.to
    }
  else if (body.type === 'OTP')
    return {
      type: body.type,
      otp: parseInt(body.otp)
    }
}
