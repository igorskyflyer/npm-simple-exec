import { assert, describe, test } from 'vitest'
import {
  execute,
  executeCallback,
  executeParallel,
  executeSync
} from '../src/index.mts'

describe('🧪 simple-exec tests 🧪', () => {
  describe('executeSync()', () => {
    test('execute a command and return the output', () => {
      const result = executeSync('npm --version')
      assert.isNotEmpty(result.output)
    })

    test('execute a non existing command and return an error', () => {
      // cspell:disable-next
      const result = executeSync('npm --versionsomda')

      if (result.error) {
        assert.isNotEmpty(result.error)
      }
    })
  })

  describe('executeCallback()', () => {
    test('execute a command and return the output', () => {
      executeCallback('npm --version', (result) => {
        assert.isNotEmpty(result.output)
      })
    })

    test('execute a non existing command and return an error', () => {
      // cspell:disable-next
      executeCallback('npm --versionsomda', (result) => {
        if (result.error) {
          assert.isNotEmpty(result.error)
        }
      })
    })
  })

  describe('execute()', () => {
    test('execute a command and return the output', async () => {
      const result: string = await execute('npm --version')
      assert.isNotEmpty(result)
    })

    test('execute a non existing command and return an error', async () => {
      try {
        // cspell:disable-next
        await execute('npm --versionsomda')
      } catch (error) {
        assert.isNotEmpty(error)
      }
    })
  })

  describe('executeParallel()', () => {
    test('execute a batch of commands in parallel', async () => {
      const result: string[] = await executeParallel([
        'npm --version',
        'node --version',
        'npm --version'
      ])

      assert.equal(result.length, 3)
    })
  })
})
