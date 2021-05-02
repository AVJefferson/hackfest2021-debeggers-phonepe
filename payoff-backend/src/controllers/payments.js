const debug = require('debug')('payoff:controller:payments')

// helpers
const { TRANSACTION_STATUS_LIST, TRANSACTIONS, USERS } = require('../helpers/data')
const { smsBodyParser, reqBodyParser } = require('../helpers/parser')
const { sendSMS } = require('../helpers/sms')

const { initiatePayment } = require('./initiatePayment')

exports.smsPayment = async function (req, res) {
  res.setHeader('content-type', 'text/xml')

  let body = req.body.Body,
    from = req.body.From,
    transactionData = smsBodyParser(body)

  if (transactionData.type === 'Payment') {
    await initiatePayment(from, res, transactionData)
  } else if (transactionData.type === 'OTP') {
    await completePayment(res, from, transactionData)
  }
}

exports.triggerPayment = async function (req, res) {
  let body = req.body,
    from = body.from,
    transactionData = reqBodyParser(body)

  if (transactionData.type === 'Payment') {
    await initiatePayment(from, res, transactionData)
  } else if (transactionData.type === 'OTP') {
    await completePayment(res, from, transactionData)
  }
}

let getRelevantTransactions = function(from, transactionData) {
  return TRANSACTIONS.filter(
    (t) =>
      t.from === from &&
      t.otp === transactionData.otp &&
      t.status === TRANSACTION_STATUS_LIST.PENDING
  )
}

async function completePayment(res, from, transactionData) {
  // received body contains a token with
  // - transaction id (maybe)
  // - phone number
  // ---
  // find the transaction log
  // verify otp against transaction log
  // let relevantTransactions = getRelevantTransactions(from, transactionData);
  let relevantTransactions = getRelevantTransactions(from, transactionData)

  // if verified, call the complete transaction function
  if (relevantTransactions.length > 0) {
    USERS[from].money -= relevantTransactions[0].amount
    USERS[relevantTransactions[0].to].money += relevantTransactions[0].amount
    try {
      await sendSMS({
        body:
          'Your money was credited\nBALANCE: ' +
          USERS[relevantTransactions[0].to].money,
        to: relevantTransactions[0].to
      })
      await sendSMS({
        body: 'Your money was debited\nBALANCE: ' + USERS[from].money,
        to: from
      })
    } catch (err) {
      debug(err)
      res.end()
    }
  }

  // else report malicious attempt
  else {
    debug('Incorrect OTP or something like that')
  }

  res.end()
}
