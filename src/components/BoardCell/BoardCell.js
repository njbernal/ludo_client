import { useState } from 'react'
import './BoardCell.css'

import Token from '../Token/Token'

const colors = {
    'A': '#ffe699',
    'B': '#b4c7e7',
    'C': '#f8cbad',
    'D': '#c5e0b4'
}

const BoardCell = ({ player, cell }) => {
    const [text, setText] = useState(cell)

    const makeStyle = () => {
        const style = {}
        if ((text >= 1) && (text <= 56)) {
            style['backgroundColor'] = '#c3aaff';
            style['borderLeft'] = '1px solid white';
            style['borderTop'] = '1px solid white'
        } else if (typeof text == 'string') {
            style['backgroundColor'] = colors[player];
            style['borderTop'] = '1px solid white'
            style['borderLeft'] = '1px solid white'
        } else if (text == 0) {
            style['backgroundColor'] = '#9d89cb';
            style['borderTop'] = '1px solid #9d89cb'
            style['borderLeft'] = '1px solid #9d89cb'
        }
        return style
    }
    return (
        <div className="board-cell" style={makeStyle()}>
            {!player && text != 0 && <div>{text}</div>}
            {player && <Token key={`player_${player}_${cell}`} player={player} />}
        </div>
    )
}

export default BoardCell