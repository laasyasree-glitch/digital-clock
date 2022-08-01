import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
    timerLimitInMinutes: 25,
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state

    if (timeElapsedInSeconds === timerLimitInMinutes * 60) {
      this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
      clearInterval(this.timerID)
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  startOrPause = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning) {
      clearInterval(this.timerID)
    } else {
      this.timerID = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onReset = () => {
    this.setState({
      isTimerRunning: false,
      timeElapsedInSeconds: 0,
      timerLimitInMinutes: 25,
    })
    clearInterval(this.timerID)
  }

  onDecrement = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncrement = () =>
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))

  render() {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const text = isTimerRunning ? 'Running' : 'Paused'

    const formattedTime = this.getElapsedSecondsInTimeFormat()
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="main">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">{formattedTime}</h1>
              <p className="timer-state">{text}</p>
            </div>
          </div>
          <div>
            <div className="card">
              <button
                className="button"
                type="button"
                onClick={this.startOrPause}
              >
                <img src={startOrPauseImageUrl} alt={startOrPauseAltText} />
                {isTimerRunning ? 'Pause' : 'Start'}
              </button>
            </div>
            <div className="card">
              <button className="button" type="button" onClick={this.onReset}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p>Reset</p>
              </button>
            </div>
            <div className="card">
              <p className="timer">Set timer Limit</p>
              <div>
                <button
                  type="button"
                  className="button btn"
                  disabled={isButtonsDisabled}
                  onClick={this.onIncrement}
                >
                  +
                </button>
                <p className="timer">{timerLimitInMinutes}</p>
                <button
                  type="button"
                  className="button btn"
                  disabled={isButtonsDisabled}
                  onClick={this.onDecrement}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
