import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OverlayManager.css";

const OverlayManager = ({ overlays }) => {
  const baseURL = "http://localhost:5000/api";
  const [newOverlay, setNewOverlay] = useState({});
  const [canChangePos, setCanChangePos] = useState(true);
  const [canChangeSize, setCanChangeSize] = useState(true);

  const handleAddOverlay = () => {
    axios
      .post(baseURL + "/overlays", newOverlay)
      .then((response) => {
        console.log("Overlays added successfully");
        window.location.reload(false);
      })
      .catch((error) => {
        console.error("Error adding overlays:", error);
      });
    setNewOverlay({});
  };

  const handleDeleteOverlay = (_id) => {
    axios
      .delete(baseURL + "/overlays/" + _id)
      .then((response) => {
        console.log("Overlays deleted successfully");
        window.location.reload(false);
      })
      .catch((error) => {
        console.error("Error deleting overlays:", error);
      });
  };

  const applyOverlay = (index) => {
    const overlay = overlays[index];
    const logo = document.getElementById("content");
    logo.style.left = `${overlay["position_x"]}%`;
    logo.style.top = `${overlay["position_y"]}%`;
    const size = overlay["dimention_x"] / 10;
    logo.style.fontSize = `${size}rem`;
    logo.innerHTML = overlay["file_url"];
  };

  const applyOverlayMouse = (pos_x, pos_y) => {
    const logo = document.getElementById("content");
    logo.style.left = `${pos_x}%`;
    logo.style.top = `${pos_y}%`;
  };
  const applyOverlaySize = (size) => {
    const logo = document.getElementById("content");
    size = size / 10;
    logo.style.fontSize = `${size}rem`;
  };
  useEffect(() => {
    if(overlays.length > 0){
      applyOverlay(overlays.length - 1)
    }
  }, [overlays]);
  // Convert JSON object to an array if it's not already an array
  // const overlayArray = Array.isArray(overlays) ? overlays : Object.values(overlays);
  // console.log(overlays);
  return (
    <div className="overlay-manager">
      <h2>Overlay Manager</h2>

      <div className="control">
        <h3>Control Panel</h3>
        <button
          onClick={() => {
            setCanChangePos(false);
          }}
          onMouseMove={(event) => {
            if (canChangePos) {
              var rect = document
                .getElementById("control_box")
                .getBoundingClientRect();
              var height = rect.height;
              var width = rect.width;
              var x = event.clientX - rect.left;
              x = (x * 100) / width;
              var y = event.clientY - rect.top;
              y = (y * 100) / height;
              setNewOverlay({ ...newOverlay, position_x: x, position_y: y });

              applyOverlayMouse(x, y);
            }
          }}
          id="control_box"
        >
          Drag to change position
        </button>
        <br></br>
        <button
          id="control_slider"
          onClick={(e) => {
            setCanChangeSize(false);
          }}
          onMouseMove={(event) => {
            if (canChangeSize) {
              var rect = document
                .getElementById("control_slider")
                .getBoundingClientRect();
              var width = rect.width;
              var x = event.clientX - rect.left;
              x = (x * 100) / width;
              setNewOverlay({ ...newOverlay, dimention_x: x });
              applyOverlaySize(x);
            }
          }}
        >
          Change size
        </button>
        <br></br>
        <input
          id="control_content"
          placeholder="write the name here"
          onChange={(e) => {
            const logo = document.getElementById("content");
            logo.innerHTML = e.target.value;
            setNewOverlay({ ...newOverlay, file_url: e.target.value });
          }}
        />
        <br></br>
        <button
          id="control_save"
          onClick={() => {
            handleAddOverlay();
          }}
        >
          Save
        </button>
      </div>

      <div className="overlay-form">
        <h2>Enter Manually</h2>
        <label>Position X:</label>
        <input
          type="number"
          onChange={(e) =>
            setNewOverlay({ ...newOverlay, position_x: e.target.value })
          }
        />
        <label>Position Y:</label>
        <input
          type="number"
          onChange={(e) =>
            setNewOverlay({ ...newOverlay, position_y: e.target.value })
          }
        />
        <label>fontSize:</label>
        <input
          type="number"
          onChange={(e) =>
            setNewOverlay({ ...newOverlay, dimention_x: e.target.value })
          }
        />
        {/* <label>dimention y:</label>
        <input
          type="number"
          onChange={(e) =>
            setNewOverlay({ ...newOverlay, dimention_y: e.target.value })
          }
        /> */}
        <label>file_url:</label>
        <input
          type="text"
          onChange={(e) =>
            setNewOverlay({ ...newOverlay, file_url: e.target.value })
          }
        />
        <button onClick={handleAddOverlay}>Add Overlay</button>
      </div>

      {/* hhhhhhhhhhhh */}
      <div className="overlay-list">
        <h3>Existing Overlays</h3>
        <ul>
          {overlays.map((overlay, index) => (
            <li key={index}>
              <span>
                Position: ({overlay.position_x}, {overlay.position_y})
              </span>
              <span>Content: {overlay.file_url}</span>
              <button onClick={() => handleDeleteOverlay(overlay._id)}>
                Delete
              </button>
              <button onClick={() => applyOverlay(index)}>Apply Overlay</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OverlayManager;
