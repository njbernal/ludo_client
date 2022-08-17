import './HomeArea.css'
import BoardCell from '../BoardCell/BoardCell'
import { useEffect, useState } from 'react'

const HomeArea = ({ player, color, chooseArea, tokens, reportWinner }) => {
    const [homeTokens, setHomeTokens] = useState(0)
    const [readyTokens, setReadyTokens] = useState(0)

    const loadTokens = () => {
        if (tokens[0] === 'E' && tokens[1] === 'E') {
            reportWinner(player)
        }
        let home = 0
        let ready = 0
        if (tokens[0] === 'H') home += 1
        if (tokens[1] === 'H') home += 1
        if (tokens[0] === 'R') ready += 1
        if (tokens[1] === 'R') ready += 1

        setHomeTokens([...Array(home)])
        setReadyTokens([...Array(ready)])
    }

    useEffect(() => {
        loadTokens()
    }, [tokens])

    return (
        <div className='home-area' style={{ 'backgroundColor': color }} id={player} onClick={() => chooseArea({ player })}>
            <div className='player-name'>{player}</div>
            <div className='token-holder'>
                {homeTokens.length > 0 && homeTokens.map((token, index) => <BoardCell key={`home_${index}`} player={player} cell="H" />)}
            </div>
            <div className='token-holder ready-position'>
                {readyTokens.length > 0 && readyTokens.map((token, index) => <BoardCell key={`ready_${index}`} player={player} cell="R" />)}
            </div>
        </div>
    )
}

export default HomeArea