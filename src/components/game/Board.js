import { useState, useEffect, useRef, memo } from "react"

function Board({ rows, columns, cellwins, sendData, isRefresh }) {
    const [board, setBoard] = useState([])
    const [currentPlayer, setCurrentPlayer] = useState('X')
    const [winner, setWinner] = useState(null)
    const boardOld = useRef([])

    const data = {currentPlayer, winner};
    sendData(data)

    useEffect(() => {
        initBoard()
    }, [rows, columns, isRefresh])

    useEffect(() => {
        const oldBoard = boardOld.current;

    if (oldBoard && oldBoard.length > 0 && oldBoard.length === board.length) {
      const newBoard = board.map((row, rowIndex) =>
        row.map((cell, columnIndex) => {
          // Kiểm tra xem cell tại vị trí [rowIndex][columnIndex] có thay đổi so với giá trị cũ hay không
          if (cell !== oldBoard[rowIndex][columnIndex]) {
            console.log('Vị trí mới:', rowIndex, columnIndex);
            checkWin(rowIndex, columnIndex)
          }
          return cell;
        })
      );

      console.log('Old board:', oldBoard);
      console.log('New board:', board);
    }

    boardOld.current = [...board];
    
    },[board])

    const initBoard = () => {
        const newboard = Array(rows).fill(Array(columns).fill(null))
        setBoard(newboard)
        setCurrentPlayer('X')
    }

    const handleChoose = (row, column) => {
        if (board[row][column] || winner) {
          return;
        }

        setBoard((prevBoard) => {
            const newBoard = prevBoard.map((row) => [...row]);
            newBoard[row][column] = currentPlayer;
            return newBoard;
        });
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };

    const checkWin = (row, column) => {
        const player = board[row][column];
        console.log(player)

        let count=0;
        for(let i=0;i<columns;i++) {
            if(board[row][i] === player) {
                count++;
            } else {
                count =0;
            }
            if(count >= cellwins) {
                setWinner(player)
                return;
            }
        }

        count=0;
        for(let i=0;i<rows;i++) {
            if(board[i][column] === player) {
                count++;
            } else {
                count=0;
            }

            if(count >= cellwins) {
                setWinner(player)
                return;
            }
        }

        count=0;
        for(let i=0;i<rows;i++) {
            if(board[i][i] === player) {
                count++;
            } else {
                count =0;
            }

            if(count >= cellwins) {
                setWinner(player)
                return;
            }
        }

        count=0;
        for(let i=0;i<rows;i++) {
            if(board[i][columns -1-i] === player) {
                count++;
            } else {
                count=0;
            }

            if(count >= cellwins) {
                setWinner(player)
                return;
            }
        }

        if (board.every(row => row.every(cell => cell !== null))) {
            setWinner('Draw')
        }
        
        
    }
    
      
    
    
    

    return (
        <div>
            {board.map((row, rowIndex) => (
                <div className="rowboard" key={rowIndex}>
                {row.map((cell, colIndex) => (
                    <div
                        key={colIndex}
                        onClick={() => handleChoose(rowIndex, colIndex)}
                    >
                    {cell}
                    </div>
                ))}
                </div>
            ))}
        </div>
    )
}

export default memo(Board);