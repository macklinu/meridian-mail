import { useState } from 'react'
import { MessageView } from './MessageView'

const App = () => {
  const [files, setFiles] = useState<File[]>([])

  const handleViewFileClick = async () => {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            accept: {
              'text/plain': ['.txt', '.msg'],
            },
          },
        ],
      })
      const file = await fileHandle.getFile()
      setFiles([file])
    } catch (error) {
      // User may have closed the file picker without selecting a file.
      console.error(error)
    }
  }

  return (
    <main className="container mx-auto">
      <section className="p-8 space-y-4">
        <button
          type="button"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={handleViewFileClick}
        >
          View file
        </button>
        {files.map((file, index) => (
          <MessageView key={`${file.name}-${index}`} file={file} />
        ))}
      </section>
    </main>
  )
}

export default App
