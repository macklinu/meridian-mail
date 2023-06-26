import * as fs from 'node:fs'
import * as crypto from 'node:crypto'
import { expect, test } from 'vitest'
import { messageFileParser } from './messageFileParser'

// @ts-expect-error - crypto is not available in the browser; mocking for tests
window.crypto = crypto

test.each(fs.readdirSync('src/data'))(
  'msgFileParser("src/data/%s")',
  async (fileName) => {
    const testFile = new File(
      [fs.readFileSync(`src/data/${fileName}`, 'utf-8')],
      fileName
    )

    expect(await messageFileParser(testFile)).toMatchSnapshot({
      id: expect.any(String),
      file: expect.any(File),
    })
  }
)
