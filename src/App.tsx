import { useState } from 'react'
import './App.css'
import {SettingsPanel} from './components/SettingsPanel'
import {Canvas} from './components/Canvas'
import { ShowButton } from './components/ShowButton';

export interface Settings {
  image_url?: string;
  segments: number;
  speedmultiplier: number;
  throbing: boolean;
  throbing_amount: number;
  throbing_speed: number;
  zoom: number;
  bidirectional: boolean;
  bidirectional_segments: boolean;
  segment_throbing: boolean;
  segment_throbing_limit: number;
  offset: number;
}

function App() {
  const [settings, setSettings] = useState<Settings>(
    { 
      image_url: './img/crazy-light.jpg',
      segments: 32,
      speedmultiplier: 1,
      throbing: false,
      throbing_amount: 3,
      throbing_speed: 0.5,
      zoom: 2,
      bidirectional: false,
      bidirectional_segments: true,
      segment_throbing: false,
      segment_throbing_limit: 0.5,
      offset: 100,
  });
  const [showSettings, setShowSettings] = useState(true);

  return (
    <>
    <Canvas settings={settings}/>
    {showSettings ?
     <SettingsPanel settings={settings} setSettings={setSettings} setShowSettings={setShowSettings}/>
      : <ShowButton setShowSettings={setShowSettings}/>}

    </>
  )
}

export default App
