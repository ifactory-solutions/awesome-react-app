#!/usr/bin/env node
const awesomeCreateApp = require('./awesomeCreateApp')
const chalk = require('chalk')
const emoji = require('node-emoji')

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

