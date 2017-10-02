#!/usr/bin/env node
const awesomeCreateApp = require('./awesomeCreateApp')

const args = process.argv.slice(2)
const folderName = args[0]

awesomeCreateApp(folderName)
