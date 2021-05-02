const { generateCoin } = require("../helpers/tokens")

exports.createCoin = function(req, res) {
  let body = req.body
  let coin = generateCoin({
    to: body.to,
    from: body.from,
    value: body.value
  })

  res.json({
    coin
  })

}
