import React from "react";
import "./countdown.scss";
import { Button } from "antd";
import FormInputNumber from "../form-input-number";
import ViewProgress from "../view-progress/view-progress";


class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalValue: 0,
      saveTime: 0,
      srcMinute: 0,
      srcSecond: 0,
      minute: 0,
      second: 0,
      percent: 0,
      isActive: false,
      startTime: 0,
    };
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  onChangeSlider = (value) => {
    const min = Math.trunc(value / 60);
    const sec = value % 60;
    this.setState({
      srcMinute: min,
      srcSecond: sec,
      minute: min,
      second: sec,
      totalValue: value,
      percent: 0,
      saveTime: 0,
    });
  };

  onChangeMin = (value) => {
    if (Number.isNaN(value) || value > 720) return;
    const { srcSecond } = this.state;
    const newTotal = value * 60 + srcSecond;
    this.setState({
      minute: value,
      srcMinute: value,
      totalValue: newTotal,
      percent: 0,
      saveTime: 0,
    });
  };

  onChangeSec = (value) => {
    if (Number.isNaN(value) || value > 59) return;
    const { srcMinute } = this.state;
    const newTotal = srcMinute * 60 + value;
    this.setState({
      second: value,
      srcSecond: value,
      totalValue: newTotal,
      percent: 0,
      saveTime: 0,
    });
  };

  resetCountdown = () => {
    clearInterval(this.intervalId);
    this.setState({
      totalValue: 0,
      startTime: 0,
      percent: 0,
      minute: 0,
      second: 0,
      srcMinute: 0,
      srcSecond: 0,
      isActive: false,
      saveTime: 0,
    });
  };

  startCountdown = () => {
    const { isActive, minute, second, totalValue, saveTime } = this.state;
    if (isActive) {
      clearInterval(this.intervalId);
      this.setState({
        isActive: false,
        startTime: 0,
        saveTime: minute * 60 + second,
      });
    } else {
      this.setState({
        isActive: true,
        startTime: Date.now(),
        saveTime: saveTime || totalValue,
      });
      this.intervalId = setInterval(this.tickCountdown, 1000);
    }
  };

  playAudio = (str = "countdown.mp3") => {
    const audio = new Audio(str);
    audio.play();
  };

  tickCountdown = () => {
    this.setState(({ startTime, totalValue, saveTime, srcMinute, srcSecond }) => {
      const currentTime =
        saveTime - Math.floor((Date.now() - startTime) / 1000);
      if (currentTime <= 0) {
        clearInterval(this.intervalId);
        this.playAudio();
        return {
          minute: srcMinute,
          second: srcSecond,
          percent: 100,
          isActive: false,
        };
      }
      const newPercent = Math.floor(
        ((totalValue - currentTime) * 100) / totalValue
      );
      return {
        minute: Math.trunc(currentTime / 60),
        second: currentTime % 60,
        percent: newPercent,
      };
    });
  };

  render() {
    const {
      minute,
      second,
      isActive,
      percent,
      srcMinute,
      srcSecond,
    } = this.state;
    return (
      <>
        <FormInputNumber
          onChangeMin={this.onChangeMin}
          onChangeSec={this.onChangeSec}
          onChangeSlider={this.onChangeSlider}
          minute={srcMinute}
          second={srcSecond}
          disabled={isActive}
        />
        <ViewProgress minute={minute} second={second} percent={percent} />
        <Button
          type="primary"
          className="countdown-btn"
          onClick={this.startCountdown}
          disabled={!(minute + second)}
        >
          {isActive ? "Pause" : "Play"}
        </Button>
        <Button
          type="primary"
          className="countdown-btn"
          onClick={this.resetCountdown}
        >
          Reset
        </Button>
      </>
    );
  }
}



export default Countdown;
