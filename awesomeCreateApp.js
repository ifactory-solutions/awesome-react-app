const chalk = require('chalk')
const inquirer = require('inquirer')
const emoji = require('node-emoji')
const hooks = require('./hooks')
const spawn = require('./utils/spawnHelper')
const actions = hooks.actions
const questions = hooks.questions

const terminalOpts = {
  shell: true,
  stdio:'inherit'
}

const createApp = folderName => {
  checkPackageInstalled('create-react-app')
  .then(() => 
    spawn('create-react-app', [folderName], terminalOpts)
    .then( () => showQuestions(folderName))
    //TODO ask for install the package
  ).catch(() => console.log(`${emoji.get('scream_cat')} create-react-app is not installed`))
}

const showQuestions = folderName =>
  inquirer.prompt(questions).then(handleOptions.bind(this,folderName))

// TODO: Add error message
const showCreateAppError = () => console.log('Error')

const handleOptions = (folderName, answers) => {
  const cwd = process.cwd()

  const filteredActions = actions
    .filter(action => Object.keys(answers).includes(action.type) && answers[action.type])
    .map( action => action.func)

  filteredActions.push(showEndProcessText)

  filteredActions
    .reduce( (promise, func) => promise .then(() => func(cwd, folderName)), Promise.resolve())
}

const showEndProcessText = () => {
  console.log('\n\n')
  console.log(`        Everything is set! Good work for you ${emoji.get('heartpulse')}`)
  console.log(`        Made by ${chalk.red('Ifactory Solutions')} ${emoji.get('factory')}`)
  console.log(`        ${emoji.get('link')}   ${chalk.blue('http://www.ifactory.com.br')}`)
  console.log('\n\n')
  Promise.resolve()
}

const checkPackageInstalled = packageName => {
  return exec(`npm list -g ${packageName}`)
}

module.exports = createApp
