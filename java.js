const gameBoard = (() => {
    const board= ['','','','','','','','','']
    return {board}
})()

const player = (name,symbol) => {
    return {name,symbol}
}

const player1=player("Human",'X');
const player2=player("Computer",'O');

const playgame = ((curPlayer) => {
    const {board}=gameBoard;
    curPlayer=swapPlayers(curPlayer);
    let turn=0;
    let gameOver=false;
    thisClick();

    const markBoard=(e) => {
        let key=e.target.id;
        if (gameOver) return;
        if (board[key]!='') {
            console.log(key+' already filled');
            return;}
        box=document.getElementById(key)
        box.textContent=curPlayer.symbol
        board[key]=curPlayer.symbol
        turn++
        if (checkWinner(key,curPlayer)) {
            gameOver=true
        }else if (turn==9) {
            alert('DRAW!');
            curPlayer=swapPlayers('')
        }
        curPlayer=swapPlayers(curPlayer)
        
    };
    function checkWinner(key,curPlayer) {
        column=key%3;
        row=Math.floor(key/3);
        if (board[row*3]===board[row*3+1]&&board[row*3]===board[row*3+2]) {
            document.getElementById('winner').textContent=`${curPlayer.name} is the winner in row ${row+1}`;
            return true}
        if (board[column]===board[column+3]&&board[column+6]===board[column]) {
            document.getElementById('winner').textContent=`${curPlayer.name} is the winner in column ${column+1}`;
            return true}
        if (key%2===0&&board[4]===board[key%4]&&board[4]===board[8-key%4]) {
            document.getElementById('winner').textContent=`${curPlayer.name} wins with a diagonal`;
            return true;
        }
    };
    

    function swapPlayers(curPlayer) {
        if (curPlayer=='') {
            if (Math.random<.5) {newp=player1}
            else newp=player2
        } else if (curPlayer==player1) {
            newp=player2
        } else newp=player1
        document.getElementById('pName').textContent='Current Player: '+newp.name
        return newp;
    }

    function clearBoard() {
        for (i=0;i<9;i++) {
            board[i]=''
        }
        turn=0;
        gameOver=0;
        
    }

    function thisClick() {
        const buttons=document.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.className=="new-game") {
                button.addEventListener('click',()=>{
                    clearBoard()
                    buttons.forEach(button2=>{
                        if (button2.className=="box") {
                            button2.textContent=''
                        }
                    })}
                )}
            if (button.className=="box") {
                button.addEventListener('click',(e)=> markBoard(e))
            }
    })   }
    
    return {thisClick}
})

playgame()
