import swapVideoButton from "../../../resources/images/swap-video.svg";
import { signalSwapVideo } from "../../../utils/signalingServer";

const SwapVideoButton = () => {
  const swapVideoButtonHandler = () => {
    signalSwapVideo();
  };

  return (
    <div id="swap-video-button" className="video_button_container">
      <img
        id="swap-video-button-icon"
        alt="swap-video-button"
        src={swapVideoButton}
        className="video_button_image"
        onClick={swapVideoButtonHandler}
        hidden
      />
    </div>
  );
};

export default SwapVideoButton;
