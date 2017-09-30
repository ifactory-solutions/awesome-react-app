const child_process = require('child-process-promise')
const emoji = require('node-emoji')
const chalk = require('chalk')

const exec = child_process.exec

const question = {
  name: 'editorconfig',
  type: 'confirm',
  message: 'Do you would like to include editorconfig file?'
}

const func = (cwd, folderName) => {
  console.log('\n\n')
  console.log(`${emoji.get('fire')}  ${chalk.cyan('Adding Editor Config file')} ${emoji.get('fire')}`)
  console.log('\n\n')

  return exec(`cp ${__dirname}/.editorconfig ${cwd}/${folderName}`)
}

const action = {
  type: 'editorconfig',
  func: func,
}

module.exports = {
  action: action,
  question: question,
}
