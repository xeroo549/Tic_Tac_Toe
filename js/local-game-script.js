let game = {
    board: [['-', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']],
    currentPlayer: 'X',
    winner: '-',
    isWinning: false,
    currentWinningCombination: []
}
let board = document.querySelector('#board')
let info_text = document.querySelector('#info-text')
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let cell = `<rect id="${i}-${j}" onclick="moveOn(${i}, ${j})" x="${i * 100}" y="${j * 100}" width="100" height="100" fill="#151922" stroke="#424B5A" stroke-width="5"/>`;
        board.insertAdjacentHTML('beforeend', cell);
    }
}
function calculateCellPos(index) {
    const map = new Map();
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            map.set(j * 3 + k, { x: j, y: k });
        }
    }
    return map.get(index);
}
function checkWinner() {
    const winningCombinations = [
        [{x:0, y:0}, {x:0, y:1}, {x:0, y:2}],
        [{x:1, y:0}, {x:1, y:1}, {x:1, y:2}],
        [{x:2, y:0}, {x:2, y:1}, {x:2, y:2}],
        [{x:0, y:0}, {x:1, y:0}, {x:2, y:0}],
        [{x:0, y:1}, {x:1, y:1}, {x:2, y:1}],
        [{x:0, y:2}, {x:1, y:2}, {x:2, y:2}],
        [{x:0, y:0}, {x:1, y:1}, {x:2, y:2}],
        [{x:0, y:2}, {x:1, y:1}, {x:2, y:0}]
    ];

    for (let combination of winningCombinations) {
        let [a, b, c] = combination;
        if (game.board[a.x][a.y] !== '-' && game.board[a.x][a.y] === game.board[b.x][b.y] && game.board[a.x][a.y] === game.board[c.x][c.y]) {
            game.winner = game.board[a.x][a.y];
            info_text.textContent = `Player ${game.winner} wins!`;
            game.currentWinningCombination = combination;
            let newLine = `<line x1="${a.x * 100 + 50}" y1="${a.y * 100 + 50}" x2="${c.x * 100 + 50}" y2="${c.y * 100 + 50}" stroke="#ffffffe0" stroke-width="4" stroke-linecap="round"/>`;
            board.insertAdjacentHTML('beforeend', newLine);
            break;
            
        } else if(!game.board[0].includes('-') && !game.board[1].includes('-') && !game.board[2].includes('-')) {
            info_text.textContent = `It's a draw!`;
        }

    }

}

function moveOn(x, y) {
    if (game.winner !== '-') return;

    let cell = document.getElementById(`${x}-${y}`)

    let newShape = '';
    if (game.board[x][y] !== 'O' && game.board[x][y] !== 'X' && game.currentPlayer === 'X') {
        newShape = `
            <line x1="${x * 100 + 20}" y1="${y * 100 + 20}" x2="${x * 100 + 80}" y2="${y * 100 + 80}" stroke="red" stroke-width="8" stroke-linecap="round"/>
            <line x1="${x * 100 + 80}" y1="${y * 100 + 20}" x2="${x * 100 + 20}" y2="${y * 100 + 80}" stroke="red" stroke-width="8" stroke-linecap="round"/>`;
        game.board[x][y] = 'X';
        game.currentPlayer = 'O';
        info_text.textContent = `Current player: ${game.currentPlayer}`;
    } else if (game.board[x][y] === '-' && game.currentPlayer === 'O') {
        newShape = `
            <circle cx="${x * 100 + 50}" cy="${y * 100 + 50}" r="30" stroke="blue" stroke-width="8" fill="none"/>`;
        game.board[x][y] = 'O';
        game.currentPlayer = 'X';
        info_text.textContent = `Current player: ${game.currentPlayer}`;
    }
    board.insertAdjacentHTML('beforeend', newShape);
    checkWinner();
}
