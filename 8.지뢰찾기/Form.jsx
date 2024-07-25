import React, { useCallback, useState, useContext } from "react";
import { START_GAME, TableContext } from "./MineSearch";

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 OPENED 가 되게
};

const Form = () => {
    const [row, setRow] = useState("10");
    const [cell, setCell] = useState("10");
    const [mine, setMine] = useState("10");
    const { dispatch } = useContext(TableContext);

    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);
    });
    const onChangeCell = useCallback((e) => {
        setCell(e.target.value);
    });
    const onChangeMine = useCallback((e) => {
        setMine(e.target.value);
    });
    const onClickBtn = useCallback((e) => {
        dispatch({ type: START_GAME, row, cell, mine }, [row, cell, mine]);
    });

    return (
        <>
            <div>
                <input
                    type="number"
                    placeholder="세로"
                    value={row}
                    onChange={onChangeRow}
                />
                <input
                    type="number"
                    placeholder="가로"
                    value={cell}
                    onChange={onChangeCell}
                />
                <input
                    type="number"
                    placeholder="지뢰"
                    value={mine}
                    onChange={onChangeMine}
                />
                <button onClick={onClickBtn}>시작</button>
            </div>
        </>
    );
};

export default Form;
