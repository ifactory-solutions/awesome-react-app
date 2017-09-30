#!/usr/bin/env node
const child_process = require('child-process-promise')
const chalk = require('chalk')
const inquirer = require('inquirer')
const emoji = require('node-emoji')
const handlers = require('./handlers')

const spawn = child_process.spawn
const exec = child_process.exec
const actions = handlers.actions
const questions = handlers.questions

const terminalOpts = {
  shell: true,
  stdio:'inherit'
}

const args = process.argv.slice(2)
const folderName = args[0]

const createApp = folderName => {
  spawn('create-react-app', [folderName], terminalOpts)
    .then(showQuestions)
}

const showQuestions = () => inquirer.prompt(questions).then(handleOptions)

// TODO: Add error message
const showCreateAppError = () => console.log('Error')

const handleOptions = answers => {
  const cwd = process.cwd()

  const filteredActions = actions
    .filter(action => Object.keys(answers).includes(action.type) && answers[action.type])
    .map( action => action.func)

  filteredActions.push(showEndProcessText)

  filteredActions
    .reduce( (promise, func) => {
      return promise
        .then(() => func(cwd, folderName))
    }, Promise.resolve())
}

const showEndProcessText = () => {
  return new Promise( (resolve, reject) => {
    console.log('\n\n')
    console.log(`        Everything is set! Good work for you ${emoji.get('heartpulse')}`)
    console.log(`        Made by ${chalk.red('Ifactory Solutions')} ${emoji.get('factory')}`)
    console.log(`        ${emoji.get('link')}   ${chalk.blue('http://www.ifactory.com.br')}`)
    console.log('\n\n')
    resolve()
  })
}

createApp(folderName)
