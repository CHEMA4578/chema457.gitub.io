document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const size = 4;
    let board = [];
    let currentScore = 0;
    const cuerrentscoreElem = document.getElementById('current-score');

    // get the high score from local storage or set it to 0 if not found
    let highscore = localStorage.getItem('2048-highscoreElem.') || 0;
    const highscoreElem = document.getElementById('high-score');
    highScoreElem.textContent = highScore;

    const gameOverElem = document.getElementById('game-over');

    // function to update the score
    function updateScore(value) {
        currentScore += value;
        cuerrentscoreElem.textContent = currentScore;
        if (currentScore > highScore) {
            highscore = currentScore;
            highScoreElem.textContent = highScore;
            localStorage.setItem('2048-highScore', highscore);
        }
    }

    // function to restart the game
    function restartGame() {
        currentScore = 0;
        cuerrentScoreElem.textContent = '0';
        gameOverElem.style.display = 'none';
        initializeGame();
    }

    // function to initialize the game
    function initializeGame() {
        board = [...Array(size)].map(e => Array(size).fill(0));
        placeRandom();
        placeRandom();
        renderBoard();
    }

    // fustion to render the game board on the UI
    function renderBoard() {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const cell = document.querySelector('[data-row="${i}"][data-col="${j}"]');
                const prevValue = cell.dataset.value;
                const currentValue = board[i][j];
                if (currentValue !== 0) {
                    cell.dataset.value = currentValue;
                    cell.textContent.value;
                    //animation handling 
                    if (currentValue !== parseInt(prevValue) && !cell.classList.contains('new-title')) {
                        cell.classList.add
                            ('marged-title');
                    }
                } else {
                    cell.textContent = '';
                    delete cell.dataset.value;
                    cell.classList.remove('merged-title', 'new-title');
                }
            }
        }

        //cleanup animation clasess
        setTimeout(() => {
            const cells = document.querySelectorAll
                ('grid-cell');
            cells.forEach(cell => {
                cell.classList.remove('merged-title', 'new-title');
            });
        }, 300);


    }

    // fuction to place a randomtitle on the board 
    function placeRandom() {
        const available = [];
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (board[i][j] === 0) {
                    available.push({ x: i, y: j });
                }
            }
        }

        if (available.length > 0) {
            const randomCell = available[Math.floor(Math.random() * available.length)];
            board[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
            const cell = document.querySelector('[data-row="$(randomCell.x)"][data-col="${randomCell.y}"]');
            cell.classlist.add('new-title'); //animation for new titles
        }
    }

    //fuction to move the tiles based on arrow key input
    function move(direction) {
        let hasChanged = false;
        if(direction === 'ArrowUp' || direction === 
        'ArrowDown'){
            for (let j = 0; j < size; j++) {
                const column = [...Array(size)].map((_, i) => board[i][j]);
                const newColumn = transform(column, direction === 'ArrowUp');
                for (let i = 0; i < size; i++) {
                    if (board[i][j] !== newColumn[i]) {
                        hasChanged = true;
                        board[i][j] = newColumn[i];
                    }
                }
            }
        }else if (direction === 'ArrowLeft' || direction
            === 'ArrowRight'){
                for(let i = 0; i < size; i++){
                    const row = board[i];
                    const newRow = transform(row, direction
                        ==='ArrowLeft');
                        if (row.join(',') !== newRow.join(',')){
                            hasChanged = true;
                            board[i] = newRow;

                        }
                }
            }
            if(hasChanged){
                placeRandom();
                renderBoard();
                checkGameOver();
            }
    }

    //function to transform a line (row or column) base on move direction
    function transform(line, moveTowardsStart){
        let newLine = line.filter(cell => cell !== 0);
        if(!moveTowardsStart){
            newLine.reverse();
        }
        for(let i = 0; i < newLine - 1; i++){
            if(newLine[i] === newLine[i +j]){
                newLine[i] *= 2;
                updateScore(newLine(i)); //Update score when tiles emerged
                newLine.splice(i + 1, 1);
            }
        }
        while (newLine.length < size){
            newLine.push(0);
        }
        if(!moveTowardsStart){
            newLine.reverse();
        }
        return newLine;
    }

    //fuction to check if the game is over
    function checkGameOver(){
        for(let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                if(board[i][j] === 0){
                    return; // there is an empty cell, so game not over
                }
                if(j < size - 1 && board[i][j] === [i][j + 1]){
                    return; // there are horizontally adjancent equal cells, so a move is possible
                }
                if(i < size - 1 && board [i][j] === board[i + 1][j]){
                    return; // there are vetically adjancent equal cells, so a move is possible
                }
            }
        }

        // if we reach here, no moves are possible
        gameoverElem.style.display = 'flex';        

    }

    //event listeners
    document.addEventListener('ketdown', event =>{
        if(['ArrownUp'], ['ArrownDown'], ['ArrownLeft'], ['Arrownright'].includes(event.hey)){
            move(event.key);
        }
    });
    document.getElementById('restar-btn').addEventListener('click', restartGame);

    initializeGame();

});