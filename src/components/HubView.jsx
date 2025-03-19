import React, { useContext, useRef } from "react";
import { MoveIcon, Droplets } from "lucide-react";
import  ViewerContext  from "../context/ViewerContext";
import bloodreport from '../assets/bloodreport.png'

const HubView = () => {
  const { position, zoomLevel } = useContext(ViewerContext);
  const containerRef = useRef(null);

  const getPointerStyle = () => {
    if (!containerRef.current) return {};

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    const xPercent = -position.x / (containerRect.width * 2);
    const yPercent = -position.y / (containerRect.height * 2);

    const baseSize = 24;
    const size = baseSize / zoomLevel;

    return {
      left: `${50 + xPercent * 100}%`,
      top: `${50 + yPercent * 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      transform: "translate(-50%, -50%)",
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-3">
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700">Hub View</h3>
          <div className="text-md text-gray-500">WSI-2024-001</div>
        </div>
        
      </div>
      <div
        ref={containerRef}
        className="relative h-32 bg-gray-900 rounded-lg overflow-hidden"
      >
        <img
          src={bloodreport}
          alt="WSI Overview"
          className="w-full h-full object-cover"
        />
        

        <div
          className="absolute border-2 border-blue-500 bg-blue-500/20 cursor-move flex items-center justify-center transition-all duration-200"
          style={getPointerStyle()}
        >
          <MoveIcon className="w-4 h-4 text-blue-500" />
        </div>
      </div>
      <div className="flex items-center justify-between text-m">
          <div className="flex items-center space-x-1">
            <span className="text-gray-500 mt-2">Patient ID:</span>
            <span className="font-medium mt-2">P-12345</span>
          </div>
          <div className="flex items-center space-x-1 text-red-600">
            <Droplets className="w-3 h-3 mt-2" />
            <span className="font-medium mt-2">B+</span>
          </div>
        </div>
    </div>
  );
};

export default HubView;
