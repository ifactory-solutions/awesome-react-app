const spawn = require('cross-spawn')

const spawnPromise = (command, args, options) => {
    return new Promise ((resolve, reject) => {
        const execution = spawn(command, args, options)

        execution.on('close', (code) => {
            resolve();
        });

        execution.on('error', (err) => {
            reject();
        });
    })
}

module.exports = spawnPromise;