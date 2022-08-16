import { useState } from 'react'
import './BoardCell.css'

import Token from '../Token/Token'

const BoardCell = ({ player, text }) => {
    return (
        <div className="board-cell">
            {!player && text != 0 && <div>{text}</div>}
            {player && <Token player={player} />}
        </div>
    )
}

export default BoardCell