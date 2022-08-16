import './Token.css'

const colors = {
    'A': '#ffc000',
    'B': '#5b9bd5',
    'C': '#ed7d31',
    'D': '#70ad47'
}

const Token = ({ token, player }) => {
    return (
        <div className='token' style={{ 'backgroundColor': colors[player] }}>{token}</div>
    )
}

export default Token