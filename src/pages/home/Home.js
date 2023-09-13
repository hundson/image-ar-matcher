import React, { useEffect } from "react";
import ConnectButtons from "./ConnectButtons";
import { connect } from "react-redux";
import { setIsCallHost } from "../../store/actions";
import "./Home.css";

const Home = ({ setIsCallHostAction }) => {
  useEffect(() => {
    setIsCallHostAction(false);
  }, []);

  return (
    <div className="home_container">
      <div className="home_panel">
        <h2>AUGMENTED REALITY MATCHER</h2>
        <ConnectButtons />
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    setIsCallHostAction: (isCallHost) => dispatch(setIsCallHost(isCallHost)),
  };
};

export default connect(null, mapActionsToProps)(Home);
