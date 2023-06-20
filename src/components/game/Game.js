import { useState } from 'react';
import '../../assets/css/game.css'
import Board from './Board';

function Game() {
    const [rows, setRows] = useState(3);
    const [columns, setColumns] = useState(3);
    const [cellswin, setCellwin] = useState(3);
    const [currentPlayer, setCurrentPlayer] = useState('')
    const [winner, setWinner] = useState(null);
    const [isRefresh, setIsRefresh] = useState(false)

    const handleRefresh = () => {
        setIsRefresh(!isRefresh);
    }


    const handleData = (data) => {
        console.log(data)
        setCurrentPlayer(data.currentPlayer);
        setWinner(data.winner)
    }

    const handleRowsChange = (e) => {
        setRows(parseInt(e.target.value));
    };

    const handleColumnsChange = (e) => {
        setColumns(parseInt(e.target.value));
    };

    const handleCellWinChange = (e) => {
        setCellwin(parseInt(e.target.value));
    };

    return (
        <div className="container">
            <h1>Tic-toc-toe</h1>
            <div className="fill_infos">
                <div className="fill_info">
                    <label>Nhập số hàng</label>
                    <input type="number" placeholder="Nhập hàng" value={rows} onChange={handleRowsChange}/>
                </div>
                <div className="fill_info">
                    <label>Nhập số cột</label>
                    <input type="number" placeholder="Nhập cột" value={columns} onChange={handleColumnsChange}/>
                </div>
                <div className="fill_info">
                    <label>Nhập số ô thắng liên tiếp</label>
                    <input type="number" placeholder="Enter ô thắng liên tiếp" value={cellswin} onChange={handleCellWinChange}/>
                </div>
                {winner && (winner === 'Draw' ? (<h3>hòa</h3>) : (<h3>{winner}  thắng</h3>))}
                
            </div>
            <div className="chessboard">
                <Board cellwins={cellswin}
                    rows={rows}
                    columns={columns}
                    sendData={handleData}
                    isRefresh={isRefresh}
                    ></Board>
            </div>
            <div className="luot_choi">
                <h3>Lượt chơi: {currentPlayer}</h3>
            </div>
            <button onClick={() => handleRefresh()}>Chơi lại</button>
        </div>
    )
}

export default Game;