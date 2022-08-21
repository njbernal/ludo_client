import './Ludo.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

import BoardCell from './../BoardCell/BoardCell'
import HomeArea from './../HomeArea/HomeArea'
import Separator from './../Separator/Separator'
import Token from './../Token/Token'

const colors = {
    'A': '#ffe699',
    'B': '#b4c7e7',
    'C': '#f8cbad',
    'D': '#c5e0b4'
}

let cell_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
cell_arr = [...cell_arr, 56, 0, 0, 0, 0, 0, 0, 'B1', 0, 0, 0, 0, 0, 0, 16]
cell_arr = [...cell_arr, 55, 0, 0, 0, 0, 0, 0, 'B2', 0, 0, 0, 0, 0, 0, 17]
cell_arr = [...cell_arr, 54, 0, 0, 0, 0, 0, 0, 'B3', 0, 0, 0, 0, 0, 0, 18]
cell_arr = [...cell_arr, 53, 0, 0, 0, 0, 0, 0, 'B4', 0, 0, 0, 0, 0, 0, 19]
cell_arr = [...cell_arr, 52, 0, 0, 0, 0, 0, 0, 'B5', 0, 0, 0, 0, 0, 0, 20]
cell_arr = [...cell_arr, 51, 0, 0, 0, 0, 0, 0, 'B6', 0, 0, 0, 0, 0, 0, 21]
cell_arr = [...cell_arr, 50, 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'E', 'C6', 'C5', 'C4', 'C3', 'C2', 'C1', 22]
cell_arr = [...cell_arr, 49, 0, 0, 0, 0, 0, 0, 'D6', 0, 0, 0, 0, 0, 0, 23]
cell_arr = [...cell_arr, 48, 0, 0, 0, 0, 0, 0, 'D5', 0, 0, 0, 0, 0, 0, 24]
cell_arr = [...cell_arr, 47, 0, 0, 0, 0, 0, 0, 'D4', 0, 0, 0, 0, 0, 0, 25]
cell_arr = [...cell_arr, 46, 0, 0, 0, 0, 0, 0, 'D3', 0, 0, 0, 0, 0, 0, 26]
cell_arr = [...cell_arr, 45, 0, 0, 0, 0, 0, 0, 'D2', 0, 0, 0, 0, 0, 0, 27]
cell_arr = [...cell_arr, 44, 0, 0, 0, 0, 0, 0, 'D1', 0, 0, 0, 0, 0, 0, 28]
cell_arr = [...cell_arr, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29]

const possible_players = ['A', 'B', 'C', 'D']

