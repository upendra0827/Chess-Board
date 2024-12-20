import React from "react";
import './style.css'

export const Board = ({ board, handleBoardColoring, handleSelection, selection }) => {

    let isInDiagonal
    let row, column

    if (selection) {
        row = selection.row
        column = selection.column
    }

    return (
        <div>
            {board.map((square, i) => (
                <div className="row" key={`row-${i}`}>
                    {
                        square.map((_, j) => {
                            if (selection) isInDiagonal = (row + column === i + j || row - column === i - j)
                            return (
                                <div
                                    key={`column-${j}`}
                                    className={`square ${(i + j) % 2 === 0 ? 'black' : 'white'} ${(row === i && column === j) ? 'dark-red' : isInDiagonal && 'red'}`}
                                    onClick={() => handleSelection({ i, j })}
                                ></div>
                            )
                        })
                    }
                </div>
            ))}
        </div>
    )
};
