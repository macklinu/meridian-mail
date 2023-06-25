import { useState } from 'react'
import { MessageView } from './MessageView'

const App = () => {
  const [files, setFiles] = useState<File[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  return (
    <main className="container mx-auto">
      <section className="p-8 space-y-4">
        <input
          type="file"
          accept=".msg"
          multiple
          onChange={(event) => {
            const files = Array.from(event.target.files || [])
            setFiles(files)
          }}
        />
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col col-span-1">
            {files.map((file) => (
              <div
                className="aria-selected:bg-blue-200 py-2"
                aria-selected={file === selectedFile}
                onClick={() => setSelectedFile(file)}
              >
                {file.name}
              </div>
            ))}
          </div>
          <div className="col-span-2">
            {selectedFile && <MessageView file={selectedFile} />}
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
