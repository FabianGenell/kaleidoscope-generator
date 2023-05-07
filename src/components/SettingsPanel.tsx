import { Settings } from "../App"

export  const SettingsPanel: React.FC<{settings: Settings}> = ({settings}) => {
    return <>
    <div className="settings">
        <header>
            <h1>Kaleidoscope</h1>
            <p>This is a page about Kaleidoscopes!</p>
        </header>
        <nav>
            <a href="">Github</a>
            <a href="">Linkedin </a>
        </nav>
    </div>
    </>
}