const fs = require('fs-extra')
const emoji = require('node-emoji')
const chalk = require('chalk')

const question = {
  name: 'editorconfig',
  type: 'confirm',
  message: 'Do you would like to include editorconfig file?'
}

const func = (cwd, folderName) => {
  console.log('\n\n')
  console.log(`${emoji.get('fire')}  ${chalk.cyan('Adding Editor Config file')} ${emoji.get('fire')}`)
  console.log('\n\n')

  return fs.copy(`${__dirname}/.editorconfig`, `${cwd}/${folderName}/.editorconfig`)
}

const action = {
  type: 'editorconfig',
  func: func,
}

module.exports = {
  action: action,
  question: question,
}
