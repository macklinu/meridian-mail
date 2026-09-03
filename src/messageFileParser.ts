import { DateTime } from 'luxon'
import { z } from 'zod'

export const END_HEADER_LINE = '-------------'
export const DATE_FORMAT = 'ccc LLL dd, yyyy h:mm'

const headersSchema = z.object({
  from: z.string().nonempty(),
  to: z.string().nonempty(),
  subject: z.string().nonempty(),
  date: z
    .string()
    .nonempty()
    .transform((date) => DateTime.fromFormat(date, DATE_FORMAT).toJSDate()),
})

export type MessageFile = {
  id: string
  file: File
  headers: z.infer<typeof headersSchema>
  body: string
}

export async function messageFileParser(msgFile: File): Promise<MessageFile> {
  const text = await msgFile.text()

  const headers: Record<string, string> = {}
  const body = []

  let endHeaders = false

  for (const line of text.split(/\r?\n/)) {
    if (line === END_HEADER_LINE) {
      endHeaders = true
      continue
    }

    if (endHeaders) {
      body.push(line)
    } else {
      const match = line.match(/(\w+):\s?(.*)/i)
      if (!match) {
        throw new Error("Invalid header line: '" + line + "'")
      }
      const [, key, value] = match
      headers[key.toLowerCase()] = value
    }
  }

  return {
    id: window.crypto.randomUUID(),
    file: msgFile,
    body: body.join('\n'),
    headers: headersSchema.parse(headers),
  }
}
