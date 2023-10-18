import * as fs from 'node:fs'
import * as path from 'node:path'
import * as process from 'node:process'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'
import { DATE_FORMAT, END_HEADER_LINE } from '../src/messageFileParser.ts'

const generateMessageFile = (fileNumber: number) => {
  const paddedFileNumber = fileNumber.toString().padStart(4, '0')
  return {
    name: `${paddedFileNumber}.msg`,
    content: [
      `From: ${faker.person.fullName()}`,
      `To: Lago`,
      `Subject: ${faker.lorem.sentence()}`,
      `Date: ${DateTime.fromJSDate(faker.date.recent({ days: 365 })).toFormat(
        DATE_FORMAT
      )}`,
      END_HEADER_LINE,
      faker.lorem.paragraphs({ min: 2, max: 8 }, '\n\n'),
    ].join('\r\n'),
  }
}

const messagesDir = (fileName?: string) =>
  path.join(process.cwd(), 'tmp', 'messages', fileName ?? '')

fs.mkdirSync(messagesDir(), { recursive: true })

for (let i = 0; i < 1000; i++) {
  const file = generateMessageFile(i)

  fs.writeFileSync(messagesDir(file.name), file.content, 'utf-8')
}
