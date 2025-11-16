document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('game-status');
    const restartButton = document.getElementById('restart-button');

    let currentPlayer = 'X';
    let gameActive = true;
    // Represents the board state, empty strings signify empty cells
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // --- Message Functions ---
    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `It's Player ${currentPlayer}'s turn`;

    // --- Core Game Logic Functions ---

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        // Update state array and UI
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        // Add class for specific styling
        clickedCell.classList.add(currentPlayer === 'X' ? 'x-marker' : 'o-marker');
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerHTML = currentPlayerTurn();
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = winningMessage();
            gameActive = false; // End the game
            return;
        }

        // Check for a draw if no one won
        if (!gameState.includes("")) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false; // End the game
            return;
        }

        // If no win or draw, continue the game
        handlePlayerChange();
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        // Get the index from the data-attribute defined in HTML
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        // Check if the cell is already played or the game is over
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        // Proceed with game logic
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleRestartGame() {
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.innerHTML = currentPlayerTurn();
        // Clear the UI of markers
        cells.forEach(cell => {
            cell.innerHTML = "";
            cell.classList.remove('x-marker', 'o-marker');
        });
    }

    // --- Event Listeners ---
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);

    // Set initial status message
    statusDisplay.innerHTML = currentPlayerTurn();
});
