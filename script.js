let game = {
    board: ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
    currentPlayer: 'X',
    winner: '-'
}
let board = document.querySelector('#board')
let info_text = document.querySelector('#info-text')

for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
        let cell = `<rect id="${i}-${j}" onclick="moveOn(${i}, ${j})" x="${i * 100}" y="${j * 100}" width="100" height="100" fill="white" stroke="black" stroke-width="5"/>`;
        board.insertAdjacentHTML('beforeend', cell);
    }
}
function checkWinner() {
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        let [a, b, c] = combination;
        if (game.board[a] !== '-' && game.board[a] === game.board[b] && game.board[a] === game.board[c]) {
            game.winner = game.board[a];
            info_text.textContent = `Player ${game.winner} wins!`;
        } else if (!game.board.includes('-')) {
            info_text.textContent = `It's a draw!`;
        }
        
    }
    
}

function moveOn(x, y) {
    if (game.winner !== '-') return;

    let cell = document.getElementById(`${x}-${y}`)

    let arrayIndex = x * 3 + y;
    let newShape = '';
        if (game.board[arrayIndex] !== 'O' && game.board[arrayIndex] !== 'X' && game.currentPlayer === 'X') {
            newShape = `
            <line x1="${x * 100 + 20}" y1="${y * 100 + 20}" x2="${x * 100 + 80}" y2="${y * 100 + 80}" stroke="red" stroke-width="8" stroke-linecap="round"/>
            <line x1="${x * 100 + 80}" y1="${y * 100 + 20}" x2="${x * 100 + 20}" y2="${y * 100 + 80}" stroke="red" stroke-width="8" stroke-linecap="round"/>`;
            game.board[arrayIndex] = 'X';
            game.currentPlayer = 'O';
            info_text.textContent = `Current player: ${game.currentPlayer}`;
        } else if (game.board[arrayIndex] === '-' && game.currentPlayer === 'O') {
            newShape = `
            <circle cx="${x * 100 + 50}" cy="${y * 100 + 50}" r="30" stroke="blue" stroke-width="8" fill="none"/>`;
            game.board[arrayIndex] = 'O';
            game.currentPlayer = 'X';
            info_text.textContent = `Current player: ${game.currentPlayer}`;
        }
    board.insertAdjacentHTML('beforeend', newShape);
    checkWinner();
}
