
const fs = require('fs')
const path = require('path')
const debug = require('debug')('payoff:data')

const TRANSACTION_STATUS_LIST = {
  SUCCESS: 'success',
  FAILURE: 'failure',
  PENDING: 'pending'
}

const USERS = {
  '+917030607235': { upi: '7030607235@ybl', phone: '+917030607235', otp: null, money: 1000000 },
  '+918210223091': { upi: '8210223091@ybl', phone: '+918210223091', otp: null, money: 10000 },
  '+919007520263': { upi: '9007520263@ybl', phone: '+918210223091', otp: null, money: 20000 },
  '+917012475375': { upi: '7012475375@ybl', phone: '+918210223091', otp: null, money: 24999 }
}

let root = path.join(__dirname, '../..', 'data')

let paths = {
  users: path.resolve(root, 'users.json'),
  transactions: path.resolve(root, 'transactions.json'),
  tokenTransactions: path.resolve(root, 'transaction-tokens.json')
}

exports.store = async function (data, type) {
  let str = JSON.stringify({ [type]: data })
  try {
    let res = await fs.writeFile(paths[type], str)
  } catch (err) {
    debug(err)
  }
}

const TRANSACTIONS = []

module.exports = {
	TRANSACTION_STATUS_LIST, USERS, TRANSACTIONS
}
