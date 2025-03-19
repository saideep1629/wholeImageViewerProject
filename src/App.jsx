import React, { useState, useEffect, useContext } from "react";
import { ZoomIn, ZoomOut, Maximize2, Microscope } from "lucide-react";

import LeftPanel from "./components/LeftPanel";
import HubView from "./components/HubView";
import MainViewer from "./components/MainViewer";
import ViewerContext from "./context/ViewerContext";
import ViewerContextProvider from "./context/ViewerContextProvider";

function ViewerControls() {
  const { zoomLevel, setZoomLevel } = useContext(ViewerContext);

  return (
    <div className="absolute bottom-6 right-6 flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 p-2">
      <button
        onClick={() => setZoomLevel(Math.min(zoomLevel + 0.1, 3))}
        className="p-3 hover:bg-gray-100 transition rounded-lg"
        title="Zoom In"
        aria-label="Zoom In"
      >
        <ZoomIn size={24} className="text-gray-700" />
      </button>
      <button
        onClick={() => setZoomLevel(Math.max(zoomLevel - 0.1, 0.5))}
        className="p-3 hover:bg-gray-100 transition rounded-lg mt-2"
        title="Zoom Out"
        aria-label="Zoom Out"
      >
        <ZoomOut size={24} className="text-gray-700" />
      </button>
    </div>
  );
}

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <ViewerContextProvider>
      <div className="flex h-screen bg-gray-100">
        <div
          className={`relative transition-all duration-300 ${
            isPanelOpen ? "w-[30%]" : "w-0"
          }`}
        >
          <div
            className={`h-full bg-white shadow-lg overflow-hidden transition-opacity duration-300 ${
              isPanelOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <LeftPanel />
          </div>
        </div>

        <div className="w-[70%] flex flex-col overflow-hidden">
          <div className="h-16 bg-white shadow-sm flex items-center justify-between px-6 border-b">
            <div className="flex items-center space-x-3">
              <Microscope className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-800">
                Patient's Details
              </h1>
            </div>
            <div>
              <button
                onClick={handleFullscreen}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Fullscreen"
                aria-label="Toggle fullscreen mode"
              >
                <Maximize2 size={22} className="text-gray-700" />
              </button>
            </div>
          </div>

          {/* Viewer Section */}
          <div className="flex-1 relative p-4">
            <div className="h-full bg-white rounded-lg shadow-lg p-4 border border-gray-200">
              <div className="relative h-full">
                <MainViewer />
                <ViewerControls />
              </div>
            </div>

            {/* HubView Panel */}
            <div className="absolute top-8 right-8 w-64 z-10">
              <HubView />
            </div>
          </div>
        </div>
      </div>
    </ViewerContextProvider>
  );
}

export default App;

