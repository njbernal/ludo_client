import './HomeArea.css'
import BoardCell from '../BoardCell/BoardCell'

const HomeArea = ({ player, color, chooseArea }) => {
    return (
        <div className='home-area' style={{ 'backgroundColor': color }} id={player} onClick={() => chooseArea({ player })}>
            <div className='player-name'>{player}</div>
            <div className='token-holder'>
                <BoardCell player={player} />
                <BoardCell player={player} />
            </div>
            <div className='ready-position'></div>
        </div>
    )
}

export default HomeArea