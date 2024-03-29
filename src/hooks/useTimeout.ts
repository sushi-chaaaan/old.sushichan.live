import 'client-only'

import { useEffect } from 'react'

export function useTimeout(callback: () => void, delay?: number | undefined) {
  useEffect(() => {
    if (!delay && delay !== 0) {
      return
    }

    const timeout = setTimeout(() => callback(), delay)

    return () => clearTimeout(timeout)
  }, [callback, delay])
}
