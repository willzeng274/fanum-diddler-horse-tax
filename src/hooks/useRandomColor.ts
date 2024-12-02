import { useState, useEffect } from 'react'

export function useRandomColor() {
  const [color, setColor] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      const randomColor = Math.floor(Math.random()*16777215).toString(16)
      setColor(`#${randomColor}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return color
}

