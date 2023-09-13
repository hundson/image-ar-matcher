import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setIsCallHost } from "../../store/actions";
import JoinCallTitle from "./JoinCallTitle";
import JoinCallContent from "./JoinCallContent";
import "./JoinCall.css";

const JoinCall = (props) => {
  const { setIsCallHostAction, isCallHost } = props;
  const search = useLocation().search;

  useEffect(() => {
    const isCallHost = new URLSearchParams(search).get("host");
    if (isCallHost) {
      setIsCallHostAction(true);
    }
  }, []);

  return (
    <div className="join_call_container">
      <div className="join_call_panel">
        <JoinCallTitle isCallHost={isCallHost} />
        <JoinCallContent />
      </div>
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setIsCallHostAction: (isCallHost) => dispatch(setIsCallHost(isCallHost)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(JoinCall);
