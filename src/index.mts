// Author: Igor Dimitrijević (@igorskyflyer)

import { exec, execSync } from 'child_process'

/**
 * @typedef {object} ExecResult
 * @property {string|unknown} error
 * @property {string} output
 */

/**
 * @callback ExecCallback
 * @param {ExecResult} result
 */

/**
 * Synchronously runs the specified command.
 * @since 1.0.0
 * @param {string} command Command to run.
 * @throws Will throw an error if no command is provided.
 * @returns {ExecResult} Returns the standard output.
 */
export function executeSync(command) {
  if (typeof command !== 'string') {
    throw 'Error: No command provided.'
  }

  try {
    const output = execSync(command).toString().trim()

    return { error: '', output }
  } catch (exp) {
    if (exp instanceof Error) {
      return { error: exp.message, output: '' }
    } else {
      return { error: exp, output: '' }
    }
  }
}

/**
 * Asynchronously, with a callback runs the specified command.
 * @since 1.0.0
 * @param {string} command Command to run.
 * @param {ExecCallback} callback The function to call after the NPM function is executed.
 * @throws Will throw an error if no command is provided.
 * @returns {void}
 */
export function executeCallback(command, callback) {
  if (typeof command !== 'string') {
    throw 'Error: No command provided.'
  }

  exec(command, (error, stdout) => {
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
 * @since 1.0.0
 * @param {string} command Command to run.
 * @throws Will throw an error if no command is provided.
 * @returns {Promise<string>}
 */
export async function execute(command) {
  return new Promise((resolve, reject) => {
    executeCallback(command, (result) => {
      if (result.error) {
        reject(result.error)
      } else {
        resolve(result.output)
      }
    })
  })
}

/**
 * Asynchronously and in parallel runs the specified commands.
 * @since 1.1.0
 * @param {...string|string[]} args Commands to run, either a string array, e.g. (['command', 'command', 'command'], ) or rest arguments, strings also, e.g. ('command', 'command', 'command')
 * @throws Will throw an error if any of the commands is not defined.
 * @returns {Promise<string[]>}
 */
export async function executeParallel(args) {
  if (!args) {
    throw 'Error: No arguments provided.'
  }

  const commands = []

  if (typeof args === 'string') {
    // @ts-ignore
    const argsCount = arguments.length

    for (let i = 0; i < argsCount; i++) {
      // @ts-ignore
      commands.push(execute(arguments[i]))
    }
  } else if (args instanceof Array) {
    const arrayCount = args.length

    for (let i = 0; i < arrayCount; i++) {
      commands.push(execute(args[i]))
    }
  }

  return Promise.all(commands)
}
