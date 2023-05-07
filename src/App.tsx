import { useState } from 'react'
import './App.css'
import {SettingsPanel} from './components/SettingsPanel'
import {Canvas} from './components/Canvas'

export interface Settings {
  segments: number;
  bidirectional: boolean;
  speedmultiplier: number;
  angle: {
    timemultiplier: number;
    multiplier: number;
  }
}

function App() {
  const [settings, setSettings] = useState<Settings>()

  return (
    <>
  <Canvas/>
    <SettingsPanel settings={{text: 'test'}}/>

    </>
  )
}

export default App
