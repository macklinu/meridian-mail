import { useState } from 'react'
import { MessageView } from './MessageView'

const App = () => {
  const [files, setFiles] = useState<File[]>([])

  return (
    <main className="container mx-auto">
      <section className="p-8 space-y-4">
        <input
          type="file"
          accept=".msg"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) {
              setFiles([file])
            }
          }}
        />
        {files.map((file, index) => (
          <MessageView key={`${file.name}-${index}`} file={file} />
        ))}
      </section>
    </main>
  )
}

export default App
