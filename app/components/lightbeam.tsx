import { useEffect, useState } from 'react'

const colors = ['blue', 'purple', 'green', 'red', 'yellow']

export function LightBeam({ x, y, width, height, direction }: { x: number; y: number; width: number; height: number; direction: 'up' | 'down' }) {
  const [color, setColor] = useState(colors[Math.floor(Math.random() * colors.length)])
  const [position, setPosition] = useState(y)

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(colors[Math.floor(Math.random() * colors.length)])
    }, Math.random() * 3000 + 2000) // Change color every 2-5 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        const newPosition = direction === 'up' ? prev - 1 : prev + 1
        if (newPosition < -height) return window.innerHeight
        if (newPosition > window.innerHeight) return -height
        return newPosition
      })
      requestAnimationFrame(animate)
    }
    const animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [direction, height])

  return (
    <div 
      className={`absolute bg-gradient-to-b opacity-50 transition-colors duration-1000`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${x}px`,
        top: `${position}px`,
        background: `linear-gradient(to ${direction === 'up' ? 'top' : 'bottom'}, ${color}, transparent)`,
      }}
    />
  )
}

