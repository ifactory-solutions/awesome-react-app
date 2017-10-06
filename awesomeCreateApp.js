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
    .then(() => executeCreateReactApp(folderName, terminalOpts))
    .catch(() => showCreateAppError(`create-react-app is not installed.\n${chalk.blue('info: ')}Install create-react-app using: npm i -g create-react-app`))
}

const executeCreateReactApp = (folderName, terminalOpts) =>
  spawn('create-react-app', [folderName], terminalOpts)
    .then(() => showQuestions(folderName))

const showQuestions = folderName =>
  inquirer.prompt(questions).then(handleOptions.bind(this,folderName))

const showCreateAppError = error => console.log(`${chalk.red('error: ')}${error}`)

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

const checkPackageInstalled = packageName => exec(`${packageName} --version`)

module.exports = createApp
