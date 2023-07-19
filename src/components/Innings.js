const Innings = ({inningsPerGame, inningsPerMatch}) => {
    return (
        <div className="inning-wrap">
            <div className="inning">
                <p>Game Innings</p>
                <div>
                    <span>{inningsPerGame}</span>
                </div>
            </div>
            <div className="inning">
                <p>Match Innings</p>
                <div>
                    <span>{inningsPerMatch}</span>
                </div>
            </div>
        </div>
    )
}

export default Innings;
