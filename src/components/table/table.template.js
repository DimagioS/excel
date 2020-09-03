const CODES = {
    A: 65,
    Z: 90,
};

function toCell(_, col) {
    return `
        <div class="cell" contenteditable spellcheck="false" data-col="${col}"></div>
    `;
}

function toColumn(el, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${el}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

function createRow(index, content) {
    const resize = index ? `<div class="row-resize" data-resize="row"></div>` : '';
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

export function templateTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    // _ - значит не используем этот параметр;
    function toChar(_, index) {
        return String.fromCharCode(CODES.A + index);
    }

    // Массив + join: <div class="column">${el}</div>
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        // Тоже самое, что: el => {return createCol(el)}) --> el => createCol(el) --> (createCol);
        .map(toColumn)
        .join('');

    rows.push(createRow(null, cols));

    for (let i = 0; i < rowsCount; i++) {
        // Массив + join: <div class="cell">
        const cell = new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('');
        rows.push(createRow(i + 1, cell));
    }

    return rows.join('');
}

