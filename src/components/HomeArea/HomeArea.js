import './HomeArea.css'
import BoardCell from '../BoardCell/BoardCell'
import Token from '../Token/Token'

import { useEffect, useState } from 'react'

const HomeArea = ({ player, color, chooseArea, tokens, reportWinner, game_status, device }) => {
    const [homeTokens, setHomeTokens] = useState(null)
    const [readyTokens, setReadyTokens] = useState(null)
    const [status, setStatus] = useState(null)

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
        if (tokens.length === 0) {
            setStatus(null)
        }
        else if (tokens[0] === null || tokens[1] === null) setStatus(null)
        else setStatus(game_status)

        setHomeTokens([...Array(home)])
        setReadyTokens([...Array(ready)])
    }

    const checkDevice = () => {
        if (device == 'Mobile') {
            const div = document.getElementById(player)
            div.classList.add('mobile-home-area')
            div.classList.remove('home-area')
        }
    }

    useEffect(() => {
        loadTokens()
    }, [tokens])

    return (
        <div className='home-area home-area-hover' style={{ 'backgroundColor': color }} id={player} onClick={() => chooseArea({ player })}>
            <div className='player-name'>{player}</div>
            {
                status === "playing" && (
                    <div className="home-inner">
                        <h3>Home Area</h3>
                        <div className='token-holder'>
                            {homeTokens.map((token, index) => <Token key={`player_${player}_H${index}`} player={player} stacked={false} />)}
                        </div>
                    </div>
                )
            }
            {
                status === 'playing' && (
                    <div className="home-inner">
                        <h3>Ready To Go</h3>
                        <div className='token-holder ready-position'>
                            {readyTokens.map((token, index) => <Token key={`player_${player}_R${index}`} player={player} stacked={false} />)}
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default HomeArea