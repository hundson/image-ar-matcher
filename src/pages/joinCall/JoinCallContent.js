import React, { useState } from "react";
import JoinCallInputs from "./JoinCallInputs";
import { connect } from "react-redux";
import ErrorMessage from "./ErrorMessage";
import JoinCallButtons from "./JoinCallButtons";
import { useNavigate } from "react-router-dom";
import { getCallExists } from "../../utils/api";
import { setIdentity, setCallID } from "../../store/actions";

const JoinCallContent = (props) => {
  const { isCallHost, setIdentityAction, setCallIDAction } = props;
  const [callIDValue, setCallIDValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const joinCallHandler = async () => {
    if (!nameValue) {
      setErrorMessage("Your name is required");
    } else {
      setIdentityAction(nameValue);
      if (isCallHost) {
        createCall();
      } else {
        await joinCall();
      }
    }
  };

  const joinCall = async () => {
    const responseMessage = await getCallExists(callIDValue);
    const { callExists, callFull } = responseMessage;

    if (callExists) {
      if (callFull) {
        setErrorMessage("The call session is full");
      } else {
        setCallIDAction(callIDValue);
        navigate("/call");
      }
    } else {
      setErrorMessage("Unidentified call ID");
    }
  };

  const createCall = () => {
    navigate("/call");
  };

  return (
    <>
      <JoinCallInputs
        callIDValue={callIDValue}
        setCallIDValue={setCallIDValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        isCallHost={isCallHost}
      />
      <ErrorMessage errorMessage={errorMessage} />
      <JoinCallButtons
        joinCallHandler={joinCallHandler}
        isCallHost={isCallHost}
      />
    </>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setIdentityAction: (identity) => dispatch(setIdentity(identity)),
    setCallIDAction: (callID) => dispatch(setCallID(callID)),
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps
)(JoinCallContent);
