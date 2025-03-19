import React, { useState } from "react";
import ViewerContext from "./ViewerContext";

const ViewerContextProvider = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <ViewerContext.Provider
      value={{ position, zoomLevel, setPosition, setZoomLevel }}
    >
      {children}
    </ViewerContext.Provider>
  );
};

export default ViewerContextProvider;
