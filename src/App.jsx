import React, {useState, useEffect} from 'react'
import Dice from "./Dice"
import Score from './Score'
import TenziesHeader from './TenziesHeader'
import TopScore from './TopScore'


function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [startGame, setStartGame] = useState(false)
  const [player, setPlayer] = useState({
      playerName: '',
      score: ''
  })
  const [topPlayers, setTopPlayers] = useState()

  console.log(player)
  
  const playerInfo = (player) => {
    setPlayer(prevState => ({
      ...prevState,
      playerName: player
    }))
  }


    useEffect(() => {
    const allDiceHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const sameValue = dice.every(die => die.value === firstValue)
    let highscore = JSON.parse(localStorage.getItem('bestscore'))

    //check highscore present
      if (highscore) {
        setBestScore(highscore)
      }
      if (allDiceHeld && sameValue) {
        setTenzies(true)
        if (bestScore === 0) {
          setBestScore(score)
          console.log(score)
        }
        if (score < bestScore) {
          localStorage.setItem('bestscore', JSON.stringify(score))
          setBestScore(score)
          console.log(score, bestScore)
        } else {
          localStorage.setItem('bestscore', JSON.stringify(score)
          )
        }
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
    setScore(prevState => prevState + 1)

    if (tenzies) {
      setDice(allNewDice)
      setTenzies(false)
      setScore(0)
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
          />
          <div className="dice-container">
            {diceElements}
          </div>
          <Score
            score={score}
            bestScore={bestScore}
            tenzies={tenzies}
            rollDie={rollDie}
          />
      </main>
      <TopScore />
    </div>
    
  )
}

export default App;

