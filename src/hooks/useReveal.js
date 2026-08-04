import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* .rv 클래스가 붙은 요소를 뷰포트 진입 시 노출시킵니다.
   prefers-reduced-motion 이 켜져 있으면 즉시 노출합니다. */
export function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.rv:not(.seen)'))
    if (!els.length) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('seen'))
      return
    }

    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('seen')
          io.unobserve(e.target)
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
}
