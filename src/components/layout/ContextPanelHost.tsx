import { useSearchParams } from 'react-router-dom'
import { ContactPanel } from '../contacts/ContactPanel'
import { DealPanel } from '../pipeline/DealPanel'
import { TaskPanel } from '../tasks/TaskPanel'

export function ContextPanelHost() {
  const [searchParams, setSearchParams] = useSearchParams()
  const panel = searchParams.get('panel')
  const id = searchParams.get('id')

  function close() {
    const next = new URLSearchParams(searchParams)
    next.delete('panel')
    next.delete('id')
    setSearchParams(next, { replace: true })
  }

  if (!panel || !id) return null

  if (panel === 'contact') return <ContactPanel contactId={id} onClose={close} />
  if (panel === 'deal') return <DealPanel dealId={id} onClose={close} />
  if (panel === 'task') return <TaskPanel taskId={id} onClose={close} />
  return null
}
