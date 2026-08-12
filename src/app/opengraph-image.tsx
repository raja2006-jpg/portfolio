import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Raja Siddharth M — Full-stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 68, background: '#151525', color: '#f7f7fc' }}>
      <div style={{ display: 'flex', fontSize: 26, fontWeight: 700, color: '#b9b9ff' }}>RS / PORTFOLIO</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}><div style={{ display: 'flex', fontSize: 98, fontWeight: 900, lineHeight: .9, letterSpacing: '-.07em' }}>RAJA</div><div style={{ display: 'flex', fontSize: 98, fontWeight: 900, lineHeight: .9, letterSpacing: '-.07em', color: '#6d6ff5' }}>SIDDHARTH M</div><div style={{ display: 'flex', marginTop: 24, fontSize: 28, color: '#b9bbc8' }}>Full-stack Developer</div></div>
      <div style={{ display: 'flex', fontSize: 23, color: '#67e8dc' }}>Thoughtful web experiences, built with care.</div>
    </div>,
    size,
  )
}
