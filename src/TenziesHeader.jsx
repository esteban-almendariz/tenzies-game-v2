import { useState } from 'react'
import './TenziesHeader.css'

function TenziesHeader({tenzies, player, startGame, isStartGame}) {
    
    const [playerName, setPlayerName] = useState('')
    const [inputError, setInputError] = useState('')

    const handleNameChange = (e) => {
        setPlayerName(e.target.value)
    }

    const clickHandleStartGame = (e) => {
        e.preventDefault()
        if (playerName.length > 2) {
            player(playerName)
            startGame()
            setInputError('')
        } else{setInputError('Use at least 3 characters')}
    }

    console.log(isStartGame)

    return (
        <div className='header'>
            <h1 className="title">{tenzies ? 'You Won!' : 'Tenzies'}</h1> 
                    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                    {!isStartGame &&
                        <form className='startgame-container'>
                            <h1>Enter name to start game</h1>
                            <input 
                                type='text'
                                placeholder='Name'
                                onChange={handleNameChange}
                            />
                            <span className='input-error'>{inputError}</span>
                            <button onClick={clickHandleStartGame} className='roll-dice'>Start Game</button>
                        </form>
                    }
        </div>
    )
}

export default TenziesHeader;