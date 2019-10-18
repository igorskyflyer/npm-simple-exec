const app = require('../index')

const MAX_TIMEOUT = 15000

describe('executeSync()', () => {
	test('execute a command and return the output', () => {
		const result = app.executeSync('npm --version')
		expect(result.output).not.toHaveLength(0)
	})

	test('execute a non existing command and return an error', () => {
		const result = app.executeSync('npm --versionsomda')

		if (result.error) {
			expect(result.error).not.toHaveLength(0)
		}
	})
})

describe('executeCallback()', () => {
	test('execute a command and return the output', () => {
		app.executeCallback('npm --version', result => {
			expect(result.output).not.toHaveLength(0)
		})
	})

	test('execute a non existing command and return an error', () => {
		app.executeCallback('npm --versionsomda', result => {
			if (result.error) {
				expect(result.error).not.toHaveLength(0)
			}
		})
	})
})

describe('execute()', () => {
	test(
		'execute a command and return the output',
		async done => {
			app.execute('npm --version').then(result => {
				expect(result).not.toHaveLength(0)
				done()
			})
		},
		MAX_TIMEOUT
	)

	test(
		'execute a non existing command and return an error',
		async done => {
			app
				.execute('npm --versionsomda')
				.then(result => {})
				.catch(error => {
					expect(error).not.toHaveLength(0)
					done()
				})
		},
		MAX_TIMEOUT
	)
})
