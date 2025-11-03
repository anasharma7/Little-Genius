import { useEffect, useState } from 'react'
import './ScrollToTop.css'

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button className="scroll-to-top" aria-label="Scroll to top" onClick={scrollTop}>
      ↑
    </button>
  )
}

export default ScrollToTop
