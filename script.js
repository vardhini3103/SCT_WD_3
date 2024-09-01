const cells = document.querySelectorAll('.cell');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const toggleOpponentButton = document.getElementById('toggleOpponent');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isComputerMode = false;
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;

    if (board[cellIndex] !== '' || !gameActive) return;

    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusElement.textContent = 'It\'s a tie!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;

    if (isComputerMode && currentPlayer === 'O') {
        setTimeout(() => computerPlay(), 500);
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function computerPlay() {
    const availableIndices = board.map((value, index) => value === '' ? index : null).filter(index => index !== null);
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';

    if (checkWin()) {
        statusElement.textContent = 'Player O wins!';
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusElement.textContent = 'It\'s a tie!';
        gameActive = false;
        return;
    }

    currentPlayer = 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

function toggleOpponent() {
    isComputerMode = !isComputerMode;
    toggleOpponentButton.textContent = isComputerMode ? 'Play Against Another Player' : 'Play Against Computer';
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
toggleOpponentButton.addEventListener('click', toggleOpponent);
