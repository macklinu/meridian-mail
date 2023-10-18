import { useState } from 'react'
import { MessageBody } from './MessageBody'
import { MessageFile, messageFileParser } from './messageFileParser'
import { MessagePreview } from './MessagePreview'

function sortByDateDesc(a: MessageFile, b: MessageFile) {
  return b.headers.date.valueOf() - a.headers.date.valueOf()
}

export default function App() {
  const [messageFiles, setMessageFiles] = useState<MessageFile[]>([])
  const [selectedMessageFile, setSelectedMessageFile] =
    useState<MessageFile | null>(null)

  return (
    <main className="container mx-auto">
      <section className="p-8 space-y-4">
        <input
          type="file"
          accept=".msg"
          multiple
          onChange={async (event) => {
            const files = Array.from(event.target.files || [])
            const messageFiles = await Promise.all(
              files.map((file) => messageFileParser(file)),
            )

            setMessageFiles(messageFiles.sort(sortByDateDesc))
          }}
        />
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col col-span-1">
            {messageFiles.map((messageFile) => (
              <MessagePreview
                key={messageFile.id}
                messageFile={messageFile}
                aria-selected={messageFile === selectedMessageFile}
                onSelected={(messageFile) =>
                  setSelectedMessageFile(messageFile)
                }
              />
            ))}
          </div>
          <div className="col-span-2">
            {selectedMessageFile && (
              <MessageBody messageFile={selectedMessageFile} />
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
