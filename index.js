const childProcess = require('child_process')

/**
 * @typedef {{error: string, output: string}} ExecResult
 */

/**
 * @callback ExecCallback
 * @param {ExecResult} result
 */

/**
 * Synchronously runs the specified command.
 * @param {string} command Command to run.
 * @throws Will throw an error if no command is provided.
 * @returns {ExecResult} Returns the standard output.
 */
function executeSync(command) {
	if (typeof command !== 'string') {
		throw 'Error: No command provided.'
	}

	try {
		const output = childProcess
			.execSync(command)
			.toString()
			.trim()

		return { error: '', output }
	} catch (exp) {
		return { error: exp.message.trim(), output: '' }
	}
}

/**
 * Asynchronously, with a callback runs the specified command.
 * @param {string} command Command to run.
 * @param {ExecCallback} callback The function to call after the NPM function is executed.
 * @throws Will throw an error if no command is provided.
 * @returns {void}
 */
function executeCallback(command, callback) {
	if (typeof command !== 'string') {
		throw 'Error: No command provided.'
	}

	childProcess.exec(command, (error, stdout, stderr) => {
		stdout = stdout.trim()

		if (error) {
			callback({ error: error.message.trim(), output: stdout })
			return
		}

		callback({ error: '', output: stdout })
	})
}

/**
 * Asynchronously runs the specified command.
 * @param {string} command Command to run.
 * @throws Will throw an error if no command is provided.
 * @returns {Promise<string>}
 */
async function execute(command) {
	return new Promise((resolve, reject) => {
		executeCallback(command, result => {
			if (result.error) {
				reject(result.error)
			} else {
				resolve(result.output)
			}
		})
	})
}

module.exports = { executeSync, executeCallback, execute }
