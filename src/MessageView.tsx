import { useState, useEffect } from 'react'

export type MessageViewProps = {
  file: File
}

export const MessageView = ({ file }: MessageViewProps) => {
  const [text, setText] = useState('')

  useEffect(() => {
    file.text().then((text) => setText(text))
  }, [file])

  return <pre className="whitespace-break-spaces">{text}</pre>
}
