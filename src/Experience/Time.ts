import { Clock } from 'three'

type TickCallback = (time: number) => void

const clock = new Clock()
const callbacks: TickCallback[] = []
Tick()

function Tick() {
  window.requestAnimationFrame(Tick)

  const ellapsed = clock.getElapsedTime()
  callbacks.forEach(callback => {
    callback(ellapsed)
  })
}

export function RunOnTick(callback: TickCallback) {
  callbacks.push(callback)
}