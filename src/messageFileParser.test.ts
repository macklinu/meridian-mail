import * as crypto from 'node:crypto'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as process from 'node:process'

import { Settings } from 'luxon'
import { beforeAll, expect, test } from 'vitest'

import { messageFileParser } from './messageFileParser'

function dataPath(fileName?: string) {
  return path.join(process.cwd(), 'src/data', fileName ?? '')
}

beforeAll(() => {
  // @ts-expect-error - crypto is not available in the browser; mocking for tests
  window.crypto = crypto

  Settings.defaultZone = 'utc'
})

test.each(fs.readdirSync(dataPath()))(
  'messageFileParser("src/data/%s")',
  async (fileName) => {
    const testFile = new File(
      [fs.readFileSync(dataPath(fileName), 'utf-8')],
      fileName,
    )

    expect(await messageFileParser(testFile)).toMatchSnapshot({
      id: expect.any(String),
      file: expect.any(File),
    })
  },
)
