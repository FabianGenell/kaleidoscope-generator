import { Dispatch } from 'react'

import { Settings } from "../App"

const images = [
    "crazy-light.jpg",
    "flowers.jpg",
    "glitterpaint.jpg",
    "many-flowers.jpg",
    "paint.jpg",
    "pink-flowers.jpg",
    "red-flowers.jpg",
    "trails-1.jpg",
    "trails-2.jpg",
    "trails-3.jpg",
    "city.jpg",
];


export const SettingsPanel: React.FC<{
    settings: Settings;
    setSettings: Dispatch<React.SetStateAction<Settings>>;
}> = ({ settings, setSettings }) => {

    function updateNumber(e) {
        const newSettings = {...settings};

        newSettings[e.target.name] = e.target.value;
        
        // console.log(newSettings)
        setSettings(newSettings)
    }

    function updateBoolean(e) {
        const newSettings = {...settings};
        newSettings[e.target.name] = !newSettings[e.target.name];
        console.log(newSettings)
        setSettings(newSettings)

    }

    function updateImage(e) {
        const newSettings = {...settings};

        newSettings.image_url = `./img/${e.target.value}`;
        
        setSettings(newSettings)
    }

    return <>
        <div className="settings">
            <header>
                <h1>Kaleidoscope</h1>
            </header>
            <form>
                <div className='setting'>
                    <label htmlFor="image">Image</label>
                    <select name="iamge" id="image" onChange={updateImage}>
                        {images.map((image, index) => {
                            return <option key={index} value={image}>{image}</option>
                        })}
                    </select>
                </div>
                <div className='setting'>
                    <label htmlFor="segments">Segments</label>
                    <input type="number" name="segments" id="segments" min={2} value={settings.segments} onChange={updateNumber} />
                </div>

                <div className='setting'>
                    <label htmlFor="speedmultiplier">Speedmultiplier</label>
                    <input type="number" name="speedmultiplier" id="speedmultiplier" value={settings.speedmultiplier} onChange={updateNumber} />
                </div>

                <div className='setting'>
                    <label htmlFor="throbing">Throbing</label>
                    <input type="checkbox" name="throbing" id="throbing" checked={settings.throbing} onChange={updateBoolean} />
                </div>

                <div className='setting'>
                    <label htmlFor="throbing_amount">Throbing amount</label>
                    <input type="number" name="throbing_amount" id="throbing_amount" value={settings.throbing_amount} onChange={updateNumber} />
                </div>

                <div className='setting'>
                    <label htmlFor="throbing_speed">Throbing speed</label>
                    <input type="number" name="throbing_speed" id="throbing_speed" value={settings.throbing_speed} onChange={updateNumber} />
                </div>

                <div className='setting'>
                    <label htmlFor="zoom">Zoom</label>
                    <input type="number" name="zoom" id="zoom" value={settings.zoom} onChange={updateNumber} />
                </div>

                <div className='setting'>
                    <label htmlFor="bidirectional">Bidirectional</label>
                    <input type="checkbox" name="bidirectional" id="bidirectional" checked={settings.bidirectional} onChange={updateBoolean} />
                </div>

                <div className='setting'>
                    <label htmlFor="bidirectional_segments">Bidirectional segments</label>
                    <input type="checkbox" name="bidirectional_segments" id="bidirectional_segments" checked={settings.bidirectional_segments} onChange={updateBoolean} />
                </div>

                <div className='setting'>
                    <label htmlFor="segment_throbing">Segment throbing</label>
                    <input type="checkbox" name="segment_throbing" id="segment_throbing" checked={settings.segment_throbing} onChange={updateBoolean} />
                </div>
                
                <div className='setting'>
                    <label htmlFor="segment_throbing_limit">Segment throbing limit</label>
                    <input type="number" name="segment_throbing_limit" id="segment_throbing_limit" value={settings.segment_throbing_limit} onChange={updateNumber} />
                </div>

{/* 
                <label htmlFor="offset">offset</label>
                <input type="number" name="offset" id="offset" value={settings.offset} /> */}
            </form>
            <nav>
                <a href="">Github</a>
                <a href="">Linkedin </a>
            </nav>
        </div>
    </>
}
