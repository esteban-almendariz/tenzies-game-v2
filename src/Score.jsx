import React from "react"
import './Score.css'

const Score = ({score, bestScore, rollDie, tenzies}) => {

    return (
        <div className="score-bottom-container">
            <div className="score-container">
                <h3>Current Score: {score}</h3>
                {/* <h3>Best Score: {bestScore}</h3> */}
            </div>
            <button className="roll-dice" onClick={rollDie}>{tenzies ? 'New Game' : "Roll"}</button>
        </div>
    )
}

export default Score;