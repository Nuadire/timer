import React from "react";
import "./countdown.scss";
import { Button } from "antd";
import FormInputNumber from "../form-input-number";
import ViewProgress from "../view-progress/view-progress";

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      srcTotalTime: 0,
      totalTime: 0,
      saveTime: 0,
      isActive: false,
      startTime: 0
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
      saveTime: 0,
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
      saveTime: 0,
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
      saveTime: 0,
    });
  };

  resetCountdown = () => {
    clearInterval(this.intervalId);
    this.setState({
      totalTime: 0,
      srcTotalTime: 0,
      startTime: 0,
      isActive: false,
      saveTime: 0
    });
  };

  startCountdown = () => {
    const { isActive, srcTotalTime, totalTime, saveTime } = this.state;
    if (isActive) {
      clearInterval(this.intervalId);
      this.setState({
        isActive: false,
        startTime: 0,
        saveTime: totalTime,
      });
    } else {
      this.setState({
        isActive: true,
        startTime: Date.now(),
        saveTime: saveTime || srcTotalTime,
      });
      this.intervalId = setInterval(this.tickCountdown, 1000);
    }
  };

  playAudio = (str = "countdown.mp3") => {
    const audio = new Audio(str);
    audio.play();
  };

  tickCountdown = () => {
    this.setState(({ startTime, saveTime }) => {
      const currentTime = saveTime - Math.floor(Date.now() - startTime);
      if (currentTime <= 0) {
        clearInterval(this.intervalId);
        this.playAudio();
        return {
          totalTime: 0,
          isActive: false
        };
      }
      return {
        totalTime: currentTime
      };
    });
  };

  render() {
    const {
      totalTime,
      srcTotalTime,
      isActive,
    } = this.state;

    const getMinute = (total) => {
      return Math.trunc(total / 60000);
    };

    const getSecond = (total) => {
      return Math.trunc((total / 1000) % 60);
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
          disabled={!totalTime}
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
