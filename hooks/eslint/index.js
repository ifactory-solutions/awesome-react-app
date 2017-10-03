const child_process = require('child-process-promise')
const fs = require('fs-extra')
const packageJsonHelper = require('./../../utils/packageJsonHelper')
const emoji = require('node-emoji')
const chalk = require('chalk')

const spawn = child_process.spawn
const loadPackageJsonFromPath = packageJsonHelper.loadPackageJsonFromPath
const savePackageJsonIn = packageJsonHelper.savePackageJsonIn

const question = {
  name: 'eslint',
  type: 'confirm',
  message: 'Do you would like to include eslint?'
}

const func = (cwd, folderName) => {
  console.log('\n\n')
  console.log(`${emoji.get('fire')}  ${chalk.cyan('Installing eslint')} ${emoji.get('fire')}`)
  console.log('\n\n')

  return fs.copy(`${__dirname}/.eslintrc.json`, `${cwd}/${folderName}/.eslintrc`)
      .then(() => addEslintFileSuccess(cwd, folderName))
}

const addEslintFileSuccess = (cwd, folderName) => {
  const command = `npm i eslint eslint-config-airbnb babel-eslint --save-dev`

  const terminalOpts = {
    cwd: `${cwd}/${folderName}`,
    shell: true,
    stdio:'inherit'
  }

  return spawn(command, [], terminalOpts)
    .then(() => installPackagesSuccess(cwd, folderName))
}

const installPackagesSuccess = (cwd, folderName) => {
  return loadPackageJsonFromPath(`${cwd}/${folderName}/package.json`)
    .then( data => {
      data.scripts.eslint =  'eslint .'

      return savePackageJsonIn(`${cwd}/${folderName}/package.json`, data)
    })
}

const action = {
  type: 'eslint',
  func: func,
}

module.exports = {
  action: action,
  question: question,
}
