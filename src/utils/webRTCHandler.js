import { setShowLoadingOverlay } from "../store/actions";
import store from "../store/store";
import * as signalingServer from "./signalingServer";
import Peer from "simple-peer";
import SegmentationHandler from "./segmentationHandler";
import { showUtilityButtons } from "../pages/call/videoSection/VideoButtons";

const defaultConstraints = {
  audio: false,
  video: {
    width: "1920",
    height: "1080",
  },
};

let localStream;
let isHost = false;
let tempConnectedUserSocketID;

export const getLocalVideoAndInitConnection = async (
  isCallHost,
  identity,
  callID = null
) => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      if (isCallHost) {
        isHost = true;
      }

      localStream = stream;
      showLocalVideoPreview(localStream);

      isCallHost
        ? signalingServer.createCall(identity)
        : signalingServer.joinCall(identity, callID);
    })
    .catch((err) => {
      console.log("Failed to access webcam.");
      console.log(err);
    });
};

let peers = {};
let streams = [];

const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: "stun:a.relay.metered.ca:80",
      },
      {
        urls: "turn:a.relay.metered.ca:80",
        username: "1e845039e49ee8c52cf102ef",
        credential: "kIyLpMJOFcmNx5g/",
      },
      {
        urls: "turn:a.relay.metered.ca:80?transport=tcp",
        username: "1e845039e49ee8c52cf102ef",
        credential: "kIyLpMJOFcmNx5g/",
      },
      {
        urls: "turn:a.relay.metered.ca:443",
        username: "1e845039e49ee8c52cf102ef",
        credential: "kIyLpMJOFcmNx5g/",
      },
      {
        urls: "turn:a.relay.metered.ca:443?transport=tcp",
        username: "1e845039e49ee8c52cf102ef",
        credential: "kIyLpMJOFcmNx5g/",
      },
    ],
  };
};

export const prepareNewPeerConnection = (
  connectedUserSocketID,
  isInitiator
) => {
  const configuration = getConfiguration();

  peers[connectedUserSocketID] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  });

  peers[connectedUserSocketID].on("signal", (data) => {
    const signalData = {
      signal: data,
      connectedUserSocketID: connectedUserSocketID,
    };

    signalingServer.signalPeerData(signalData);
  });

  peers[connectedUserSocketID].on("stream", (stream) => {
    addStream(stream, connectedUserSocketID);
    streams = [...streams, stream];
  });
};

export const signalDataHandler = (data) => {
  peers[data.connectedUserSocketID].signal(data.signal);
};

export const removePeerConnection = (data) => {
  const { socketID } = data;
  const videoContainer = document.getElementById(`${socketID}-video-container`);
  const videoElement = document.getElementById(`${socketID}-video`);

  if (videoContainer && videoElement) {
    const tracks = videoElement.srcObject.getTracks();

    tracks.forEach((t) => t.stop());

    videoElement.srcObject = null;
    videoContainer.removeChild(videoElement);
    videoContainer.parentNode.removeChild(videoContainer);

    if (peers[socketID]) {
      peers[socketID].destroy();
    }
    delete peers[socketID];
  }
};

const showLocalVideoPreview = (stream) => {
  const videosContainer = document.getElementById("videos_container");
  videosContainer.classList.add("videos_container");
  const videoContainer = document.createElement("div");
  videoContainer.id = "local-video-container";
  videoContainer.classList.add("video_track_container");

  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;
  videoElement.id = "local-video";
  videoElement.classList.add("video");
  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
};

const addStream = (stream, connectedUserSocketID) => {
  const videosContainer = document.getElementById("videos_container");
  const videoContainer = document.createElement("div");
  videoContainer.id = `${connectedUserSocketID}-video-container`;
  videoContainer.classList.add("video_track_container");

  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;
  videoElement.id = `${connectedUserSocketID}-video`;
  videoElement.classList.add("video");
  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);

  tempConnectedUserSocketID = connectedUserSocketID;
  store.dispatch(setShowLoadingOverlay(false));
};

export const ARImageMatcher = () => {
  const videosContainer = document.getElementById("videos_container");
  const AROutputContainer = document.createElement("div");
  AROutputContainer.id = "ar-output-container";
  AROutputContainer.classList.add("ar_output_container");

  const canvasElement = document.createElement("canvas");
  canvasElement.id = "ar-output-canvas";
  canvasElement.classList.add("ar_output_canvas");
  canvasElement.width = 1920;
  canvasElement.height = 1080;

  let hostVideoElement, peerVideoElement;

  if (isHost) {
    hostVideoElement = document.getElementById("local-video");
    peerVideoElement = document.getElementById(
      `${tempConnectedUserSocketID}-video`
    );
  } else {
    hostVideoElement = document.getElementById(
      `${tempConnectedUserSocketID}-video`
    );
    peerVideoElement = document.getElementById("local-video");
  }

  AROutputContainer.appendChild(canvasElement);
  videosContainer.appendChild(AROutputContainer);

  showUtilityButtons();

  SegmentationHandler(
    hostVideoElement.id,
    peerVideoElement.id,
    canvasElement.id
  );
};

export const getIsHost = () => {
  return isHost;
};
