const grid=document.getElementById('grid');

const status=document.getElementById('status');

const resetButton=document.getElementById('reset');

let currentPlayer='x'

let board=Array(9).fill(null);

let gameActive=false;

const winningCombinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function createGrid(){
    grid.innerHTML='';
    board.forEach((cell,index)=>{
        const cellDiv=document.createElement('div');
        cellDiv.classList.add('cell');
        if (cell) {
            cellDiv.textContent=cell;
            cellDiv.classList.add('taken');
        }
        cellDiv.addEventListener('click',()=>handleCellClick(index));
        grid.appendChild(cellDiv);
    });
}


function handleCellClick(index) {

    

    

    if(board[index]) return;
    board[index]=currentPlayer;
    if (checkWin()) {
        status.textContent=`Player ${currentPlayer} wins!`;
        endGame();
    }else if(board.every(cell=>cell)){
        status.textContent='It\'s a draw!';
    }
    else{
        currentPlayer=currentPlayer==='x'?'o':'x';
        status.textContent=`Player ${currentPlayer} turn`;
        createGrid();
    }   
}

function checkWin() {
    return winningCombinations.some(combination=>
        combination.every(index=>board[index]===currentPlayer)
    );
}

function endGame() {
    grid.querySelectorAll('.cell').forEach(cell=>cell.classList.add('taken'));
}

function resetGame() {
    board=Array(9).fill(null);
    currentPlayer='x';
    status.textContent=`Player ${currentPlayer}'s turn`;
    createGrid();
}


resetButton.addEventListener('click',resetGame);