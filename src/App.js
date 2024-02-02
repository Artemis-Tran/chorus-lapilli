import { useState } from 'react';

function Square({ value, onSquareClick, onSquareDragEnter, onSquareDragEnd }) {
    return (
        <button
            className="square"
            onClick={onSquareClick}
            onDragEnter={onSquareDragEnter}
            onDragEnd={onSquareDragEnd}
            draggable
        >
            {value}
        </button>

    );
}


export default function Board() {
    const [xIsNext, setxIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [numPieces, setnumPieces] = useState(0) // storing number of pieces
    const [lastDragPos, setLastDragPos] = useState(-1) // storing position of where to drop

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares) || numPieces === 6) {
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X'
        } else {
            nextSquares[i] = 'O';
        }
        setSquares(nextSquares);
        setxIsNext(!xIsNext);
        setnumPieces(numPieces + 1);


    }


    function handleDragEnter(i) {
        if (numPieces < 6) {
            return;
        };
       
        setLastDragPos(i)
    }


    function handleDragEnd(i) {
        //checking that all 6 pieces have been placed, that the winner has been declared, allowed adjacency, not dragging empty space
        if (numPieces < 6 || squares[lastDragPos] !== null ||
            calculateWinner(squares) || squares[i] === null ||
            adjacentPositions[i][lastDragPos] === 0) {
            return;
        };
        //checking for correct symbol dragging
        if (xIsNext) {
            if (squares[i] === 'O') {
                return;
            }
        } else {
            if (squares[i] === 'X') {
                return;
            }
        }
        // making new array
        const nextSquares = squares.slice();
        nextSquares[i] = null
        if (xIsNext) {
            nextSquares[lastDragPos] = 'X'
        } else {
            nextSquares[lastDragPos] = 'O'
        }
        //checking for middle position
        if (numPieces === 6) {
            const _winner = calculateWinner(nextSquares)
            if (squares[4] === 'X' && xIsNext) {
                if (i !== 4 && !_winner) {
                    return;
                }
            }
            else if (squares[4] === 'O' && !xIsNext) {
                if (i !== 4 && !_winner) {
                    return;
                }
            }
        }

        setxIsNext(!xIsNext);
        setSquares(nextSquares)
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]}
                    onSquareClick={() => handleClick(0)}
                    onSquareDragEnter={() => handleDragEnter(0)}
                    onSquareDragEnd={() => handleDragEnd(0)} />
                <Square value={squares[1]}
                    onSquareClick={() => handleClick(1)}
                    onSquareDragEnter={() => handleDragEnter(1)}
                    onSquareDragEnd={() => handleDragEnd(1)} />
                <Square value={squares[2]}
                    onSquareClick={() => handleClick(2)}
                    onSquareDragEnter={() => handleDragEnter(2)}
                    onSquareDragEnd={() => handleDragEnd(2)} />
            </div>

            <div className="board-row">
                <Square value={squares[3]}
                    onSquareClick={() => handleClick(3)}
                    onSquareDragEnter={() => handleDragEnter(3)}
                    onSquareDragEnd={() => handleDragEnd(3)} />
                <Square value={squares[4]}
                    onSquareClick={() => handleClick(4)}
                    onSquareDragEnter={() => handleDragEnter(4)}
                    onSquareDragEnd={() => handleDragEnd(4)} />
                <Square value={squares[5]}
                    onSquareClick={() => handleClick(5)}
                    onSquareDragEnter={() => handleDragEnter(5)}
                    onSquareDragEnd={() => handleDragEnd(5)} />
            </div>

            <div className="board-row">
                <Square value={squares[6]}
                    onSquareClick={() => handleClick(6)}
                    onSquareDragEnter={() => handleDragEnter(6)}
                    onSquareDragEnd={() => handleDragEnd(6)} />
                <Square value={squares[7]}
                    onSquareClick={() => handleClick(7)}
                    onSquareDragEnter={() => handleDragEnter(7)}
                    onSquareDragEnd={() => handleDragEnd(7)} />
                <Square value={squares[8]}
                    onSquareClick={() => handleClick(8)}
                    onSquareDragEnter={() => handleDragEnter(8)}
                    onSquareDragEnd={() => handleDragEnd(8)} />
            </div>

        </>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}



const adjacentPositions = [
    [0, 1, 0, 1, 1, 0, 0, 0, 0],
    [1, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 0],
    [1, 1, 0, 0, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 0, 1, 1, 1, 1],
    [0, 1, 1, 0, 1, 0, 0, 1, 1],
    [0, 0, 0, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1, 1, 0, 1, 0],
];
