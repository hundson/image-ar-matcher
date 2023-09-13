import React from "react";
import LeaveCallButton from "./LeaveCallButton";
import SwapVideoButton from "./SwapVideoButton";
import CustomBackgroundButton from "./CustomBackgroundButton";
import ScreenshotButton from "./ScreenshotButton";
import ResetButton from "./ResetButton";
import ARImageMatcherButton from "./ARImageMatcherButton";
import { getIsHost } from "../../../utils/webRTCHandler";

const VideoButtons = (props) => {
  if (getIsHost()) {
    return (
      <div id="video-buttons-container" className="video_buttons_container">
        <ARImageMatcherButton />
        <CustomBackgroundButton />
        <ScreenshotButton />
        <SwapVideoButton />
        <ResetButton />
        <LeaveCallButton />
      </div>
    );
  } else {
    return (
      <div id="video-buttons-container" className="video_buttons_container">
        <CustomBackgroundButton />
        <ScreenshotButton />
        <SwapVideoButton />
        <ResetButton />
        <LeaveCallButton />
      </div>
    );
  }
};

export const showUtilityButtons = () => {
  if (getIsHost()) {
    document.getElementById("ar-image-matcher-button").remove();
  }

  document.getElementById("custom-background-button-icon").hidden = false;
  document.getElementById("screenshot-button-icon").hidden = false;
  document.getElementById("swap-video-button-icon").hidden = false;
  document.getElementById("reset-button-icon").hidden = false;
};

export default VideoButtons;
