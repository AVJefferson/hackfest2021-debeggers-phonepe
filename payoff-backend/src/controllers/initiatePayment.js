const debug = require('debug')('payoff:controller:util:initiatePayment')

const twiml = require('../helpers/twiml');
const { TRANSACTION_STATUS_LIST,
  USERS,
  TRANSACTIONS } = require('../helpers/data');
const { sendSMS } = require('../helpers/sms');
const { generateOTP } = require('../helpers/tokens');


async function initiatePayment(from, res, transactionData) {
  // find the user from the number
  let upiId = USERS[from].upi,
    phoneNumber = from;
  // use the user's number from db to send otp
  USERS[from].otp = generateOTP();
  try {
    let msg = await sendSMS({
      body: 'DO NOT SHARE WITH ANYONE.\nOTP: ' + USERS[from].otp,
      to: phoneNumber
    });
  } catch (err) {
    debug(err);
    let xmlBody = 'Hm, OTP was not sent.\n' + err.message;
    let twimlXML = twiml.paymentResponse(xmlBody, TRANSACTION_STATUS_LIST.FAILURE);
    res.send(twimlXML.toString());
  }
  // create a log in transactions
  // with status initiated and otp
  TRANSACTIONS.push({
    status: TRANSACTION_STATUS_LIST.PENDING,
    otp: USERS[from].otp,
    to: transactionData.to,
    from,
    amount: transactionData.amount
  });

  res.end()
}

exports.TRANSACTIONS = TRANSACTIONS

exports.initiatePayment = initiatePayment;
