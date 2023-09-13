import React from "react";

const ConnectButton = ({
  createCallButton = false,
  buttonText,
  onClickHandler,
}) => {
  const buttonClass = createCallButton
    ? "create_call_button"
    : "join_call_button";

  return (
    <button className={buttonClass} onClick={onClickHandler}>
      {buttonText}
    </button>
  );
};

export default ConnectButton;
