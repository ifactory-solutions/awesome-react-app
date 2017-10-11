const hooks = [
  require('./git'),
  require('./eslint'),
  require('./editorconfig'),
]

module.exports = {
  questions: hooks.map(hook => hook.question),
  actions: hooks.map(hook => hook.action),
}
