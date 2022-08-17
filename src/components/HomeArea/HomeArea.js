import './HomeArea.css'
import BoardCell from '../BoardCell/BoardCell'
import { useState } from 'react'

const HomeArea = ({ player, color, chooseArea, tokens }) => {
    const [homeTokens, setHomeTokens] = useState([...Array(tokens)])
    const [readyTokens, setReadyTokens] = useState([...Array(tokens)])

    const showTokens = () => {
        return homeTokens.map(token => <BoardCell player={player} cell="H" />)
    }

    return (
        <div className='home-area' style={{ 'backgroundColor': color }} id={player} onClick={() => chooseArea({ player })}>
            <div className='player-name'>{player}</div>
            <div className='token-holder'>
                {showTokens()}
            </div>
            <div className='token-holder ready-position'>
                {showTokens()}
            </div>
        </div>
    )
}

export default HomeArea