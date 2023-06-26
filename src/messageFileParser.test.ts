import * as crypto from 'node:crypto'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as process from 'node:process'
import { expect, test } from 'vitest'
import { messageFileParser } from './messageFileParser'

// @ts-expect-error - crypto is not available in the browser; mocking for tests
window.crypto = crypto

const dataPath = (fileName?: string) =>
  path.join(process.cwd(), 'src/data', fileName ?? '')

test.each(fs.readdirSync(dataPath()))(
  'msgFileParser("src/data/%s")',
  async (fileName) => {
    const testFile = new File(
      [fs.readFileSync(dataPath(fileName), 'utf-8')],
      fileName
    )

    expect(await messageFileParser(testFile)).toMatchSnapshot({
      id: expect.any(String),
      file: expect.any(File),
    })
  }
)
