'use client'

import { useEffect, useState } from 'react'
import { Cube } from './components/cube'
import { LightBeam } from './components/lightbeam'
import { ShootingStars } from './components/shooting-stars'
import { StarsBackground } from './components/stars-background'
import { BackgroundBeams } from './components/background-beams'
import { GameUI } from './components/gameui'

export default function Home() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [score, setScore] = useState(0)
  const cubeSize = 50 // Base size of each cube
  
  // Calculate columns and rows including the remainder
  const columns = Math.ceil(dimensions.width / cubeSize)
  const rows = Math.ceil(dimensions.height / cubeSize)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ 
        width: window.innerWidth, 
        height: window.innerHeight 
      })
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const cubes = []
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      cubes.push(
        <Cube 
          key={`${i}-${j}`} 
          size={cubeSize} 
          x={j * cubeSize} 
          y={i * cubeSize} 
        />
      )
    }
  }

  const lightBeams = []
  for (let j = 0; j < columns; j++) {
    if (Math.random() < 0.2) {
      lightBeams.push(
        <LightBeam 
          key={j} 
          x={j * cubeSize} 
          y={Math.random() * dimensions.height} 
          width={cubeSize} 
          height={Math.random() * 200 + 100} 
          direction={Math.random() < 0.5 ? 'up' : 'down'}
        />
      )
    }
  }

  const handleScoreIncrease = () => {
    setScore(prevScore => prevScore + 10)
  }

  return (
    <>
      <div className="fixed inset-0 bg-black overflow-hidden">
        <div className="relative w-full h-full">
          {cubes}
          {lightBeams}
        </div>
      </div>
      <ShootingStars />
      <StarsBackground />
      <BackgroundBeams />
      <GameUI score={score} onScoreIncrease={handleScoreIncrease} />
    </>
  )
}

