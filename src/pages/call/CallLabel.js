import React from "react";

const CallLabel = ({ callID }) => {
  return (
    <div className="call_label">
      <p className="call_label_paragraph">ID: {callID}</p>
    </div>
  );
};

export default CallLabel;
