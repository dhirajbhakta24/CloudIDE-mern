import './EditorButton.css';

export const EditorButton =({isActive})=>{
    function handleClick(){
        //implement it 
    }
    return (
        <button
        className='editor-button'
        style={{
            color : isActive ? 'white' : '#959eba' ,
            backgroundColor : isActive ? '#303242' : '#4a4859',
            borderTop : isActive ? '3px solid #c9b00e' : 'none',

        }}
        onClick={handleClick}>
            file.js
        </button>
    )
}