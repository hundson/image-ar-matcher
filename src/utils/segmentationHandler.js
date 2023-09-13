import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import { signalCustomBackground } from "./signalingServer";
import canvasToImage from "canvas-to-image";

let isVideoSwapped = false;
let isCustomBackground = false;
let tempInitiator = false;
let stopSegmentation = false;
let tempHostVideoID, tempPeerVideoID, tempCanvasID;
let backgroundImageURL;

function SegmentationHandler(hostVideoID, peerVideoID, canvasID) {
  if (
    tempHostVideoID !== null &&
    tempPeerVideoID !== null &&
    tempCanvasID !== null
  ) {
    tempHostVideoID = hostVideoID;
    tempPeerVideoID = peerVideoID;
    tempCanvasID = canvasID;
  }

  let backgroundVideoElement;
  let segmentedVideoElement;

  if (!isCustomBackground) {
    if (isVideoSwapped) {
      backgroundVideoElement = document.getElementById(tempPeerVideoID);
      segmentedVideoElement = document.getElementById(tempHostVideoID);

      console.log("Peer video is set as background");
    } else {
      backgroundVideoElement = document.getElementById(tempHostVideoID);
      segmentedVideoElement = document.getElementById(tempPeerVideoID);

      console.log("Host video is set as background");
    }
  } else {
    let backgroundImg = new Image();
    backgroundImg.src = backgroundImageURL;
    backgroundVideoElement = backgroundImg;

    if (isVideoSwapped) {
      segmentedVideoElement = document.getElementById(tempPeerVideoID);
      console.log("Running segmentation on peer video");
    } else {
      segmentedVideoElement = document.getElementById(tempHostVideoID);
      console.log("Running segmentation on host video");
    }
  }

  const canvasElement = document.getElementById(tempCanvasID);
  const canvasCtx = canvasElement.getContext("2d");

  function onResults(results) {
    canvasCtx.save();

    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    canvasCtx.globalCompositeOperation = "source-over";
    canvasCtx.drawImage(
      results.segmentationMask,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    canvasCtx.globalCompositeOperation = "source-in";
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    canvasCtx.globalCompositeOperation = "destination-over";
    canvasCtx.drawImage(
      backgroundVideoElement,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    canvasCtx.restore();

    if (stopSegmentation) {
      closeSegmentation();
      stopSegmentation = false;
    }
  }

  const selfieSegmentation = new SelfieSegmentation({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
    },
  });

  selfieSegmentation.setOptions({
    modelSelection: 1,
    selfieMode: false,
  });

  selfieSegmentation.onResults(onResults);

  const sendToMediaPipe = async () => {
    try {
      await selfieSegmentation.send({ image: segmentedVideoElement });
      requestAnimationFrame(sendToMediaPipe);
    } catch (e) {
      console.log(e);
    }
  };

  sendToMediaPipe();

  const closeSegmentation = () => {
    selfieSegmentation.close();
  };
}

const restartSegmentation = () => {
  stopSegmentation = true;
  return SegmentationHandler(tempHostVideoID, tempPeerVideoID, tempCanvasID);
};

export const swapVideo = () => {
  isVideoSwapped = !isVideoSwapped;
  restartSegmentation();
};

export const customBackground = (img, initiator) => {
  if (initiator) {
    backgroundImageURL = img;
    isCustomBackground = true;
    tempInitiator = true;
    return;
  }

  if (!tempInitiator) {
    backgroundImageURL = img;
    isCustomBackground = true;
  } else {
    tempInitiator = false;
  }

  restartSegmentation();
};

export const backgroundImageHandler = (e) => {
  if (e.target.files[0].size <= 1e7) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        customBackground(reader.result, true);
        signalCustomBackground(reader.result);
      } else {
        return;
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  } else {
    alert("Maximum file size: 10MB.");
  }
};

export const screenshotHandler = () => {
  const canvasElement = document.getElementById(tempCanvasID);
  canvasToImage(canvasElement);
};

export const resetSegmentation = () => {
  isVideoSwapped = false;
  isCustomBackground = false;
  tempInitiator = false;
  backgroundImageURL = null;

  restartSegmentation();
};

export default SegmentationHandler;
