
import { useEffect, useState } from 'react'

export function Toast({ message, type='info' }: { message?: string; type?: 'info'|'success'|'error' }) {
  const [show, setShow] = useState(Boolean(message))
  useEffect(()=>{
    setShow(Boolean(message));
    if (message) {
      const t = setTimeout(()=>setShow(false), 2500);
      return ()=>clearTimeout(t);
    }
  }, [message])
  if (!show || !message) return null
  const colors = type==='success' ? 'bg-green-600/90' : type==='error' ? 'bg-red-600/90' : 'bg-neutral-800/90'
  return (
    <div role="status" aria-live="polite" className={`fixed bottom-4 right-4 ${colors} text-white px-4 py-2 rounded-xl shadow-lg border border-neutral-700`}>
      {message}
    </div>
  )
}
