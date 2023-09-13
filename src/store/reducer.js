import Actions from "./actions";

const initState = {
  identity: "",
  isCallHost: false,
  callID: null,
  showLoadingOverlay: true,
  participants: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case Actions.SET_IS_CALL_HOST:
      return {
        ...state,
        isCallHost: action.isCallHost,
      };
    case Actions.SET_CALL_ID:
      return {
        ...state,
        callID: action.callID,
      };
    case Actions.SET_IDENTITY:
      return {
        ...state,
        identity: action.identity,
      };
    case Actions.SET_SHOW_LOADING_OVERLAY:
      return {
        ...state,
        showLoadingOverlay: action.showLoadingOverlay,
      };
    case Actions.SET_PARTICIPANTS:
      return {
        ...state,
        participants: action.participants,
      };
    default:
      return state;
  }
};

export default reducer;
