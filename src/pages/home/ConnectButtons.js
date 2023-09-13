import React from "react";
import ConnectButton from "./ConnectButton";
import { useNavigate } from "react-router-dom";

const ConnectButtons = () => {
  let navigate = useNavigate();

  const pushToJoinCall = () => {
    navigate("/join-call");
  };

  const pushToJoinCallAsHost = () => {
    navigate("/join-call?host=true");
  };

  return (
    <div className="connect_buttons_container">
      <ConnectButton
        buttonText="Join call"
        onClickHandler={pushToJoinCall}
      />
      <ConnectButton
        createCallButton
        buttonText="Host call"
        onClickHandler={pushToJoinCallAsHost}
      />
    </div>
  );
};

export default ConnectButtons;
