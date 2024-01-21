import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timerLimit: props.timerLimit,
      startButton: props.startButton,
      displayedMinutes: parseInt(props.timerLimit.split(':')[0], 10),
    }
  }

  componentDidMount() {
    this.timeoutId = setInterval(this.startTimer, 1000)
    console.log('component did mount')
  }

  componentWillUnmount() {
    clearInterval(this.timeoutId)
  }

  toggleStart = () => {
    this.setState(prevState => ({startButton: !prevState.startButton}))
  }

  incrementBtn = () => {
    const {timerLimit, startButton} = this.state

    // Only allow increment if the timer is not running
    if (!startButton) {
      const [minutes, seconds] = timerLimit.split(':').map(Number)
      const timeInSeconds = minutes * 60 + seconds + 60 // Add 60 seconds
      const newMinutes = Math.floor(timeInSeconds / 60)
      const newSeconds = timeInSeconds % 60
      const newTimerLimit = `${
        newMinutes < 10 ? `0${newMinutes}` : newMinutes
      }:${newSeconds < 10 ? `0${newSeconds}` : newSeconds}`

      this.setState({
        timerLimit: newTimerLimit,
      })

      const newDisplayedMinutes = Math.floor(timeInSeconds / 60)
      this.setState({
        timerLimit: newTimerLimit,
        displayedMinutes: newDisplayedMinutes,
      })
    }
  }

  decrementBtn = () => {
    const {timerLimit, startButton} = this.state

    // Only allow decrement if the timer is not running and minutes are greater than 0
    if (!startButton && timerLimit !== '00:00') {
      const [minutes, seconds] = timerLimit.split(':').map(Number)
      const timeInSeconds = Math.max((minutes - 1) * 60 + seconds, 0) // Ensure time doesn't go negative
      const newMinutes = Math.floor(timeInSeconds / 60)
      const newSeconds = timeInSeconds % 60
      const newTimerLimit = `${
        newMinutes < 10 ? `0${newMinutes}` : newMinutes
      }:${newSeconds < 10 ? `0${newSeconds}` : newSeconds}`

      this.setState({
        timerLimit: newTimerLimit,
      })
      const newDisplayedMinutes = Math.floor(timeInSeconds / 60)
      this.setState({
        timerLimit: newTimerLimit,
        displayedMinutes: newDisplayedMinutes,
      })
    }
  }

  resetTime = () => {
    this.setState({timerLimit: '25:00'})
    this.setState({startButton: false})
  }

  startTimer = () => {
    this.setState(prevState => {
      if (prevState.startButton) {
        const [minutes, seconds] = prevState.timerLimit.split(':').map(Number)
        let timeInSeconds = minutes * 60 + seconds
        timeInSeconds -= 1
        const newMinutes = Math.floor(timeInSeconds / 60)
        const newSeconds = timeInSeconds % 60
        const newTime = `${newMinutes}:${
          newSeconds < 10 ? `0${newSeconds}` : newSeconds
        }`

        return {
          timerLimit: newTime,
        }
      }

      const [newDisplayedMinutes, seconds] = prevState.timerLimit
        .split(':')
        .map(Number)
      const newTime = `${newDisplayedMinutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`

      return {
        timerLimit: newTime,
        displayedMinutes: newDisplayedMinutes,
      }
    })
  }

  render() {
    const {timerLimit, startButton, displayedMinutes} = this.state
    const [minutes] = timerLimit.split(':').map(Number)

    return (
      <div className="response-design">
        <h1 className="head">Digital Timer</h1>
        <div className="timer-img">
          <div className="time">
            <h1 className="para-e">{timerLimit}</h1>
            <p className="para">{startButton ? 'Running' : 'Paused'}</p>
          </div>
        </div>
        <div className="main-con">
          <div className="start-reset-con">
            <div className="play-con">
              <button
                type="button"
                className="btn-design"
                onClick={this.toggleStart}
              >
                {startButton ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    alt="pause icon"
                    className="play-icon"
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt="play icon"
                    className="play-icon"
                  />
                )}
                <p className="start-para">{startButton ? 'Pause' : 'Start'}</p>
              </button>
            </div>
            <div className="play-con">
              <button
                type="button"
                className="btn-design"
                onClick={this.resetTime}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="play-icon"
                />
                <p className="start-para">Reset</p>
              </button>
            </div>
          </div>
          <p className="limit-para">Set Timer limit</p>
          <div className="start-reset">
            {minutes > 0 ? (
              <button
                type="button"
                className="minus-btn"
                onClick={this.decrementBtn}
              >
                -
              </button>
            ) : (
              <button type="button" className="minus-btn">
                -
              </button>
            )}
            <p className="time-para">{displayedMinutes}</p>
            <button
              type="button"
              className="minus-btn"
              onClick={this.incrementBtn}
            >
              +
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
