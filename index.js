#!/usr/bin/env node
const chalk = require('chalk')
const emoji = require('node-emoji')
const Raven = require('raven')
const checkFolderExists = require('./utils/checkFolderExists')
const R = require('ramda')

// "awesomeCreateApp.js" runs some code, so Raven must be already installed
Raven.config('https://0a378170ac02430383fad7bfa98cb2fa:269f4e92354441d08c94463323c56ef2@sentry.io/227839').install()

const awesomeCreateApp = require('./awesomeCreateApp')

const defaultErrorMessage = msg =>
  `${emoji.get('boom')}  ${chalk.red('Error')} ${emoji.get('boom')}
${msg}`

const missingAppNameError = defaultErrorMessage(chalk.red('App name must be provided'))

const folderExistsError = folderName => {
  R.pipe(
    defaultErrorMessage,
    console.log
  )(`${chalk.blue(folderName)} directory already exists`)

  process.exit(1)
}

const argv = require('yargs')
  .usage('$0 <appName>')
  .demandCommand(1, missingAppNameError)
  .help()
  .version('0.0.1')
  .argv

const folderName = argv._[0]

checkFolderExists(folderName)
  .then(() => folderExistsError(folderName))
  .catch(() => awesomeCreateApp(folderName))
