import React from "react";

const JoinCallTitle = ({ isCallHost }) => {
  const titleText = isCallHost ? "Host Call" : "Join Call";

  return <p className="join_call_title">{titleText}</p>;
};

export default JoinCallTitle;
