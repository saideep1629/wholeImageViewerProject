import React, { useRef, useEffect, useState, useContext } from "react";
import { Move, FileText } from "lucide-react";
import ViewerContext from "../context/ViewerContext";
import bloodreport from "../assets/bloodreport.png";

const MainViewer = () => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const { position, setPosition, zoomLevel } = useContext(ViewerContext);
  const [boundingBoxes, setBoundingBoxes] = useState([]);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  // Fetch bounding box data asynchronously
  useEffect(() => {
    const fetchBoundingBoxes = async () => {
      try {
        const response = await fetch("/output.json");
        const data = await response.json();
        // console.log("Bounding Box Data:", data.data);

        if (Array.isArray(data.data)) {
          const formattedBoxes = data.data.map((box) => ({
            x: box[0],
            y: box[1],
            width: box[2],
            height: box[3],
            label: box[4] || "Unknown",
          }));
          // console.log("Formatted Bounding Boxes:", formattedBoxes);
          setBoundingBoxes(formattedBoxes);
        } else {
          console.error("Invalid JSON format:", data);
          setBoundingBoxes([]);
        }
      } catch (error) {
        console.error("Error fetching JSON:", error);
        setBoundingBoxes([]);
      }
    };

    fetchBoundingBoxes();
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = bloodreport;
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div className="relative h-full">
      <div
        ref={containerRef}
        className="relative h-full bg-gray-900 rounded-lg overflow-hidden cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
            transformOrigin: "center",
          }}
        >
          <img
            src={bloodreport}
            alt="Blood Report"
            className="w-full h-full object-contain"
          />

          {boundingBoxes.map((box, index) => {
            const scaledX = box.x / zoomLevel;
            const scaledY = box.y / zoomLevel;
            const scaledWidth = box.width / zoomLevel;
            const scaledHeight = box.height / zoomLevel;

            if (
              scaledX + scaledWidth > imageDimensions.width ||
              scaledY + scaledHeight > imageDimensions.height ||
              scaledX < 0 ||
              scaledY < 0
            ) {
              return null;
            }

            return (
              <div
                key={index}
                className="absolute border-2 border-blue-500 bg-opacity-20"
                style={{
                  left: `${scaledX}px`,
                  top: `${scaledY}px`,
                  width: `${scaledWidth}px`,
                  height: `${scaledHeight}px`,
                }}
              ></div>
            );
          })}
        </div>
      </div>

      <button
        className="absolute bottom-4 right-20 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 transition-colors"
        onClick={() => console.log("Generate report")}
      >
        <FileText className="w-4 h-4" />
        <span>Generate Report</span>
      </button>
    </div>
  );
};

export default MainViewer;
