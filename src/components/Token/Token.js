import './Token.css'

const colors = {
    'A': '#ffc000',
    'B': '#5b9bd5',
    'C': '#ed7d31',
    'D': '#70ad47'
}

const Token = ({ token, player, stacked }) => {
    return (
        <>
            {!stacked ? (
                <div className='token' style={{ 'backgroundColor': colors[player] }}></div>
            ) : (
                <div className="stacked">
                    <div className='token' style={{ 'backgroundColor': colors[player] }}></div>
                    <div className='token top' style={{ 'backgroundColor': colors[player] }}></div>
                </div>
            )}
        </>
    )
}

export default Token