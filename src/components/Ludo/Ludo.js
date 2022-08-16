import './Ludo.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

import BoardCell from './../BoardCell/BoardCell'
import HomeArea from './../HomeArea/HomeArea'

const colors = {
    'A': '#ffe699',
    'B': '#b4c7e7',
    'C': '#f8cbad',
    'D': '#c5e0b4'
}

const Ludo = () => {
    const [board, setBoard] = useState(generateBoard())
    const [players, setPlayers] = useState([])
    const [status, setStatus] = useState("select_players")
    const [statusData, setStatusData] = useState("Welcome. Select 2 or more players.")

    function generateBoard() {
        let cells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        cells = [...cells, 56, 0, 0, 0, 0, 0, 0, 'B1', 0, 0, 0, 0, 0, 0, 16]
        cells = [...cells, 55, 0, 0, 0, 0, 0, 0, 'B2', 0, 0, 0, 0, 0, 0, 17]
        cells = [...cells, 54, 0, 0, 0, 0, 0, 0, 'B3', 0, 0, 0, 0, 0, 0, 18]
        cells = [...cells, 53, 0, 0, 0, 0, 0, 0, 'B4', 0, 0, 0, 0, 0, 0, 19]
        cells = [...cells, 52, 0, 0, 0, 0, 0, 0, 'B5', 0, 0, 0, 0, 0, 0, 20]
        cells = [...cells, 51, 0, 0, 0, 0, 0, 0, 'B6', 0, 0, 0, 0, 0, 0, 21]
        cells = [...cells, 50, 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'E', 'C6', 'C5', 'C4', 'C3', 'C2', 'C1', 22]
        cells = [...cells, 49, 0, 0, 0, 0, 0, 0, 'D6', 0, 0, 0, 0, 0, 0, 23]
        cells = [...cells, 48, 0, 0, 0, 0, 0, 0, 'D5', 0, 0, 0, 0, 0, 0, 24]
        cells = [...cells, 47, 0, 0, 0, 0, 0, 0, 'D4', 0, 0, 0, 0, 0, 0, 25]
        cells = [...cells, 46, 0, 0, 0, 0, 0, 0, 'D3', 0, 0, 0, 0, 0, 0, 26]
        cells = [...cells, 45, 0, 0, 0, 0, 0, 0, 'D2', 0, 0, 0, 0, 0, 0, 27]
        cells = [...cells, 44, 0, 0, 0, 0, 0, 0, 'D1', 0, 0, 0, 0, 0, 0, 28]
        cells = [...cells, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29]
        return cells
    }

    const selectPlayer = ({ player }) => {
        if (status === "playing") return
        let new_players = []
        if (!players.includes(player)) {
            new_players = [...players, player]
        } else {
            new_players = players.filter(item => item !== player)
        }
        setPlayers(new_players)
        if (new_players.length >= 2) {
            setStatus("ready")
            setStatusData("Press start to begin or select additional players.")
        } else {
            setStatus("select_players")
            setStatusData("Welcome.Select 2 or more players.")
        }
    }

    const startGame = () => {
        setStatus('playing')
    }

    const rollDice = () => {
        /* Will request a roll from server */
    }

    return (
        <div className="outer-ludo">
            <div className="ludo">
                <div className='ludo-col'>
                    <HomeArea player={'A'} color={colors['A']} chooseArea={selectPlayer} />
                    <HomeArea player={'B'} color={colors['B']} chooseArea={selectPlayer} />
                </div>
                {status === "ready" && (
                    <button onClick={startGame}>Press to begin</button>
                )}
                {status === "playing" && (
                    <div className="board">
                        {board.map((cell, index) => <BoardCell key={index} text={cell} />)}
                    </div>
                )}
                <div className='ludo-col'>
                    <HomeArea player={'C'} color={colors['C']} chooseArea={selectPlayer} />
                    <HomeArea player={'D'} color={colors['D']} chooseArea={selectPlayer} />
                </div>
            </div>
            {status === "playing" &&
                <div className="controls" id="controls">
                    <button onClick={rollDice}>Roll</button>
                </div>
            }
            <div className="status" id="statusBar">
                {statusData}
            </div>
        </div>
    )
}

export default Ludo