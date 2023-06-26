import { z } from 'zod'

const END_HEADER_LINE = '-------------'

export type MessageFile = {
  id: string
  file: File
  headers: {
    from: string
    to: string
    subject: string
    date: Date
  }
  body: string
}

export const messageFileParser = async (
  msgFile: File
): Promise<MessageFile> => {
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
    headers: z
      .object({
        from: z.string().nonempty(),
        to: z.string().nonempty(),
        subject: z.string().nonempty(),
        date: z
          .string()
          .nonempty()
          .transform((date) => new Date(Date.parse(date))),
      })
      .parse(headers),
  }
}
