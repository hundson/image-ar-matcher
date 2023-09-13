import screenshotButton from "../../../resources/images/screenshot.svg";
import { screenshotHandler } from "../../../utils/segmentationHandler";

const ScreenshotButton = () => {
  const screenshotButtonHandler = () => {
    setTimeout(screenshotHandler, 5000);
    setAnimation();
  };

  const setAnimation = () => {
    document.getElementById("screenshot-button").style.animation =
      "spin 1s ease 0s 5 normal forwards";

    setTimeout(resetAnimation, 5000);
  };

  const resetAnimation = () => {
    document.getElementById("screenshot-button").style.animation = "none";
  };

  return (
    <div id="screenshot-button" className="video_button_container">
      <img
        id="screenshot-button-icon"
        alt="screenshot-button"
        src={screenshotButton}
        className="video_button_image"
        onClick={screenshotButtonHandler}
        hidden
      />
    </div>
  );
};

export default ScreenshotButton;
