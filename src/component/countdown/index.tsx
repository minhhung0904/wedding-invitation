import { useEffect, useState } from "react"

export const Countdown = ({ targetTime }) => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now()
      const distance = targetTime - now

      if (distance <= 0) {
        clearInterval(timer)
        setTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
        return
      }

      setTime({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetTime])

  return (
    <div className="countdown">
            <div className="time-box">
              <span id="days">{time.days}</span>
              <small>ngày</small>
            </div>
            <div className="time-box">
              <span id="hours">{time.hours}</span>
              <small>giờ</small>
            </div>
            <div className="time-box">
              <span id="minutes">{time.minutes}</span>
              <small>phút</small>
            </div>
            <div className="time-box">
              <span id="seconds">{time.seconds}</span>
              <small>giây</small>
            </div>
          </div> 
  )
}