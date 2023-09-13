import React, { useEffect } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import JoinCall from "./pages/joinCall/JoinCall";
import Call from "./pages/call/Call";
import { connectWithSocketIOServer } from "./utils/signalingServer";
import "./App.css";

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/join-call",
      element: <JoinCall />,
    },
    {
      path: "/call",
      element: <Call />,
    },
  ]);

  useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