const Ludo = () => {
    const [board, setBoard] = useState(null)
    const [cells, setCells] = useState(cell_arr)
    const [players, setPlayers] = useState([])
    const [status, setStatus] = useState("select_players")
    const [statusData, setStatusData] = useState("Welcome. Select 2 or more players.")
    const [topStatus, setTopStatus] = useState('')
    const [gameState, setGameState] = useState(null)
    const [currentPlayer, setCurrentPlayer] = useState(null)
    const [roll, setRoll] = useState(null)
    const [positions, setPositions] = useState(null)
    const [winner, setWinner] = useState(null)
    const [server, setServer] = useState(null)
    const [deviceType, setDeviceType] = useState("");

    const reset = () => {
        removeActiveHomes()
        setBoard(null)
        setCells(null)
        setPlayers(null)
        setStatus("select_players")
        setStatusData("Welcome. Select 2 or more players.")
        setTopStatus('')
        setGameState([])
        setCurrentPlayer(null)
        setRoll(null)
        setPositions(null)
        setWinner(null)
        setServer(null)
        document.body.style.backgroundColor = '#fff'
    }

    const generateBoard = (positions = []) => {

        const board_obj = cells.map((cell, index) => {
            const match = positions.filter(pos => pos === cell.toString())
            if (match.length > 0) {
                let stack;
                match.length === 2 ? stack = true : stack = false;
                let id = positions.indexOf(match[0])
                let player = possible_players[parseInt(id / 2)]
                return <BoardCell key={index} cell={cell} player={player} stacked={stack} />
            }
            return <BoardCell key={index} cell={cell} />
        })
        return board_obj
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
        const div = document.getElementById(player)
        div.classList.toggle("box-selected")
        if (new_players.length >= 2) {
            setStatus("ready")
            setStatusData("Press start to begin or select additional players.")
        } else {
            setStatus("select_players")
            setStatusData("Welcome.Select 2 or more players.")
        }
    }

    const startGame = async () => {
        removeActiveHomes()
        const startBtn = document.getElementById('startBtn')
        startBtn.innerHTML = 'Waking up the server... stand by.'

        const result = await axios.post(`${server}/start_ludo`, {
            'players': players,
            'game_state': [],
        })
        setCurrentPlayer(result.data.next_player)
        setPositions(result.data.result)
        setBoard(generateBoard())
        setStatus('playing')

        const top_status = <>Player <span className="status_strong">{result.data.next_player}</span> turn</>
        setTopStatus(top_status)
        setStatusData(null)
        const div = document.getElementById(result.data.next_player)
        div.classList.add('box-selected')
        document.body.style.backgroundColor = colors[result.data.next_player] + '88'
    }

    const removeActiveHomes = () => {
        const divs = document.getElementsByClassName("home-area")
        for (let div of divs) {
            div.classList.remove('home-area-hover')
            div.classList.remove('box-selected')
        }
    }

    const rollDice = async () => {
        if (winner) return
        /* Will request a roll from server */
        const roll = await axios.get(`${server}/roll`)
        setRoll(roll.data)
        playGame(currentPlayer, roll.data)
    }

    const playGame = async (player, roll) => {
        removeActiveHomes()
        if (winner) return
        const result = await axios.post(`${server}/play_game`, {
            'players': players,
            'game_state': gameState,
            'move': [player, roll]
        })
        setGameState(result.data.game_state)
        setPositions(result.data.result)
        const top_status = <>Player <span className="status_strong">{result.data.next_player}</span> turn</>
        setTopStatus(top_status)
        const new_board = generateBoard(result.data.result)
        setBoard(new_board)
        setStatusData(`${player} roll: ${roll}.`)
        setCurrentPlayer(result.data.next_player)
        const div = document.getElementById(result.data.next_player)
        div.classList.add('box-selected')
        document.body.style.backgroundColor = colors[result.data.next_player] + '88'
    }

    const checkWinner = (player) => {
        document.body.style.backgroundColor = colors[player]
        setWinner(player)
        setTopStatus(`Player ${player} has won.`)
    }

    const detectDevice = () => {
        let hasTouchScreen = false;
        if ("maxTouchPoints" in navigator) {
            hasTouchScreen = navigator.maxTouchPoints > 0;
        } else if ("msMaxTouchPoints" in navigator) {
            hasTouchScreen = navigator.msMaxTouchPoints > 0;
        } else {
            const mQ = window.matchMedia && matchMedia("(pointer:coarse)");
            if (mQ && mQ.media === "(pointer:coarse)") {
                hasTouchScreen = !!mQ.matches;
            } else if ("orientation" in window) {
                hasTouchScreen = true; // deprecated, but good fallback
            } else {
                // Only as a last resort, fall back to user agent sniffing
                var UA = navigator.userAgent;
                hasTouchScreen =
                    /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                    /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
            }
        }
        if (hasTouchScreen) {
            setDeviceType("Mobile");
        } else {
            setDeviceType("Desktop");
        }
    }

    useEffect(() => {
        detectDevice()
        let url = window.location.href
        if (url.includes('localhost')) setServer("http://localhost:5000")
        else setServer("https://njb-ludo-server.herokuapp.com/")
    }, [])

    return (
        <div className="outer-ludo">
            <h1>LUDO</h1>
            <Separator />
            <h2>A BOARD GAME</h2>
            {status === 'playing' &&
                <div className="top-status"
                    style={{
                        'backgroundImage': `linear-gradient(to right, #ffffff00, ${colors[currentPlayer]}, ${colors[currentPlayer]}, #ffffff00)`
                    }}
                >{topStatus}</div>
            }
            <div className="ludo">
                <div className='ludo-col'>
                    {positions ?
                        (<>
                            <HomeArea player={'A'} color={colors['A']} chooseArea={selectPlayer} tokens={positions.slice(0, 2)} reportWinner={checkWinner} game_status={status} device={deviceType} />
                            <HomeArea player={'D'} color={colors['D']} chooseArea={selectPlayer} tokens={positions.slice(6)} reportWinner={checkWinner} game_status={status} device={deviceType} />
                        </>) : (<>
                            <HomeArea player={'A'} color={colors['A']} chooseArea={selectPlayer} tokens={[]} reportWinner={checkWinner} game_status={status} device={deviceType} />
                            <HomeArea player={'D'} color={colors['D']} chooseArea={selectPlayer} tokens={[]} reportWinner={checkWinner} game_status={status} device={deviceType} />
                        </>)
                    }
                </div>
                {status === "ready" && (
                    <div className="start-game-btn-container">
                        <button className="start-game-btn" id="startBtn" onClick={startGame}>
                            <h3>CURRENT PLAYERS</h3>
                            <div className="current-players">
                                {players.map((player, index) => <Token key={`player_${player}_H${index}`} player={player} stacked={false} />)}
                            </div>
                            <h4>ADD MORE OR CLICK TO BEGIN</h4>
                        </button>
                    </div>
                )}
                {status === "playing" && (
                    <div className="board">
                        {board}
                    </div>
                )}
                <div className='ludo-col'>
                    {positions ?
                        (<>
                            <HomeArea player={'B'} color={colors['B']} chooseArea={selectPlayer} tokens={positions.slice(2, 4)} reportWinner={checkWinner} game_status={status} device={deviceType} />
                            <HomeArea player={'C'} color={colors['C']} chooseArea={selectPlayer} tokens={positions.slice(4, 6)} reportWinner={checkWinner} game_status={status} device={deviceType} />
                        </>) : (<>
                            <HomeArea player={'B'} color={colors['B']} chooseArea={selectPlayer} tokens={[]} reportWinner={checkWinner} game_status={status} device={deviceType} />
                            <HomeArea player={'C'} color={colors['C']} chooseArea={selectPlayer} tokens={[]} reportWinner={checkWinner} game_status={status} device={deviceType} />
                        </>)
                    }
                </div>
            </div>
            {status === "playing" && !winner &&
                <div className="controls" id="controls">
                    <button style={{
                        'border': `2px solid ${colors[currentPlayer]}aa`,
                    }} onClick={rollDice}>Roll</button>
                </div>
            }
            {/* <div className="status" id="statusBar">
                {statusData}
            </div> */}

            {status === "playing" && !winner && roll &&
                <div className="roll" id="roll" style={{ 'backgroundColor': colors[currentPlayer] }}>
                    <h3>LATEST ROLL</h3>
                    {roll}
                </div>
            }

            {winner &&
                <div className="controls" id="controls">
                    <button style={{
                        'border': `2px solid ${colors[currentPlayer]}aa`,
                    }} onClick={reset}>New Game</button>
                </div>
            }
        </div>
    )
}

export default Ludo