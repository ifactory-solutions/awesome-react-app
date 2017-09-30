const handlers = [
  require('./eslint'),
  require('./editorconfig'),
]

module.exports = {
  questions: handlers.map(handler => handler.question),
  actions: handlers.map(handler => handler.action),
}