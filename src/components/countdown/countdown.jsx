import React from "react";
import "./countdown.scss";
import { Button } from "antd";
import { FormInputNumber } from "../form-input-number";
import { ViewProgress } from "../view-progress";

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

  onChangeMin = (minuts) => {
    if (Number.isNaN(minuts) || minuts > 720) return;
    const { srcTotalTime } = this.state;
    const second = (srcTotalTime / 1000) % 60;
    const newTime = (minuts * 60 + second) * 1000;
    this.setState({
      totalTime: newTime,
      srcTotalTime: newTime,
    });
  };

  onChangeSec = (second) => {
    if (Number.isNaN(second) || second > 59) return;
    const { srcTotalTime } = this.state;
    const secondOld = (srcTotalTime / 1000) % 60;
    const newSrcTotalTime = srcTotalTime + (second - secondOld) * 1000;
    this.setState({
      totalTime: newSrcTotalTime,
      srcTotalTime: newSrcTotalTime,
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
      this.intervalId = setInterval(this.tickCountdown, 1000);
    }
  };

  playAudio = (str = "countdown.mp3") => {
    const audio = new Audio(str);
    audio.play();
  };

  tickCountdown = () => {
    this.setState(({ totalTime }) => {
      const currentTime = totalTime - 1000;
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

    const getMinute = (total) => {
      return Math.trunc(total / 60000);
    };

    const getSecond = (total) => {
      return Math.ceil((total / 1000) % 60);
    };
    const getPercent = (current, total) => {
      return Math.floor(((total - current) * 100) / total);
    };

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
          disabled={!(srcTotalTime)}
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
