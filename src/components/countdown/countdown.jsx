import React from "react";
import "./countdown.scss";
import { Button } from "antd";
import { FormInputNumber } from "../form-input-number";
import { ViewProgress } from "../view-progress";
import countdownAudio from "./countdown.mp3";

const MAX_MINUTES = 720;
const GLOBAL_TICK = 50;

const getMinute = (total) => Math.trunc(total / 60000);
const getSecond = (total) => Math.ceil((total / 1000) % 60);
const getPercent = (current, total) => Math.floor(((total - current) * 100) / total);
const getOldSeconds = (srcTotalTime) => (srcTotalTime / 1000) % 60;
const newTotalTimeForMinutes = (oldSeconds, minuts) => (minuts * 60 + oldSeconds) * 1000;
const newTotalTimeForSeconds = (srcTotalTime, oldSeconds, seconds) => srcTotalTime + (seconds - oldSeconds) * 1000;

export class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      srcTotalTime: 0,
      totalTime: 0,
      isActive: false,
    };
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  onChangeSlider = (seconds) => {
    const newTime = seconds * 1000;
    this.setState({
      totalTime: newTime,
      srcTotalTime: newTime,
    });
  };

  onChangeMin = (minutes) => {
    if (Number.isNaN(minutes) || minutes > MAX_MINUTES) return;
    const { srcTotalTime } = this.state;
    const newTime = newTotalTimeForMinutes(getOldSeconds(srcTotalTime), minutes);
    this.setState({
      totalTime: newTime,
      srcTotalTime: newTime,
    });
  };

  onChangeSec = (second) => {
    if (Number.isNaN(second) || second > 59) return;
    const { srcTotalTime } = this.state;
    const newTime =  newTotalTimeForSeconds(srcTotalTime, getOldSeconds(srcTotalTime), second);
    this.setState({
      totalTime: newTime,
      srcTotalTime: newTime,
    });
  };

  resetCountdown = () => {
    clearInterval(this.intervalId);
    this.setState({
      totalTime: 0,
      srcTotalTime: 0,
      isActive: false,
    });
  };

  startCountdown = () => {
    const { isActive, srcTotalTime, totalTime } = this.state;
    if (isActive) {
      clearInterval(this.intervalId);
      this.setState({
        isActive: false,
      });
    } else {
      this.setState({
        isActive: true,
        totalTime: totalTime || srcTotalTime,
      });
      this.intervalId = setInterval(this.tickCountdown, GLOBAL_TICK);
    }
  };

  playAudio = () => {
    const audio = new Audio(countdownAudio);
    audio.play();
  };

  tickCountdown = () => {
    this.setState(({ totalTime }) => {
      const currentTime = totalTime - GLOBAL_TICK;
      if (currentTime <= 0) {
        clearInterval(this.intervalId);
        this.playAudio();
        return {
          totalTime: 0,
          isActive: false,
        };
      }
      return {
        totalTime: currentTime,
      };
    });
  };

  render() {
    const { totalTime, srcTotalTime, isActive } = this.state;

    return (
      <>
        <FormInputNumber
          onChangeMin={this.onChangeMin}
          onChangeSec={this.onChangeSec}
          onChangeSlider={this.onChangeSlider}
          minute={getMinute(srcTotalTime)}
          second={getSecond(srcTotalTime)}
          disabled={isActive}
        />
        <ViewProgress
          minute={getMinute(totalTime)}
          second={getSecond(totalTime)}
          percent={getPercent(totalTime, srcTotalTime)}
        />
        <Button
          type="primary"
          className="countdown-btn"
          onClick={this.startCountdown}
          disabled={!srcTotalTime}
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
