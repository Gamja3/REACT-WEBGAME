import React, { memo, useMemo } from "react";
import Td from "./Td";
const Tr = memo(({ rowData, rowIndex, dispatch }) => {
    console.log("tr rendered");
    return (
        <>
            <tr>
                {Array(rowData.length)
                    .fill()
                    .map((tr, i) =>
                        useMemo(
                            () => (
                                <Td
                                    key={i}
                                    dispatch={dispatch}
                                    rowIndex={rowIndex}
                                    cellIndex={i}
                                    cellData={rowData[i]}
                                />
                            ),
                            [rowData[i]]
                        )
                    )}
            </tr>
        </>
    );
});

export default Tr;
