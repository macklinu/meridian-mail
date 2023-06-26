import { MessageFile } from './messageFileParser'

export type MessageBodyProps = {
  messageFile: MessageFile
}

export const MessageBody = ({ messageFile }: MessageBodyProps) => {
  return <pre className="whitespace-break-spaces">{messageFile.body}</pre>
}
