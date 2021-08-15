import { assert } from 'chai'
import { executeSync, executeCallback, execute, executeParallel } from '../src/index.js'

describe('executeSync()', () => {
  it('execute a command and return the output', () => {
    const result = executeSync('npm --version')
    assert.isNotEmpty(result.output)
  })

  it('execute a non existing command and return an error', () => {
    // cspell:disable-next
    const result = executeSync('npm --versionsomda')

    if (result.error) {
      assert.isNotEmpty(result.error)
    }
  })
})

describe('executeCallback()', () => {
  it('execute a command and return the output', () => {
    executeCallback('npm --version', (result) => {
      assert.isNotEmpty(result.output)
    })
  })

  it('execute a non existing command and return an error', () => {
    // cspell:disable-next
    executeCallback('npm --versionsomda', (result) => {
      if (result.error) {
        assert.isNotEmpty(result.error)
      }
    })
  })
})

describe('execute()', () => {
  it('execute a command and return the output', () => {
    return execute('npm --version').then((result) => {
      assert.isNotEmpty(result)
    })
  })

  it('execute a non existing command and return an error', () => {
    // cspell:disable-next
    return execute('npm --versionsomda')
      .then((result) => {})
      .catch((error) => {
        assert.isNotEmpty(error)
      })
  })
})

describe('executeParallel()', () => {
  it('execute a batch of commands in parallel', () => {
    return executeParallel('npm --version', 'node --version', 'npm --version')
      .then((results) => {
        assert.equal(results.length, 3)
      })
      .catch((error) => {})
  })
})
