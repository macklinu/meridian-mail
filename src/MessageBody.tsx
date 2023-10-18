import { MessageFile } from './messageFileParser'

export type MessageBodyProps = {
  messageFile: MessageFile
}

export function MessageBody({ messageFile }: MessageBodyProps) {
  return <pre className='whitespace-break-spaces'>{messageFile.body}</pre>
}
