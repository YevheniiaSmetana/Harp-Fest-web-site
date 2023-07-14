import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ReactPlayer from 'react-player';
import bubble from '../images/bubble.png';
import harp from '../images/harp.png';
import frame1 from '../images/frame1.png';
import leaf1 from '../images/leaf1.png';
import frame2 from '../images/frame2.png';
import leaf2 from '../images/leaf2.png';
import frame3 from '../images/frame3.png';
import leaf3 from '../images/leaf3.png';
import spray from '../images/spray.gif';
import harpFestival from '../images/harpFestival.png';

const Bubble = () => {
  const [size, setSize] = useState(10);
  const [position, setPosition] = useState(0);
  const [showHarp, setShowHarp] = useState(true);
  const [showBubble, setShowBubble] = useState(true);
  const [harpTransition, setHarpTransition] = useState(false);
  const [dimScreen, setDimScreen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const radiusX = window.innerWidth * 0.4; 
  const radiusY = window.innerHeight * 0.4; 
  const [isSwitching, setIsSwitching] = useState(false);
  const [activeVideo, setActiveVideo] = useState(1); 
  const [leafToHarp, setLeafToHarp] = useState(false);
  const [video1Duration, setVideo1Duration] = useState<number>(0);
  const [video2Duration, setVideo2Duration] = useState<number>(0);
  const [video3Duration, setVideo3Duration] = useState<number>(0);
  const [videoStarted, setVideoStarted] = useState(false);
  const [showSpray, setShowSpray] = useState(false);
  const [sprayDuration, setSprayDuration] = useState(400);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const targetSize = Math.min(windowHeight, windowWidth) * 0.75; 
    const targetPosition = windowWidth / 2 - targetSize / 3 + targetSize * 0.2;
    const speed = (targetPosition - position) / 300;

    const timer = setInterval(() => {
      setPosition(prevPosition => {
        let newPosition = prevPosition + speed;
        if (newPosition >= targetPosition) {
          clearInterval(timer);
          newPosition = targetPosition;
          setShowBubble(false);
          setDimScreen(false); 
          setTimeout(() => {
            setShowHarp(false);
            setTimeout(() => {
              setHarpTransition(true);
            }, 50);
          }, 2000);
        }

        return newPosition;
      });

      setSize(prevSize => {
        const newSize = prevSize + speed;
        return newSize;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!showBubble) {
      setShowSpray(true);
      setTimeout(() => setShowSpray(false), sprayDuration);
    }
  }, [showBubble]);

  const sprayStyle: React.CSSProperties = {
    width : `${size *2.2}px`,
    height : `${size *2.2}px`,
    position: 'absolute',
    top : '50%',
    left : `${position + size / 20}px`,
    transform: 'translate(-50%, -50%)',
    backgroundImage: `url(${spray})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: showSpray ? 'block' : 'none',
    opacity: 0.5, 
  };

  const bubbleStyle: React.CSSProperties = {
    width : `${size}px`,
    height : `${size}px`,
    position: 'absolute',
    top : '50%',
    left : `${position}px`,
    transform: 'translate(-50%, -50%)',
    backgroundImage: `url(${bubble})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: showBubble ? 'block' : 'none',
  };

  const harfStyle: React.CSSProperties = {
    width : `${size / 5}px`,
    height : `${size / 5}px`,
    position: 'absolute',
    top : '50%',
    left : `${position + size / 20}px`,
    transform: 'translate(-50%, -50%)',
    backgroundImage: `url(${harp})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: showHarp ? 'block' : 'none',
  };

  const frame1Style: React.CSSProperties = {
    width : `${size *1.22 }px`,
    height : `${size *1.22}px`,
    backgroundImage: `url(${frame1})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: dimScreen ? 'none' : 'block',
    position: 'absolute',
    top : '50%',
    left : isSwitching ? (activeVideo === 1 ? '48%' : (activeVideo === 2 ? '-12%' : '108%')) : (activeVideo === 1 ? '48%' : (activeVideo === 2 ? '-10%' : '110%')),
    transform: 'translate(-50%, -50%) rotate(90deg)',
    pointerEvents: 'none', 
    transition: 'left 2s' 
  };

  const frame2Style: React.CSSProperties = {
    width : `${size *1.25 }px`,
    height : `${size *1.23}px`,
    backgroundImage: `url(${frame2})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: dimScreen ? 'none' : 'block',
    position: 'absolute',
    top : '50%',
    left : isSwitching ? (activeVideo === 2 ? '-8%' : (activeVideo === 3 ? '-68%' : '50%')) : (activeVideo === 2 ? '50%' : (activeVideo === 3 ? '-10%' : '50%')),
    transform: 'translate(50%, -50%)', 
    pointerEvents: 'none',
    transition: 'left 2s'
  };

  const frame3Style: React.CSSProperties = {
    width : `${size *1.3 }px`,
    height : `${size *1.3}px`,
    backgroundImage: `url(${frame3})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: dimScreen ? 'none' : 'block',
    position: 'absolute',
    top : '50%',
    left : isSwitching ? (activeVideo === 3 ? '-10%' : (activeVideo === 1 ? '-68%' : '48%')) : (activeVideo === 3 ? '50%' : (activeVideo === 1 ? '-67%' : '110%')),
    transform: 'translate(50%, -50%)', 
    pointerEvents: 'none',
    transition: 'left 2s'
  };

  const harpAfterBubbleStyle: React.CSSProperties = {
    width : `${size / 5}px`,
    height : `${size / 5}px`,
    position: 'absolute',
    top : harpTransition ? '40%' : '40%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: !showHarp && !showBubble ? 'block' : 'none',
    transition: 'top 2s, left 2s',
  };

  const harpLeafStyle: React.CSSProperties = {
    position: 'absolute',
    width : `${size / 5}px`,
    height : `${size / 5}px`,
    backgroundImage: `url(${videoStarted ? (activeVideo === 1 ? leaf1 : activeVideo === 2 ? leaf2 : leaf3) : harp})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: harpTransition ? 'block' : 'none',
    transition: 'top 2s, left 2s',
    left : `calc(50% + ${Math.sin((playbackTime/(activeVideo === 1 ? video1Duration : activeVideo === 2 ? video2Duration : video3Duration))*2*Math.PI)*radiusX}px - ${size / 10}px)`,
    top : `calc(55% - ${Math.cos((playbackTime/(activeVideo === 1 ? video1Duration : activeVideo === 2 ? video2Duration : video3Duration))*2*Math.PI)*radiusY}px - ${size / 10}px)`, 
  };  
  
  const backgroundStyle: React.CSSProperties = {
    background: '#13293D',
    height : '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const videoStyle: React.CSSProperties = {
    position: 'absolute',     
    top : 0,     
    bottom : 0,     
    left : isSwitching ? (activeVideo === 1 ? '0%' : (activeVideo === 2 ? '-60%' : '60%')) : (activeVideo === 1 ? '0%' : (activeVideo === 2 ? '-11%' : '111%')),
    right : '0%',     
    display: dimScreen ? 'none' : 'flex',     
    justifyContent: 'center',     
    alignItems: 'center',     
    width : '100%',     
    height : '100%',     
    transition: 'left 2s',     
    opacity: (!dimScreen && activeVideo === 1) ? 1 : 0.3,
    pointerEvents: activeVideo === 1 ? 'auto' : 'none', 
  };

  const video2Style: React.CSSProperties = {
    position: 'absolute',     
    top : 0,     
    bottom : 0,     
    left : isSwitching ? (activeVideo === 1 ? '60%' : activeVideo === 2 ? '0%' : '-60%') : activeVideo === 1 ? '60%' : activeVideo === 2 ? '60%' : '-60%',
    display: dimScreen ? 'none' : 'flex',     
    justifyContent: 'center',     
    alignItems: 'center',     
    width : '100%',     
    height : '100%',     
    transition: 'left 2s',     
    opacity: isPlaying && activeVideo === 2 ? 1 : 0.3, 
    pointerEvents: activeVideo === 2 ? 'auto' : 'none', 
  };

  const video3Style: React.CSSProperties = {
    position: 'absolute',     
    top : 0,     
    bottom : 0,     
    left : isSwitching ? (activeVideo === 1 ? '-60%' : activeVideo === 2 ? '60%' : '0%') : activeVideo === 1 ? '-60%' : activeVideo === 2 ? '60%' : '-60%',
    display: dimScreen ? 'none' : 'flex',     
    justifyContent: 'center',     
    alignItems: 'center',     
    width : '100%',     
    height : '100%',     
    transition: 'left 2s',     
    opacity: isPlaying && activeVideo === 3 ? 1 : 0.3, 
    pointerEvents: activeVideo === 3 ? 'auto' : 'none', 
  };
  
  const switchToNextVideo = () => {
    setIsSwitching(true);
    setIsPlaying(false);
    const nextVideo = activeVideo === 3 ? 1 : activeVideo + 1;
    setActiveVideo(nextVideo);
    setTimeout(() => {
      setIsPlaying(true);
      setPlaybackTime(0);
      setDuration(nextVideo === 1 ? video1Duration : nextVideo === 2 ? video2Duration : video3Duration);
      if (nextVideo !== 1) {
        setLeafToHarp(false);
      }
    }, 2000);
  };

  const switchToPreviousVideo = () => {
    setIsSwitching(true);
    setIsPlaying(false);
    const previousVideo = activeVideo === 1 ? 3 : activeVideo - 1;
    setActiveVideo(previousVideo);
    setTimeout(() => {
      setIsPlaying(true);
      setPlaybackTime(0);
      setDuration(previousVideo === 1 ? video1Duration : previousVideo === 2 ? video2Duration : video3Duration);
      if (previousVideo !== 1) {
        setLeafToHarp(false);
      }
    }, 2000);
  };

  const dimScreenStyle: React.CSSProperties = {
    background: 'rgba(0, 0, 0, 0.5)', 
    position: 'absolute',
    top : 0,
    bottom : 0,
    left : 0,
    right : 0,
    display: dimScreen ? 'block' : 'none', 
  };

  return (
    <div style={{ overflow: 'hidden', height : '100vh', width : '100vw' }}>
      <img 
        src={harpFestival} 
        alt="Harp Festival"
        style={{
          position: 'absolute',
          top : '4vh',
          left : '10vh',
          width : '70vh', 
          height : 'auto', 
          display: dimScreen ? 'none' : 'flex',
        }}
      />
      <div style={backgroundStyle}>
        <div style={videoStyle}>
          <ReactPlayer 
            url="https://www.youtube.com/watch?v=sbP_tzavdco" 
            onPlay={() => {
              setIsPlaying(true); 
              setVideoStarted(true); 
            }}  
            onEnded={() => {
              setLeafToHarp(true);
              setVideoStarted(false); 
            }}
            onProgress={({playedSeconds}) => activeVideo === 1 && setPlaybackTime(playedSeconds)}
            onDuration={(dur) => {setDuration(dur); setVideo1Duration(dur)}}
            controls={true} 
            width='50%'
            height='50%'
          />
        </div>
        <div style={video2Style}>
          <ReactPlayer 
            url="https://www.youtube.com/watch?v=ylE7oHxyl_0" 
            onPlay={() => {
              setIsPlaying(true); 
              setVideoStarted(true);
            }} 
            onEnded={() => {
              setLeafToHarp(true);
              setVideoStarted(false); 
            }}
            onProgress={({playedSeconds}) => activeVideo === 2 && setPlaybackTime(playedSeconds)}
            onDuration={(dur) => {setDuration(dur); setVideo2Duration(dur)}}
            controls={true} 
            width='50%'
            height='50%'
          />
        </div>
        <div style={video3Style}>
          <ReactPlayer 
            url="https://www.youtube.com/watch?v=XJI7gZxFyNo" 
            onPlay={() => {
              setIsPlaying(true); 
              setVideoStarted(true); 
            }}    
            onEnded={() => {
              setLeafToHarp(true);
              setVideoStarted(false); 
            }}
            onProgress={({playedSeconds}) => activeVideo === 3 && setPlaybackTime(playedSeconds)}
            onDuration={(dur) => {setDuration(dur); setVideo3Duration(dur)}}
            controls={true} 
            width='50%'
            height='50%'
          />
        </div>
        <div style={frame1Style} />
        <div style={frame2Style} />
        <div style={frame3Style} />
        <div style={dimScreenStyle} />
        <div style={bubbleStyle} />
        <div style={sprayStyle} />
        {showHarp && <div style={harfStyle} />}
        {!showHarp && !showBubble && 
          <div style={harpTransition ? harpLeafStyle : harpAfterBubbleStyle} />
        }
        <IoIosArrowBack 
          onClick={switchToPreviousVideo} 
          style={{ 
            position: 'absolute', 
            top : '80%', 
            left : '10px', 
            color: '#B5965A', 
            display: dimScreen ? 'none' : 'flex',
            cursor: 'pointer'  
          }} 
          size='10vh'
        />
        <IoIosArrowForward 
          onClick={switchToNextVideo} 
          style={{ 
            position: 'absolute', 
            top : '80%', 
            right : '10px', 
            color: '#B5965A', 
            display: dimScreen ? 'none' : 'flex' ,
            cursor: 'pointer' 
          }} 
          size='10vh'
        />
      </div>
    </div>
  );
};

export default Bubble;