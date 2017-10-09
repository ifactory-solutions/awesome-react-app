#!/usr/bin/env node
const awesomeCreateApp = require('./awesomeCreateApp')
const chalk = require('chalk')
const emoji = require('node-emoji')
const Raven = require('raven')

Raven.config('https://0a378170ac02430383fad7bfa98cb2fa:269f4e92354441d08c94463323c56ef2@sentry.io/227839').install()

const missingAppNameError = `
${emoji.get('boom')}  ${chalk.red('Error')} ${emoji.get('boom')}
${chalk.red('App name must be provided')}`

const argv = require('yargs')
  .usage('$0 <appName>')
  .demandCommand(1, missingAppNameError)
  .help()
  .version('0.0.1')
  .argv

awesomeCreateApp(argv._[0])

