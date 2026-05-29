import { useEffect } from 'react'

interface JSONLDProps {
  data: Record<string, unknown>
}

export default function JSONLD({ data }: JSONLDProps) {
  useEffect(() => {
    let script = document.getElementById('json-ld-data') as HTMLScriptElement
    if (!script) {
      script = document.createElement('script')
      script.id = 'json-ld-data'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(data)

    return () => {
      const scriptToRemove = document.getElementById('json-ld-data')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [data])

  return null
}
