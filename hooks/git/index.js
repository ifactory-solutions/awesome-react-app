const emoji = require('node-emoji')
const chalk = require('chalk')
const spawn = require('./../../utils/spawnHelper')
const fs = require('fs-extra')

const question = {
  name: 'git',
  type: 'confirm',
  message: 'Would you like to initialize a git repository?'
}


function func (cwd, folderName) {
  const gitExists = fs.pathExistsSync(`${cwd}/${folderName}/.git`)
  const command = 'git init'
  const terminalOpts = {
    cwd: `${cwd}/${folderName}`,
    shell: true,
    stdio:'inherit',
  }

  if (gitExists) {
    console.log('\n\n')
    console.log(chalk.cyan('Git repository already initialized. Skipping...'))
    console.log('\n\n')
    return Promise.resolve(true)
  }
  else {
    console.log('\n\n')
    console.log(`${emoji.get('fire')}  ${chalk.cyan('Initializing git repository')} ${emoji.get('fire')}`)
    console.log('\n\n')
    return spawn(command, [], terminalOpts)
  }
}

module.exports = {
  action: {
    type: 'git',
    func,
  },
  question: question,
}
