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
    <main className='container mx-auto'>
      <section className='space-y-4 p-8'>
        <input
          type='file'
          // @ts-expect-error - webkitdirectory is not in the React input element props type
          webkitdirectory='true'
          accept='.msg'
          multiple
          onChange={async (event) => {
            const files = Array.from(event.target.files ?? [])
            const messageFiles = await Promise.all(
              files
                .filter((file) => file.name.endsWith('.msg'))
                .map((file) => messageFileParser(file)),
            )

            setMessageFiles(messageFiles.sort(sortByDateDesc))
          }}
        />
        <div className='grid grid-cols-3 gap-4'>
          <div className='col-span-1 flex max-h-screen flex-col overflow-auto'>
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
          <div className='col-span-2'>
            {selectedMessageFile && (
              <MessageBody messageFile={selectedMessageFile} />
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
