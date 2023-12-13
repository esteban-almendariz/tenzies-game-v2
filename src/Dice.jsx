import React from "react"
import './Dice.css'
//Check dice properties
function Dice(props) {
    const styles = {
        backgroundColor: props.isHeld ? '#be3144' : 'ghostwhite',
        color: props.isHeld ? 'ivory' : 'black'
    }

    return (
        <div className="die-face"
            style={styles}
            onClick={props.holdDice}
        >
            <h2>{props.value}</h2>
        </div>
    )
}

export default Dice