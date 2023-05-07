export const ShowButton: 
React.FC<{setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;}>
 = ({setShowSettings}) => {
    return <div className="show-button-container">
        <button onClick={() => setShowSettings(true)} className="show-button">Show Settings</button>
    </div>
}