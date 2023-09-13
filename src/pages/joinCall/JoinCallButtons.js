import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ buttonText, cancelButton = false, onClickHandler }) => {
  const buttonClass = cancelButton
    ? "join_call_cancel_button"
    : "join_call_success_button";

  return (
    <button onClick={onClickHandler} className={buttonClass}>
      {buttonText}
    </button>
  );
};

const JoinCallButtons = ({ joinCallHandler, isCallHost }) => {
  const successButtonText = isCallHost ? "Host" : "Join";

  const navigate = useNavigate();
  const pushToHome = () => {
    navigate("/");
  };

  return (
    <div className="join_call_buttons_container">
      <Button buttonText={successButtonText} onClickHandler={joinCallHandler} />
      <Button buttonText="Cancel" cancelButton onClickHandler={pushToHome} />
    </div>
  );
};

export default JoinCallButtons;
