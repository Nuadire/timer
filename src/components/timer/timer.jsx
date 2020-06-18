import React from "react";
import { Button } from "antd";
import "./timer.scss";

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerValue: 0,
      timerCurrent: 0,
      state: "inactive",
    };
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  handleStart = () => {
    const { state, timerValue, timerCurrent } = this.state;

    if (state === "active") {
      this.setState({
        state: "inactive",
        timeStart: 0,
        timerCurrent: 0,
        timerValue: timerValue + timerCurrent,
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
      timerValue: 0,
      timerCurrent: 0,
    });
  };

  tick() {
    this.setState(({ timeStart }) => {
      return { timerCurrent: Date.now() - timeStart };
    });
  }

  render() {
    const { state, timerCurrent, timerValue } = this.state;
    const resultTimer = timerCurrent + timerValue;
    const text = state === "active" ? "Pause" : "Start";
    const mm = Math.trunc(resultTimer / 60000).toFixed(0);
    const ss = ((resultTimer / 1000) % 60).toFixed(0);
    const ms = (resultTimer % 1000).toFixed(0);

    return (
      <>
        <div className="timer-view">{`${mm}min - ${ss}sec - ${ms}ms`}</div>
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
