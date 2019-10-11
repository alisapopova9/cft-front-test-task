const COLUMN_NAMES = {
    1: 'film-name-',
    2: 'film-director-',
    3: 'film-country-',
    4: 'film-duration-',
    5: 'film-rank-',
};

const ROW_NUMBER = 5;
const COLUMN_NUMBER = 5;

let state = {
    currentSearchQuery: '',
    currentSearchColumn: '',
    currentSearchResult: [],
};

function init() {
    const searchArea = document.getElementById('column-search-form');
    searchArea.addEventListener('submit', onSubmit);
}

function onSubmit(event) {
    event.preventDefault();

    if (state.currentSearchResult !== [])
        cleanPrevSearchResult();

    const selectElement = document.getElementById('column-select');
    const inputElement = document.getElementById('column-search-input');

    state.currentSearchQuery = inputElement.value;
    state.currentSearchColumn = selectElement.options[selectElement.selectedIndex].value;

    searchHandler();
}

function searchHandler() {
    if (isNaN(state.currentSearchColumn)) {
        allColumnsSearch();
    } else {
        specificColumnSearch();
    }
    renderSearchResult(state.currentSearchResult);
}

function allColumnsSearch() {
    let resultIds = [];

    for (let i = 1; i <= COLUMN_NUMBER; i++) {
        for (let j = 1; j <= ROW_NUMBER; j++) {
            let currCellId = COLUMN_NAMES[i] + j;
            const currCell = document.getElementById(currCellId);
            let cellValue = currCell.innerText;
            if (cellValue.toLowerCase().indexOf(state.currentSearchQuery.toLowerCase(), 0) !== -1) {
                resultIds.push(currCellId);
            }
        }
    }

    state.currentSearchResult = resultIds;
}

function specificColumnSearch() {
    let resultIds = [];

    for (let i = 1; i <= ROW_NUMBER; i++) {
        let currCellId = COLUMN_NAMES[Number(state.currentSearchColumn)] + i;
        const currCell = document.getElementById(currCellId);
        let cellValue = currCell.innerText;
        if (cellValue.toLowerCase().indexOf(state.currentSearchQuery.toLowerCase(), 0) !== -1) {
            resultIds.push(currCellId);
        }
    }

    state.currentSearchResult = resultIds;
}

function renderSearchResult(results) {
    const resBlock = document.getElementById('search-result');
    if (results.length) {
        results.forEach(res => {
            const cell = document.getElementById(res);
            cell.classList.add('cell_found');
        });
        resBlock.innerText = `Найдено совпадений: ${results.length}`;
    }
    else {
        resBlock.innerText = `Ничего не найдено`;
    }
}

function cleanPrevSearchResult() {
    state.currentSearchResult.forEach(res => {
        document.getElementById(res).classList.remove('cell_found');
    })
}

document.addEventListener('DOMContentLoaded', init);