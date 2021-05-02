let MessagingResponse = require('twilio').twiml.MessagingResponse,
  _ = require('underscore')

let notFound = function () {
  let resp = new MessagingResponse()
  resp.message("We did not find the employee you're looking for")
  return resp
}

let singleEmployee = function (employee) {
  let resp = new MessagingResponse()
  let message = resp.message()
  message.body(
    `${employee.fullName}\n${employee.phoneNumber}\n${employee.email}`
  )
  message.media(employee.imageUrl)
  return resp
}

let multipleEmployees = function (employees) {
  let resp = new MessagingResponse()
  let optionsMessage = _.reduce(
    employees,
    function (memo, it) {
      return (memo += `\n${it.option} for ${it.fullName}`)
    },
    ''
  )

  resp.message(
    `We found multiple people, reply with:${optionsMessage}\nOr start over`
  )
  return resp
}

exports.paymentResponse = function (body, status) {
  let res = new MessagingResponse()

  res.message((status ? status.toLocaleUpperCase() : 'SUCCESS\n ') + body)
  return res
}

module.exports.notFound = notFound

module.exports.singleEmployee = singleEmployee

module.exports.multipleEmployees = multipleEmployees
