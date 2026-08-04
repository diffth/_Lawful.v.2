import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const revealAll = () => {
      const els = Array.from(document.querySelectorAll('.rv'))
      els.forEach(el => el.classList.add('seen'))
    }

    // 일단 즉시 및 약간의 지연 후 뷰포트 진입 여부와 관계없이 노출 보장 (안 보이는 현상 완벽 방지)
    revealAll()
    const timer = setTimeout(revealAll, 100)

    return () => clearTimeout(timer)
  }, [pathname])
}
