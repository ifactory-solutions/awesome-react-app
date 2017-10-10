const fs = require('fs')

module.exports = path =>
  new Promise((resolve, reject) =>
    fs.access(
      path,
      err => err ? reject() : resolve()
    )
  )
