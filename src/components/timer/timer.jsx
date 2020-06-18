import React from "react";
import { Button } from "antd";
import "./timer.scss";

const getMinutes = (timerValue) => Math.trunc(timerValue / 60000).toFixed(0);
const getSeconds = (timerValue) => ((timerValue / 1000) % 60).toFixed(0);
const getMs = (timerValue) => timerValue % 1000;

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerValue: 0,
      timeStart: 0,
      state: "inactive"
    };
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  handleStart = () => {
    const { state } = this.state;

    if (state === "active") {
      this.setState({
        state: "inactive",
        timeStart: 0
      });
      clearInterval(this.timerId);
    } else {
      this.setState({
        state: "active",
        timeStart: Date.now(),
      });
      this.timerId = setInterval(() => {
        this.tick();
      }, 10);
    }
  };

  reset = () => {
    clearInterval(this.timerId);
    this.setState({
      state: "inactive",
      timerValue: 0
    });
  };

  tick() {
    this.setState(({ timeStart, timerValue }) => {
      return { timerValue: Date.now() - timeStart + timerValue };
    });
  }

  render() {
    const { state, timerValue } = this.state;
    const text = state === "active" ? "Pause" : "Start";

    return (
      <>
        <div className="timer-view">{`${getMinutes(timerValue)}min - ${getSeconds(timerValue)}sec - ${getMs(timerValue)}ms`}</div>
        <Button className="timer-btn" onClick={this.handleStart} type="primary">
          {text}
        </Button>
        <Button onClick={this.reset} className="timer-btn" type="primary">
          Reset
        </Button>
      </>
    );
  }
}
