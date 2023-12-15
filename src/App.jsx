import React, {useState, useEffect} from 'react'
import Dice from "./Dice"
import Score from './Score'
import TenziesHeader from './TenziesHeader'
import TopScore from './TopScore'


function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  // const [score, setScore] = useState(0)
  // const [bestScore, setBestScore] = useState(0)
  const [startGame, setStartGame] = useState(false)
  const [player, setPlayer] = useState({
      playerName: '',
      score: 0
  })
  const playersFromLocalStorage = JSON.parse(localStorage.getItem('topPlayers'))
  const [topPlayers, setTopPlayers] = useState(playersFromLocalStorage ? playersFromLocalStorage : 
    [{playerName: '----', score: 0}])


  console.log('Top-Players',topPlayers)
  console.log('Player',player)
  console.log('Start Game', startGame)
  
  const playerInfo = (player) => {
    setPlayer(prevState => ({
      ...prevState,
      playerName: player
    }))
  }

  const handleStartGame = () => {
    setStartGame(true)
  }


    useEffect(() => {
        const allDiceHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const sameValue = dice.every(die => die.value === firstValue)
        let playersArray = JSON.parse(localStorage.getItem('topPlayers'))

        //check highscore present
          // if (highscore.score > 0) {
          //   setBestScore(highscore.score)
          // }
          if (allDiceHeld && sameValue) {
            setTenzies(true)

            if(topPlayers.length < 10) {
              if (topPlayers[0].score === 0) {topPlayers.shift()}
              topPlayers.push(player)
              localStorage.setItem('topPlayers', JSON.stringify(topPlayers))
            } else if(topPlayers.length >= 10) {
              if(topPlayers[9].score > player.score) {
                topPlayers.pop()
                topPlayers.push(player)
                localStorage.setItem('topPlayers', JSON.stringify(topPlayers))
              } 
            }
            

            // if (bestScore === 0) {
            //   setBestScore(score)
            //   console.log(score)
            // }
            // if (player.score <= bestScore) {
              
            //   topPlayers.push(player)
            //   localStorage.setItem('topPlayers', JSON.stringify(topPlayers))
            //   setBestScore(player.score)
            //   console.log('first if')
            // } else {
              
            //   topPlayers.push(player)
            //   localStorage.setItem('topPlayers', JSON.stringify(topPlayers))
            //   console.log('second else')
            // }
        }
      }, [dice])



  function allNewDice() {
    let newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: Math.floor(Math.random() * 9999) + 1
      })
    }
    return newDice
  }

  const diceElements = dice.map(die => {
    return <Dice value={die.value}
      isHeld={die.isHeld}
      key={die.id}
      holdDice={() => holdDice(die.id)}
    />
  })


  function rollDie() {
    setDice(oldDice => oldDice.map(die => {
      return !die.isHeld ? {
        ...die, value: Math.floor(Math.random() * 6) + 1,
        id: Math.floor(Math.random() * 9999) + 1
      } :
        die
        }))
        setPlayer(prevState => ({
          ...prevState,
          score: prevState.score + 1
        }))
        if (tenzies) {
          setDice(allNewDice)
          setTenzies(false)
          setScore(0)
          setStartGame(false)
          setPlayer({playerName: '', score: 0})
          setStartGame(false)
        }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {
        ...die, isHeld: !die.isHeld
      } :
        die
    }))
  }



  return (
    <div>
        <main>
            <TenziesHeader 
              tenzies={tenzies}
              player={playerInfo}
              startGame={handleStartGame}
              isStartGame={startGame}
            />
            {startGame && 
                <div className="dice-container">
                {diceElements}
                </div>
            }
            {startGame &&
                <Score
                  score={player.score}
                  // bestScore={bestScore}
                  tenzies={tenzies}
                  rollDie={rollDie}
                />
            }
          </main>
          <TopScore 
              topPlayers={topPlayers}
          />
    </div>
    
  )
}

export default App;

