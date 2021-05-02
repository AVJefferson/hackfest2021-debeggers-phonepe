const twilio = require('twilio')

const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const serverNumber = process.env.TWILIO_PHONE_NUMBER

const client = twilio(accountSid, authToken)

exports.sendSMS = async function (opts, body) {
  try {
    let msg = await client.messages.create({
      body: opts.body || body,
      from: opts.from || serverNumber,
      to: opts.to
    })
    return msg
  } catch (err) {
    debug(err)
    return {}
  }
}
