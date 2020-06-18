import React from "react";
import { InputNumber, Slider } from "antd";
import "./form-input-number.scss";
import PropTypes from "prop-types";

export const FormInputNumber = ({
  onChangeMin,
  onChangeSec,
  onChangeSlider,
  minute,
  second,
  disabled,
}) => {
  const sliderValue = minute * 60 + second;
  return (
    <>
      <Slider
        className="form-slider"
        min={0}
        max={3600}
        step={15}
        onChange={onChangeSlider}
        value={sliderValue}
        tipFormatter={null}
        disabled={disabled}
      />

      <InputNumber
        className="form-minute"
        type="number"
        id="minute"
        min={0}
        max={720}
        value={minute}
        onChange={onChangeMin}
        disabled={disabled}
      />
      <label htmlFor="minute"> minute(s)</label>
      <InputNumber
        className="form-second"
        type="number"
        id="second"
        min={0}
        max={59}
        value={second}
        onChange={onChangeSec}
        disabled={disabled}
      />
      <label htmlFor="second"> second(s)</label>
    </>
  );
};

FormInputNumber.defaultProps = {
  minute: 0,
  second: 0,
  disabled: false,
};

FormInputNumber.propTypes = {
  onChangeMin: PropTypes.func.isRequired,
  onChangeSec: PropTypes.func.isRequired,
  onChangeSlider: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  minute: PropTypes.number,
  second: PropTypes.number,
};
