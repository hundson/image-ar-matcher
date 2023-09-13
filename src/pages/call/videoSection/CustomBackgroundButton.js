import customBackgroundButton from "../../../resources/images/custom-background.svg";
import { backgroundImageHandler } from "../../../utils/segmentationHandler";

const CustomBackgroundButton = () => {
  const customBackgroundButtonHandler = () => {
    document.getElementById("custom-background-input").click();
  };

  return (
    <div id="custom-background-button" className="video_button_container">
      <img
        id="custom-background-button-icon"
        alt="custom-background-button"
        src={customBackgroundButton}
        className="video_button_image"
        onClick={customBackgroundButtonHandler}
        hidden
      />

      <input
        id="custom-background-input"
        type="file"
        accept="image/*"
        multiple
        onChange={backgroundImageHandler}
        hidden
      />
    </div>
  );
};

export default CustomBackgroundButton;
