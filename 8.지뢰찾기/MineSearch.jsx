import React, {
    useReducer,
    createContext,
    useMemo,
    act,
    useEffect,
} from "react";
import Table from "./Table";
import Form, { CODE } from "./Form";

export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => {},
});

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mime: 0,
    },
    timer: 0,
    result: "",
    halted: true,
    openedCount: 0,
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell)
        .fill()
        .map((arr, i) => {
            return i;
        });
    const shuffle = [];
    console.log(candidate.length);
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(
            Math.floor(Math.random() * candidate.length),
            1
        )[0];
        shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    console.log(data);
    return data;
};

//action
export const START_GAME = "START_GAME";
export const OPEN_SELL = "OPEN_SELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";
export const INCREMENT_TIMER = "INCREMENT_TIMER";

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine,
                },
                openedCount: 0,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
                timer: 0,
            };
        case OPEN_SELL: {
            const tableData = [...state.tableData];
            tableData.forEach((row, i) => {
                tableData[i] = [...row];
            });
            const checked = [];
            let openedCount = 0;
            const checkAround = (row, cell) => {
                console.log("checkAround");
                if (
                    [
                        CODE.OPENED,
                        CODE.FLAG,
                        CODE.FLAG_MINE,
                        CODE.QUESTION_MINE,
                        CODE.QUESTION,
                    ].includes(tableData[row][cell])
                ) {
                    return;
                }
                if (
                    row < 0 ||
                    row >= tableData.length ||
                    cell < 0 ||
                    cell >= tableData[0].length
                ) {
                    //상하좌우 칸이 아닌 경우 필터링
                    return;
                }
                if (checked.includes(row + "," + cell)) {
                    // 이미 검사한 칸이면
                    return;
                } else {
                    checked.push(row + "," + cell);
                }
                openedCount += 1;
                let around = [
                    tableData[row][cell - 1],
                    tableData[row][cell + 1],
                ];
                if (tableData[row - 1]) {
                    around = around.concat([
                        tableData[row - 1][cell - 1],
                        tableData[row - 1][cell],
                        tableData[row - 1][cell + 1],
                    ]);
                }
                if (tableData[row + 1]) {
                    around = around.concat([
                        tableData[row + 1][cell - 1],
                        tableData[row + 1][cell],
                        tableData[row + 1][cell + 1],
                    ]);
                }
                const count = around.filter((v) =>
                    [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)
                ).length;
                tableData[row][cell] = count;
                if (count === 0) {
                    //주변칸 오픈
                    const near = [];
                    if (row - 1 > -1) {
                        near.push([row - 1, cell - 1]);
                        near.push([row - 1, cell]);
                        near.push([row - 1, cell + 1]);
                    }
                    near.push([row, cell - 1]);
                    near.push([row, cell + 1]);
                    if (row + 1 < tableData.length) {
                        near.push([row + 1, cell - 1]);
                        near.push([row + 1, cell]);
                        near.push([row + 1, cell + 1]);
                    }
                    near.forEach((n) => {
                        if (tableData[n[0]][n[1]] < CODE.OPENED) {
                            checkAround(n[0], n[1]);
                        }
                    });
                } else {
                }
            };
            checkAround(action.row, action.cell);
            let halted = false;
            let result = "";
            console.log(
                state.data.row * state.data.cell - state.data.mine,
                state.openedCount + openedCount
            );
            if (
                state.data.row * state.data.cell - state.data.mine ===
                state.openedCount + openedCount
            ) {
                //승리
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다`;
            }
            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result,
            };
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            };
        }
        case FLAG_CELL: {
            console.log(state, action);
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            };
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return { state };
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1,
            };
        }
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;

    useEffect(() => {
        let timer;
        if (halted === false) {
            timer = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER });
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    }, [halted === true]);
    const value = useMemo(
        () => ({
            tableData: tableData,
            dispatch,
            halted: halted,
        }),
        [tableData]
    );
    return (
        <TableContext.Provider value={value}>
            <Form dispatch={dispatch} />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
};

export default MineSearch;
