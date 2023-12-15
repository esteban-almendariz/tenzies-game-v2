
import './TopScore.css'

const TopScore = ({topPlayers}) => {

   
    const sortedPlayers = topPlayers.sort((a,b) => a.score - b.score)

    const listTopPlayers = sortedPlayers.map(player => {
            return <li>
                    <span>{player.playerName}</span>
                    <span>{player.score}</span>
                </li>
        })
    
    return (
        <div className="topscore-container">
            <h1>Top 10 Scores</h1>
            <div className='name-score-container'>
                <h2>Name</h2>
                <h2>Score</h2>
            </div>
            <ul className='topscores-list'>
                {listTopPlayers}
            </ul>
        </div>
    )
}

export default TopScore