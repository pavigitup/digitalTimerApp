import {Component} from 'react'
import DigitalTimer from './components/DigitalTimer'

import './App.css'

class App extends Component {
  state = {startButton: false, timerLimit: '25:00'}

  render() {
    const {startButton, timerLimit} = this.state
    return (
      <div className="bg-con">
        <DigitalTimer timerLimit={timerLimit} startButton={startButton} />
      </div>
    )
  }
}

export default App
