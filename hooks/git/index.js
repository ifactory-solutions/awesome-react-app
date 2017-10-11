const emoji = require('node-emoji')
const chalk = require('chalk')
const spawn = require('./../../utils/spawnHelper')

const question = {
  name: 'git',
  type: 'confirm',
  message: 'Would you like to initialize a git repository?'
}


function func (cwd, folderName) {

  console.log('\n\n')
  console.log(`${emoji.get('fire')}  ${chalk.cyan('Initializing git repository')} ${emoji.get('fire')}`)
  console.log('\n\n')

  const command = 'git init'
  const terminalOpts = {
    cwd: `${cwd}/${folderName}`,
    shell: true,
    stdio:'inherit',
  }

  return spawn(command, [], terminalOpts)
}

module.exports = {
  action: {
    type: 'git',
    func,
  },
  question: question,
}
