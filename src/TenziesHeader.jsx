import { useState } from 'react'
import './TenziesHeader.css'

function TenziesHeader({tenzies, player, startGame}) {
    
    const [playerName, setPlayerName] = useState('')

    const handleNameChange = (e) => {
        setPlayerName(e.target.value)
    }

    const clickHandleStartGame = (e) => {
        e.preventDefault()
        if (playerName.length > 2) {
            player(playerName)
            startGame()
            
        }
       
    }

    return (
        <div className='header'>
            <h1 className="title">{tenzies ? 'You Won!' : 'Tenzies'}</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <form className='startgame-container'>
                <h1>Enter name to start game</h1>
                <input 
                    type='text'
                    placeholder='Name'
                    onChange={handleNameChange}
                />
                <button onClick={clickHandleStartGame} className='roll-dice'>Start Game</button>
            </form>
        </div>
    )
}

export default TenziesHeader;