import { Children, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'

type SlideNavigation = {
  activeId: string
  activeIndex: number
  total: number
  goTo: (index: number) => void
  goToId: (id: string) => void
}

const SlideNavigationContext = createContext<SlideNavigation | null>(null)

export function useSlideNavigation() {
  const value = useContext(SlideNavigationContext)
  if (!value) throw new Error('useSlideNavigation must be used inside SlideDeck')
  return value
}

type Props = { children: ReactNode; header: ReactNode }

export default function SlideDeck({ children, header }: Props) {
  const slides = Children.toArray(children)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeRef = useRef(0)
  const previousTotalRef = useRef(slides.length)
  const lockedRef = useRef(false)
  const wheelTotalRef = useRef(0)
  const renderedActiveId = document.querySelector<HTMLElement>(`[data-slide-index="${activeRef.current}"]`)?.querySelector<HTMLElement>('[id]')?.id

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(slides.length - 1, index))
    activeRef.current = next
    setActiveIndex(next)
    const node = document.querySelector<HTMLElement>(`[data-slide-index="${next}"]`)
    const id = node?.querySelector<HTMLElement>('[id]')?.id ?? 'top'
    if (window.location.hash !== `#${id}`) window.history.pushState({ slideIndex: next }, '', `#${id}`)
    lockedRef.current = true
    window.setTimeout(() => { lockedRef.current = false }, 620)
  }, [slides.length])

  const goToId = useCallback((id: string) => {
    const target = document.getElementById(id)
    const slide = target?.closest<HTMLElement>('[data-slide-index]')
    if (slide) goTo(Number(slide.dataset.slideIndex))
  }, [goTo])

  useEffect(() => {
    if (previousTotalRef.current === slides.length) return
    previousTotalRef.current = slides.length
    if (!renderedActiveId) return
    const normalizedId = renderedActiveId.replace(/-(?:more|\d+)$/, '')
    const target = document.getElementById(renderedActiveId) ?? document.getElementById(normalizedId)
    const slide = target?.closest<HTMLElement>('[data-slide-index]')
    if (slide) {
      activeRef.current = Number(slide.dataset.slideIndex)
      setActiveIndex(activeRef.current)
    }
  }, [renderedActiveId, slides.length])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const link = target.closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      const id = decodeURIComponent(link.hash.slice(1))
      if (!document.getElementById(id)) return
      event.preventDefault()
      goToId(id)
    }
    const onPopState = () => {
      const id = decodeURIComponent(window.location.hash.slice(1)) || 'top'
      const slide = document.getElementById(id)?.closest<HTMLElement>('[data-slide-index]')
      if (slide) {
        activeRef.current = Number(slide.dataset.slideIndex)
        setActiveIndex(activeRef.current)
      }
    }
    const onWheel = (event: WheelEvent) => {
      if (event.target instanceof Element && event.target.closest('[data-native-scroll]')) return
      event.preventDefault()
      if (lockedRef.current || Math.abs(event.deltaY) < 4) return
      wheelTotalRef.current += event.deltaY
      if (Math.abs(wheelTotalRef.current) < 34) return
      const direction = Math.sign(wheelTotalRef.current)
      wheelTotalRef.current = 0
      goTo(activeRef.current + direction)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      const target = event.target
      if (target instanceof HTMLElement && (target.isContentEditable || target.matches('input,textarea,select,[role="tab"]'))) return
      let next: number | undefined
      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') next = activeRef.current + 1
      else if (event.key === 'ArrowUp' || event.key === 'PageUp') next = activeRef.current - 1
      else if (event.key === 'Home') next = 0
      else if (event.key === 'End') next = slides.length - 1
      if (next === undefined) return
      event.preventDefault()
      if (!lockedRef.current) goTo(next)
    }
    let touchStartY = 0
    const onTouchStart = (event: TouchEvent) => { touchStartY = event.changedTouches[0]?.clientY ?? 0 }
    const onTouchEnd = (event: TouchEvent) => {
      const delta = touchStartY - (event.changedTouches[0]?.clientY ?? touchStartY)
      if (Math.abs(delta) > 55 && !lockedRef.current) goTo(activeRef.current + Math.sign(delta))
    }
    document.addEventListener('click', onClick)
    document.addEventListener('wheel', onWheel, { passive: false })
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('popstate', onPopState)
    onPopState()
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('wheel', onWheel)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('popstate', onPopState)
    }
  }, [goTo, goToId, slides.length])

  const activeId = useMemo(() => {
    const slide = document.querySelector<HTMLElement>(`[data-slide-index="${activeIndex}"]`)
    return slide?.querySelector<HTMLElement>('[id]')?.id ?? 'top'
  }, [activeIndex])
  const value = useMemo(() => ({ activeId, activeIndex, total: slides.length, goTo, goToId }), [activeId, activeIndex, goTo, goToId, slides.length])

  return (
    <SlideNavigationContext.Provider value={value}>
      {header}
      <main className="deck-viewport" aria-label="WearGlu 项目介绍">
        <div className="deck-track" style={{ transform: `translate3d(0, -${activeIndex * 100}dvh, 0)` }}>
          {slides.map((child, index) => (
            <div className={`deck-slide ${index === activeIndex ? 'is-current' : ''}`} data-slide-index={index} aria-hidden={index !== activeIndex} key={index}>{child}</div>
          ))}
        </div>
      </main>
      <div className="deck-controls" aria-label="页面切换">
        <span className="deck-count">{String(activeIndex + 1).padStart(2, '0')} <i>/</i> {String(slides.length).padStart(2, '0')}</span>
        <button type="button" aria-label="上一页" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0}><ArrowUp size={18} /></button>
        <button type="button" aria-label="下一页" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === slides.length - 1}><ArrowDown size={18} /></button>
      </div>
      <nav className="deck-dots" aria-label="页面进度">
        {slides.map((_, index) => <button key={index} type="button" aria-label={`第 ${index + 1} 页`} aria-current={index === activeIndex ? 'step' : undefined} onClick={() => goTo(index)} />)}
      </nav>
    </SlideNavigationContext.Provider>
  )
}
