import React from "react";
import { endCall } from "../../../utils/signalingServer";

const LeaveCallButton = () => {
  return (
    <div id="leave-call-button" className="video_button_container">
      <button
        className="video_button_end"
        onClick={(leaveCallHandler, endCall)}
      >
        Leave Call
      </button>
    </div>
  );
};

export const leaveCallHandler = () => {
  const siteURL = window.location.origin + "/image-ar-matcher";
  window.location.href = siteURL;
};

export default LeaveCallButton;
