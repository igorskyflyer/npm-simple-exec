// Author: Igor Dimitrijević (@igorskyflyer)

import { exec, execSync } from 'node:child_process'
import type { ExecCallback } from './ExecCallback.mjs'
import type { ExecResult } from './ExecResult.mjs'

/**
 * Synchronously runs the specified command.
 * @param command Command to run.
 * @throws Will throw an error if no command is provided.
 * @returns Returns the standard output.
 */
export function executeSync(command: string): ExecResult {
	if (typeof command !== 'string') {
		throw 'Error: No command provided.'
	}

	try {
		const output: string = execSync(command).toString().trim()
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
 * @param command Command to run.
 * @param callback The function to call after the NPM function is executed.
 * @throws Will throw an error if no command is provided.
 */
export function executeCallback(command: string, callback: ExecCallback): void {
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
 * @param command Command to run.
 * @throws Will throw an error if no command is provided.
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
 * Asynchronously and in parallel runs the specified commands.
 * @param args Commands to run, either a string array, e.g. (['command', 'command', 'command'], ) or rest arguments, strings also, e.g. ('command', 'command', 'command')
 * @throws Will throw an error if any of the commands is not defined.
 */
export async function executeParallel(...args: string[]): Promise<string[]> {
	if (!args) {
		throw 'Error: No arguments provided.'
	}

	const commands: Promise<string>[] = []

	if (typeof args === 'string') {
		const argsCount = arguments.length

		for (let i = 0; i < argsCount; i++) {
			commands.push(execute(arguments[i]))
		}
	} else if (Array.isArray(args)) {
		const arrayCount: number = args.length

		for (let i = 0; i < arrayCount; i++) {
			commands.push(execute(args[i]))
		}
	}

	return Promise.all(commands)
}
