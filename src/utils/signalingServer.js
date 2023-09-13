import io from "socket.io-client";
import { setCallID, setParticipants } from "../store/actions";
import store from "../store/store";
import * as webRTCHandler from "./webRTCHandler";
import {
  customBackground,
  resetSegmentation,
  swapVideo,
} from "./segmentationHandler";
import { leaveCallHandler } from "../pages/call/videoSection/LeaveCallButton";
import { setShowLoadingOverlay } from "../store/actions";

const SERVER = "https://image-ar-matcher.onrender.com";

let socket = null;
let tempCallID;

export const connectWithSocketIOServer = () => {
  socket = io(SERVER);

  socket.on("connect", () => {
    console.log("Successfully connected with socket.io server");
    console.log(socket.id);
  });

  socket.on("call-id", (data) => {
    const { callID } = data;
    tempCallID = callID;
    store.dispatch(setCallID(callID));
  });

  socket.on("call-update", (data) => {
    const { connectedUsers } = data;
    store.dispatch(setParticipants(connectedUsers));
  });

  socket.on("connection-prepare", (data) => {
    const { connectedUserSocketID } = data;
    webRTCHandler.prepareNewPeerConnection(connectedUserSocketID, false);

    socket.emit("connection-init", {
      connectedUserSocketID: connectedUserSocketID,
    });
  });

  socket.on("connection-signal", (data) => {
    webRTCHandler.signalDataHandler(data);
  });

  socket.on("connection-init", (data) => {
    const { connectedUserSocketID } = data;
    webRTCHandler.prepareNewPeerConnection(connectedUserSocketID, true);
  });

  socket.on("user-disconnected", (data) => {
    webRTCHandler.removePeerConnection(data);
    leaveCallHandler();
  });

  socket.on("ar-image-matcher", () => {
    webRTCHandler.ARImageMatcher();
  });

  socket.on("swap-video", () => {
    swapVideo();
    store.dispatch(setShowLoadingOverlay(false));
  });

  socket.on("reset", () => {
    resetSegmentation();
    store.dispatch(setShowLoadingOverlay(false));
  });

  socket.on("custom-background", (data) => {
    const { img } = data;
    customBackground(img, false);
    store.dispatch(setShowLoadingOverlay(false));
  });

  socket.on("end-call", () => {
    leaveCallHandler();
  });

  socket.on("signal-loader", () => {
    store.dispatch(setShowLoadingOverlay(true));
  });
};

export const createCall = (identity) => {
  const data = {
    identity,
  };

  socket.emit("create-call", data);
};

export const joinCall = (identity, callID) => {
  const data = {
    identity,
    callID,
  };
  tempCallID = callID;

  socket.emit("join-call", data);
};

export const signalPeerData = (data) => {
  socket.emit("connection-signal", data);
};

export const signalARImageMatcher = () => {
  const data = { tempCallID };
  socket.emit("ar-image-matcher", data);
};

export const signalSwapVideo = () => {
  signalLoader();
  const data = { tempCallID };
  socket.emit("swap-video", data);
};

export const signalReset = () => {
  signalLoader();
  const data = { tempCallID };
  socket.emit("reset", data);
};

export const signalCustomBackground = (img) => {
  signalLoader();
  const data = { tempCallID, img };
  socket.emit("custom-background", data);
};

export const endCall = () => {
  const data = { tempCallID };
  socket.emit("end-call", data);
};

const signalLoader = () => {
  const data = { tempCallID };
  socket.emit("signal-loader", data);
};
