// VideoPlayer.js

import React from "react";
import "./VideoPlayer.css";

const VideoPlayer = ({ rtspUrl }) => {
  return (
    <div className="video-container">
      <h2 className="video-title">Livestream</h2>
      <div className="video-area">
        <video className="video-player" controls>
          <source src={rtspUrl} type="application/x-rtsp" />
          Your browser does not support the video tag.
        </video>
        <span id="content">Your Logo Here</span>
      </div>
    </div>
  );
};

export default VideoPlayer;
