import React, { memo, useCallback, useContext, useMemo } from "react";
import {
    OPEN_SELL,
    TableContext,
    CLICK_MINE,
    FLAG_CELL,
    QUESTION_CELL,
    NORMALIZE_CELL,
} from "./MineSearch";
import { CODE } from "./Form";
const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: "#444",
            };
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background: "white",
            };

        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: "yellow",
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: "red",
            };
        default:
            return {
                background: "white",
            };
    }
};
const getTdText = (code) => {
    console.log("getTDtexst");
    switch (code) {
        case CODE.NORMAL:
            return "";
        case CODE.MINE:
            return "X";
        case CODE.CLICKED_MINE:
            return "펑";
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return "!";
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return "?";
        default:
            return code || "";
    }
};
const Td = memo(({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL:
                dispatch({ type: OPEN_SELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);
    const onRightClickTd = useCallback(
        (e) => {
            e.preventDefault();
            if (halted) {
                return;
            }
            switch (tableData[rowIndex][cellIndex]) {
                case CODE.NORMAL:
                case CODE.MINE:
                    dispatch({
                        type: FLAG_CELL,
                        row: rowIndex,
                        cell: cellIndex,
                    });
                    return;
                case CODE.FLAG_MINE:
                case CODE.FLAG:
                    dispatch({
                        type: QUESTION_CELL,
                        row: rowIndex,
                        cell: cellIndex,
                    });
                    return;
                case CODE.QUESTION_MINE:
                case CODE.QUESTION:
                    dispatch({
                        type: NORMALIZE_CELL,
                        row: rowIndex,
                        cell: cellIndex,
                    });
                    return;

                default:
                    return;
            }
        },
        [tableData[rowIndex][cellIndex], halted]
    );
    return useMemo(
        () => (
            <td
                style={getTdStyle(tableData[rowIndex][cellIndex])}
                onClick={onClickTd}
                onContextMenu={onRightClickTd}
            >
                {getTdText(tableData[rowIndex][cellIndex])}
            </td>
        ),
        [tableData[rowIndex][cellIndex], halted]
    );
});

export default Td;
