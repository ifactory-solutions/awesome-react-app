const fs = require('fs')

const loadPackageJsonFromPath = path => {
    return new Promise ((resolve, reject) => {
        fs.readFile(path, (err, rawData) => {
          const data = rawData.toString()

          return err ? reject(err) : resolve(JSON.parse(data))
        })
    })
}

const savePackageJsonIn = (path, data) => {
    return new Promise ((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(data, null, 4), err => {
          return err ? reject(err) : resolve(true)
        })
    })
}

module.exports = {
  loadPackageJsonFromPath: loadPackageJsonFromPath,
  savePackageJsonIn: savePackageJsonIn,
}