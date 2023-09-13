import React from "react";

const Input = ({ placeholder, value, changeHandler }) => {
  return (
    <input
      value={value}
      onChange={changeHandler}
      className="join_call_input"
      placeholder={placeholder}
    />
  );
};

const JoinCallInputs = (props) => {
  const { callIDValue, setCallIDValue, nameValue, setNameValue, isCallHost } =
    props;

  const callIDValueChangeHandler = (event) => {
    setCallIDValue(event.target.value);
  };

  const nameValueChangeHandler = (event) => {
    setNameValue(event.target.value);
  };

  return (
    <div className="join_call_inputs_container">
      {!isCallHost && (
        <Input
          placeholder="Enter call ID"
          value={callIDValue}
          changeHandler={callIDValueChangeHandler}
        />
      )}
      <Input
        placeholder="Enter your name"
        value={nameValue}
        changeHandler={nameValueChangeHandler}
      />
    </div>
  );
};

export default JoinCallInputs;
