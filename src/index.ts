// Author: Igor Dimitrijević (@igorskyflyer)

import { exec, execSync } from 'node:child_process'

export interface ExecResult {
  error: string | unknown
  output: string
}

export type ExecCallback = (result: ExecResult) => void

/**
 * Synchronously executes the specified command.
 * @param command Command to execute.
 * @throws Will throw an error if no command is provided.
 * @returns Returns the `ExecResult` object with standard and error outputs.
 */
export function executeSync(command: string): ExecResult {
  if (typeof command !== 'string') {
    throw new Error('No command provided.')
  }

  try {
    const output: string = execSync(command).toString().trim()
    return { error: '', output }
  } catch (exp) {
    if (exp instanceof Error) {
      return { error: exp.message, output: '' }
    }

    return { error: exp, output: '' }
  }
}

/**
 * Asynchronously, with a callback executes the specified command.
 * @param command Command to execute.
 * @param callback The function to call after the command is executed.
 * @throws Will throw an error if no command is provided.
 */
export function executeCallback(command: string, callback: ExecCallback): void {
  if (typeof command !== 'string') {
    throw new Error('No command provided.')
  }

  exec(command, (error, stdout) => {
    const output: string = stdout.trim()

    if (error) {
      callback({ error: error.message.trim(), output })
      return
    }

    callback({ error: '', output })
  })
}

/**
 * Asynchronously executes the specified command.
 * @param command Command to execute.
 * @throws Will throw an error if no command is provided.
 * @returns Returns the standard output.
 */
export async function execute(command: string): Promise<string> {
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
 * Asynchronously and in parallel executes the specified commands.
 * @param commands Commands to execute, rest string parameters, e.g. `executeParallel('command-one', 'command-two', 'command-three')`.
 * @throws Will throw an error if any of the commands causes an error.
 * @returns Returns the standard output of each command.
 */
export async function executeParallel(...commands: string[]): Promise<string[]>
/**
 * Asynchronously and in parallel executes the specified commands.
 * @param commands Commands to execute, a string array, e.g. `executeParallel(['command-one', 'command-two', 'command-three'])`.
 * @throws Will throw an error if any of the commands causes an error.
 * @returns Returns the standard output of each command.
 */
export async function executeParallel(commands: string[]): Promise<string[]>

export async function executeParallel(...args: any[]): Promise<string[]> {
  if (typeof args !== 'string' && !Array.isArray(args)) {
    throw new Error('No arguments provided.')
  }

  const argsCount: number = args.length

  if (argsCount === 0) {
    throw new Error('No valid arguments provided.')
  }

  const executors: Promise<string>[] = []
  const commands: string[] = Array.isArray(args[0]) ? args[0] : args
  const commandsCount: number = commands.length

  for (let i = 0; i < commandsCount; i++) {
    if (typeof commands[i] === 'string') {
      executors.push(execute(commands[i]))
    }
  }

  return Promise.all(executors)
}
