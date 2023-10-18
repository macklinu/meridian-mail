import { MessageFile } from './messageFileParser'

export type MessagePreviewProps = {
  messageFile: MessageFile
  onSelected: (messageFile: MessageFile) => void
  'aria-selected': boolean
}

export function MessagePreview({
  messageFile,
  onSelected,
  'aria-selected': ariaSelected,
}: MessagePreviewProps) {
  return (
    <div
      key={messageFile.id}
      className='py-2 aria-selected:bg-blue-200'
      aria-selected={ariaSelected}
      onClick={() => onSelected(messageFile)}
    >
      <div className='flex flex-col px-2'>
        <div className='flex flex-row justify-between'>
          <p>{messageFile.headers.from}</p>
          <p>
            {messageFile.headers.date.toLocaleString('en', {
              dateStyle: 'short',
            })}
          </p>
        </div>
        <p>{messageFile.headers.subject}</p>
      </div>
    </div>
  )
}
