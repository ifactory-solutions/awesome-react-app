const emoji = require('node-emoji')
const chalk = require('chalk')
const spawn = require('./../../utils/spawnHelper')
const fs = require('fs-extra')
const packageJsonHelper = require('./../../utils/packageJsonHelper')
const loadPackageJsonFromPath = packageJsonHelper.loadPackageJsonFromPath
const savePackageJsonIn = packageJsonHelper.savePackageJsonIn

const question = {
  name: 'commitlint',
  type: 'confirm',
  message: 'Would you like to add commit message linting?'
}


function func (cwd, folderName) {

  console.log('\n\n')
  console.log(`${emoji.get('fire')}  ${chalk.cyan('Adding commitlint')} ${emoji.get('fire')}`)
  console.log('\n\n')

  return fs.copy(`${__dirname}/commitlint.config.js`, `${cwd}/${folderName}/commitlint.config.js`)
    .then(() => {
      const commitlintDependencies = [
        'husky',
        '@commitlint/cli'
      ]
      const command = `npm i ${commitlintDependencies.join(' ')} --save-dev`
      const terminalOpts = {
        cwd: `${cwd}/${folderName}`,
        shell: true,
        stdio:'inherit',
      }

      return spawn(command, [], terminalOpts)
    })
    .then(() => loadPackageJsonFromPath(`${cwd}/${folderName}/package.json`))
    .then((data => {
      data.scripts.commitmsg = 'commitlint -e'
      return savePackageJsonIn(`${cwd}/${folderName}/package.json`, data)
    }))
}

module.exports = {
  action: {
    type: 'git',
    func,
  },
  question: question,
}
