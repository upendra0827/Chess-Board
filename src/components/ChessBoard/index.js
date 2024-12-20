import React, { useEffect, useRef, useState } from "react";
import { Board } from "./Board";

const ChessBoardContainer = () => {

    const chessBoard = []

    for (let i = 0; i < 8; i++) {
        const row = []

        for (let i = 0; i < 8; i++) {
            row.push({})
        }

        chessBoard.push(row)
    }

    const [board, setBoard] = useState([...chessBoard])

    const [selection, setSelection] = useState(null)

    const directions = {
        'top-right': [-1, 1],
        'top-left': [1, -1],
        'bottom-right': [1, 1],
        'bottom-left': [-1, -1]
    }

    const handleCheckBorder = ({ i, j }) => {
        if (i < 0 || i > board.length - 1 || j < 0 || j > board.length - 1) return false

        return true
    }

    const handleColoring = ({ i, j, direction, boardClone }) => {
        boardClone[i][j]['color'] = 'red'

        const [m, n] = directions[direction]

        if (handleCheckBorder({ i: i + m, j: j + n })) {
            handleColoring({ i: i + m, j: j + n, direction, boardClone })
        }

    }

    const handleBoardColoring = ({ i, j }) => {
        const boardClone = [...chessBoard]
        boardClone[i][j]['color'] = 'dark-red'

        if (handleCheckBorder({ i: i - 1, j: j + 1 }))
            handleColoring({ i: i - 1, j: j + 1, direction: 'top-right', boardClone })

        if (handleCheckBorder({ i: i + 1, j: j - 1 }))
            handleColoring({ i: i + 1, j: j - 1, direction: 'top-left', boardClone })

        if (handleCheckBorder({ i: i + 1, j: j + 1 }))
            handleColoring({ i: i + 1, j: j + 1, direction: 'bottom-right', boardClone })

        if (handleCheckBorder({ i: i - 1, j: j - 1 }))
            handleColoring({ i: i - 1, j: j - 1, direction: 'bottom-left', boardClone })

        setBoard([...boardClone])
    }


    const handleSelection = ({ i, j }) => {
        setSelection({
            row: i,
            column: j
        })
    }

    return (
        <Board board={board} selection={selection} handleSelection={handleSelection} handleBoardColoring={handleBoardColoring} />
    )
};

export default ChessBoardContainer;
