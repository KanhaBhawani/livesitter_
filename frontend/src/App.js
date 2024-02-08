import { useEffect, useState } from 'react';
import './App.css';
import OverlayManager from './components/OverlayManager';
import VideoPlayer from './components/VideoPlayer';
import axios from 'axios';

function App() {
  const baseURL = 'http://localhost:5000/api';
  const rtspUrl = "rtsp://rtsp.stream/pattern";
  const [overlays, setOverlays] = useState([]);

  useEffect(() => {
    // Fetch saved overlays from backend
    axios.get(baseURL + '/overlays')
      .then(response => {
        setOverlays(response.data)
      })
      .catch(error => {
        console.error('Error fetching overlays:', error);
      });
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Livestream App</h1>

      {/* Landing Page */}
      <VideoPlayer rtspUrl={rtspUrl} />

      {/* Overlay Manager */}
      <>
        {overlays?<OverlayManager overlays={overlays}/>:<></>}
      </>
      

      {/* Additional UI components */}
      {/* ... */}
    </div>
  );
}

export default App;
