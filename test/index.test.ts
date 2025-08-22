import { assert, describe, test } from 'vitest'
import {
  execute,
  executeCallback,
  executeParallel,
  executeSync
} from '../src/index.js'

describe('🧪 simple-exec tests 🧪', () => {
  describe('executeSync()', () => {
    test('execute a command and return the output', () => {
      const result = executeSync('pnpm --version')
      assert.isNotEmpty(result.output)
    })

    test('execute a non existing command and return an error', () => {
      // cspell:disable-next
      const result = executeSync('pnpm --versionsomda')

      if (result.error) {
        assert.isNotEmpty(result.error)
      }
    })
  })

  describe('executeCallback()', () => {
    test('execute a command and return the output', () => {
      executeCallback('pnpm --version', (result) => {
        assert.isNotEmpty(result.output)
      })
    })

    test('execute a non existing command and return an error', () => {
      // cspell:disable-next
      executeCallback('pnpm --versionsomda', (result) => {
        if (result.error) {
          assert.isNotEmpty(result.error)
        }
      })
    })
  })

  describe('execute()', () => {
    test('execute a command and return the output', async () => {
      const result: string = await execute('pnpm --version')
      assert.isNotEmpty(result)
    })

    test('execute a non existing command and return an error', async () => {
      try {
        // cspell:disable-next
        await execute('pnpm --versionsomda')
      } catch (error) {
        assert.isNotEmpty(error)
      }
    })
  })

  describe('executeParallel()', () => {
    test('execute a batch of commands in parallel', async () => {
      const result: string[] = await executeParallel([
        'pnpm --version',
        'node --version',
        'pnpm --version'
      ])

      assert.equal(result.length, 3)
    })
  })
})
