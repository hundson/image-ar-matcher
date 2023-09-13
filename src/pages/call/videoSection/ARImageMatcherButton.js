import startButton from "../../../resources/images/start.svg";
import { signalARImageMatcher } from "../../../utils/signalingServer";

const ARImageMatcherButton = () => {
  const ARImageMatcherButtonHandler = () => {
    signalARImageMatcher();
  };

  return (
    <div id="ar-image-matcher-button" className="video_button_container">
      <img
        alt="ar-img-matcher-button"
        src={startButton}
        className="video_button_image"
        onClick={ARImageMatcherButtonHandler}
      />
    </div>
  );
};

export default ARImageMatcherButton;
