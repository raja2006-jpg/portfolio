'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

import './ImageTrail.css'

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b
}

function getLocalPointerPos(e: MouseEvent | TouchEvent, rect: DOMRect) {
  let clientX = 0
  let clientY = 0

  if ('touches' in e && e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX
    clientY = e.touches[0].clientY
  } else if ('clientX' in e) {
    clientX = e.clientX
    clientY = e.clientY
  }

  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  }
}

function getMouseDistance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  const dx = p1.x - p2.x
  const dy = p1.y - p2.y
  return Math.hypot(dx, dy)
}

class ImageItem {
  DOM = { el: null as HTMLElement | null, inner: null as HTMLElement | null }
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 }
  rect: DOMRect | null = null

  constructor(DOM_el: HTMLElement) {
    this.DOM.el = DOM_el
    this.DOM.inner = this.DOM.el.querySelector('.content__img-inner')
    this.getRect()
    this.initEvents()
  }

  initEvents() {
    const resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle)
      this.getRect()
    }
    this.resize = resize
    window.addEventListener('resize', resize)
  }

  resize: (() => void) | null = null

  getRect() {
    this.rect = this.DOM.el?.getBoundingClientRect() ?? null
  }

  destroy() {
    if (this.resize) {
      window.removeEventListener('resize', this.resize)
    }
  }
}

class ImageTrailVariant1 {
  constructor(container: HTMLElement, pointerTarget: HTMLElement = container) {
    this.container = pointerTarget
    this.rafId = null
    this.destroyed = false
    this.DOM = { el: container }
    this.images = [...this.DOM.el.querySelectorAll('.content__img')].map((img) => new ImageItem(img as HTMLElement))
    this.imagesTotal = this.images.length
    this.imgPosition = 0
    this.zIndexVal = 1
    this.activeImagesCount = 0
    this.isIdle = true
    this.threshold = 100
    this.lastMoveTime = performance.now()

    this.mousePos = { x: 0, y: 0 }
    this.lastMousePos = { x: 0, y: 0 }
    this.cacheMousePos = { x: 0, y: 0 }

    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {
      const rect = this.container.getBoundingClientRect()
      this.mousePos = getLocalPointerPos(ev, rect)
      this.lastMoveTime = performance.now()
      // Restart RAF if it was stopped due to idle
      if (this.rafId === null && !this.destroyed) {
        this.rafId = requestAnimationFrame(() => this.render())
      }
    }
    pointerTarget.addEventListener('mousemove', handlePointerMove)
    pointerTarget.addEventListener('touchmove', handlePointerMove)

    const initRender = (ev: MouseEvent | TouchEvent) => {
      const rect = this.container.getBoundingClientRect()
      this.mousePos = getLocalPointerPos(ev, rect)
      this.cacheMousePos = { ...this.mousePos }
      this.rafId = requestAnimationFrame(() => this.render())
      pointerTarget.removeEventListener('mousemove', initRender)
      pointerTarget.removeEventListener('touchmove', initRender)
    }
    pointerTarget.addEventListener('mousemove', initRender)
    pointerTarget.addEventListener('touchmove', initRender)

    this.handlePointerMove = handlePointerMove
    this.initRender = initRender
  }

  container: HTMLElement
  rafId: number | null
  destroyed: boolean
  DOM: { el: HTMLElement }
  images: ImageItem[]
  imagesTotal: number
  imgPosition: number
  zIndexVal: number
  activeImagesCount: number
  isIdle: boolean
  threshold: number
  mousePos: { x: number; y: number }
  lastMousePos: { x: number; y: number }
  cacheMousePos: { x: number; y: number }
  handlePointerMove: (ev: MouseEvent | TouchEvent) => void
  initRender: (ev: MouseEvent | TouchEvent) => void
  lastMoveTime: number

  render() {
    if (this.destroyed) return

    const distance = getMouseDistance(this.mousePos, this.lastMousePos)
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1)
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1)

    if (distance > this.threshold) {
      this.showNextImage()
      this.lastMousePos = { ...this.mousePos }
      this.lastMoveTime = performance.now()
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1
    }

    // Stop RAF when idle for 2s and no active images — restart on next pointer move
    const idleMs = performance.now() - this.lastMoveTime
    if (this.isIdle && idleMs > 2000) {
      this.rafId = null
      return
    }

    this.rafId = requestAnimationFrame(() => this.render())
  }

  showNextImage() {
    ++this.zIndexVal
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0
    const img = this.images[this.imgPosition]

    gsap.killTweensOf(img.DOM.el)
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
          y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2,
        },
        {
          duration: 0.4,
          ease: 'power1',
          x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
          y: this.mousePos.y - (img.rect?.height ?? 0) / 2,
        },
        0,
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power3',
          opacity: 0,
          scale: 0.2,
        },
        0.4,
      )
  }

  destroy() {
    this.destroyed = true
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    this.container.removeEventListener('mousemove', this.handlePointerMove)
    this.container.removeEventListener('touchmove', this.handlePointerMove)
    this.container.removeEventListener('mousemove', this.initRender)
    this.container.removeEventListener('touchmove', this.initRender)
    this.images.forEach((img) => {
      gsap.killTweensOf(img.DOM.el)
      img.destroy()
    })
  }

  onImageActivated() {
    this.activeImagesCount++
    this.isIdle = false
  }

  onImageDeactivated() {
    this.activeImagesCount--
    if (this.activeImagesCount === 0) {
      this.isIdle = true
    }
  }
}

const variantMap = {
  1: ImageTrailVariant1,
} as const

export default function ImageTrail({
  items = [],
  variant = 1,
  triggerRef,
}: {
  items?: string[]
  variant?: number
  triggerRef?: { current: HTMLElement | null }
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return

    // Disable image trail animation on mobile devices for performance
    const isMobile = window.matchMedia('(max-width: 1024px) and (pointer: coarse)').matches
    if (isMobile) return

    const target = triggerRef?.current ?? containerRef.current
    const Cls = (variantMap as Record<number, typeof ImageTrailVariant1>)[variant] || variantMap[1]
    const instance = new Cls(containerRef.current, target)

    return () => {
      instance.destroy()
    }
  }, [variant, items, triggerRef])

  return (
    <div className="content" ref={containerRef}>
      {items.map((url, i) => (
        <div className="content__img" key={`${url}-${i}`}>
          <div className="content__img-inner" style={{ backgroundImage: `url(${url})` }} />
        </div>
      ))}
    </div>
  )
}
