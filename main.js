'use strict'

const gameOver = (score) => {
    const div = document.createElement('div');
    const youLoseDiv = document.createElement('div');
    const scoreDiv = document.createElement('div');
    const againButton = document.createElement('button');
    const board = document.querySelector('.board');
    div.classList.add('game_over');
    youLoseDiv.classList.add('you_lose');
    scoreDiv.classList.add('score');
    againButton.classList.add('again');
    youLoseDiv.textContent = 'YOU LOSE'
    scoreDiv.textContent = `YOUR SCORE = ${score} `
    againButton.textContent = 'PLAY AGAIN'
    againButton.addEventListener('click', () => game(gameOver))
    board.append(div);
    div.append(youLoseDiv);
    div.append(scoreDiv);
    div.append(againButton);
}

function game (gameOver){

    const pxBody = 20;
    let booster = [];
    const boardSize = [300, 300]
    let globalSteps = [[0,0]];


    const clearBeforeNewGame = () => {
        const board = document.querySelector('.board')
       if (board) {
        const parent = document.querySelector('.snake_game')
        parent.removeChild(parent.lastChild)
       } else {
        console.log('else')
       }
    }
    clearBeforeNewGame()
    const createBoard = ([X = 300, Y = 300]) => {
        const board = document.createElement("div");
            board.classList.add("board");
            board.style.cssText = `
            position: relative;
            width: ${X + pxBody}px;
            height: ${Y + pxBody}px`
            return board
    }
    const renderBoard = (parent = ".snake_game", boardSize) => {
        const parentBoard = document.querySelector(parent);
        parentBoard.append(createBoard(boardSize));
    }
    renderBoard(".snake_game", boardSize)
    

    const createRandomBooster = ([X = 300, Y = 300]) => [~~(Math.random() * X * (1/pxBody)) * pxBody, ~~(Math.random() * Y * (1/pxBody)) * pxBody];


    const renderBooster = ([posX, posY]) => {
    const board = document.querySelector('.board');
    const div = document.createElement("div");
    div.classList.add('booster')
    div.style.cssText =`
    position: absolute;
    width: ${pxBody}px;
    height: ${pxBody}px;
    top: ${posY}px;
    left: ${posX}px;
    border-radius: 1px;
    background: red;`
    board.append(div);
    }
    booster = createRandomBooster(boardSize);
    renderBooster(booster)
    const rerenderBooster = ([posX, posY]) => {
        const boost = document.querySelectorAll('div');
        boost[2].style.top = `${posY}px`;
        boost[2].style.left = `${posX}px`;
    }
    const renderSnake = (steps, pxBody, lengthSnake) => {
        const board = document.querySelector('.board');
        board.childNodes.length > 1 ? board.removeChild(board.lastChild) : null
        const wrapper = document.createElement('div');
        board.append(wrapper);
        for (let i = 0; i < lengthSnake; i++){
            const div = document.createElement('div');
            div.style.cssText = `
            position: absolute;
            width: ${pxBody}px;
            height: ${pxBody}px;
            border-radius: 1px;
            background: #000;
            top: ${steps[i][1]}px;
            left: ${steps[i][0]}px;`
            wrapper.append(div);
        }
        
    }
    // const firstPlaceSnake = (length) => {
    //     let x = 0;
    //     let y = 0;
    //     for (let i; i < length; i++){
    //         globalSteps.push([x += pxBody, y])
    //         renderSnake(globalSteps, pxBody, globalSteps.length)
    //     }
        

    // }
    // firstPlaceSnake(5);
    
    const startTimer = (step, positionBooster) => {
        
        window.timer = window.setInterval(() => {
            
        rerenderBooster(booster);
        const [lastX, lastY] = globalSteps.at(-1);
        const gameOverGroup = () => {
            document.removeEventListener('keydown', clickOnKey)
            window.clearInterval(window.timer); 
            gameOver(globalSteps.length);
        }
        let arr = Array.from(globalSteps)
        arr.pop();
        let cannibalSnake = arr.find(([a, b]) => (a === lastX && b === lastY));
        let grow = JSON.stringify([lastX, lastY]) == JSON.stringify(positionBooster);
            switch(step){
                case 'D': globalSteps.push([lastX + pxBody, lastY]); break;
                case 'S': globalSteps.push([lastX, lastY + pxBody]); break;
                case 'A': globalSteps.push([lastX - pxBody, lastY]); break;
                case 'W': globalSteps.push([lastX, lastY - pxBody]); break;
                default: console.log('error'); break;
            }
            if (lastX >= boardSize[0] ||
                 globalSteps.at(-1)[0] <= -pxBody || 
                 globalSteps.at(-1)[1] <= -pxBody || 
                 lastY >= boardSize[1] ||
                 cannibalSnake
                 ) 
            {
            gameOverGroup()} else {
            renderSnake(globalSteps, pxBody, globalSteps.length)
            if (!grow) { 
                globalSteps.shift();
            } else {
                booster = createRandomBooster(boardSize);
            }}
        }, 100)
    }
    const clickOnKey = (event) => {
        if (event.code == "KeyD"){
            window.clearInterval(window.timer)
            startTimer("D", booster)
        }
        if (event.code == "KeyS"){
            window.clearInterval(window.timer)
            startTimer("S", booster)
        }
        if (event.code == "KeyA"){
            window.clearInterval(window.timer)
            startTimer("A", booster)
        }
        if (event.code == "KeyW"){
            window.clearInterval(window.timer)
            startTimer("W", booster)
        }
    }
    const listener = () => {
    document.addEventListener('keydown', clickOnKey)
    }
   
    listener();
    // listener("KeyS", "S");
    // listener("KeyA", "A");
    // listener("KeyW", "W");
}

game(gameOver);









