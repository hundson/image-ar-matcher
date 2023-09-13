import resetButton from "../../../resources/images/reset.svg";
import { signalReset } from "../../../utils/signalingServer";

const ResetButton = () => {
  const resetHandler = () => {
    signalReset();
  };

  return (
    <div id="reset-button" className="video_button_container">
      <img
        id="reset-button-icon"
        alt="reset-button"
        src={resetButton}
        className="video_button_image"
        onClick={resetHandler}
        hidden
      />
    </div>
  );
};

export default ResetButton;
