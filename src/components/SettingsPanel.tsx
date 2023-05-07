interface Props {
    settings: {
        text?: string
    };
}

export  const SettingsPanel: React.FC<Props> = ({settings}) => {
    return <>
    <div className="settings">
        {settings.text}
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