const Actions = {
  SET_IS_CALL_HOST: "SET_IS_CALL_HOST",
  SET_IDENTITY: "SET_IDENTITY",
  SET_CALL_ID: "SET_CALL_ID",
  SET_SHOW_LOADING_OVERLAY: "SET_SHOW_LOADING_OVERLAY",
  SET_PARTICIPANTS: "SET_PARTICIPANTS",
};

export const setIsCallHost = (isCallHost) => {
  return {
    type: Actions.SET_IS_CALL_HOST,
    isCallHost,
  };
};

export const setIdentity = (identity) => {
  return {
    type: Actions.SET_IDENTITY,
    identity,
  };
};

export const setCallID = (callID) => {
  return {
    type: Actions.SET_CALL_ID,
    callID,
  };
};

export const setShowLoadingOverlay = (showLoadingOverlay) => {
  return {
    type: Actions.SET_SHOW_LOADING_OVERLAY,
    showLoadingOverlay,
  };
};

export const setParticipants = (participants) => {
  return {
    type: Actions.SET_PARTICIPANTS,
    participants,
  };
};

export default Actions;
