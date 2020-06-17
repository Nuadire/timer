import React from "react";
import { Progress } from "antd";
import "./view-progress.scss"
import PropTypes from 'prop-types';


const ViewProgress = (props) => {
  const { minute, second, percent } = props;
  
  return (
      <>
      <h2 className="view-title">{`${minute} minut - ${second} second`}</h2>
      <Progress type="circle" percent={percent} />
    </>
  );
};

ViewProgress.defaultProps = {
    minute: 0,
    second: 0,
    percent: 0,
  };

ViewProgress.propTypes = {
    minute: PropTypes.number,
    second: PropTypes.number,
    percent: PropTypes.number
}

export default ViewProgress;
