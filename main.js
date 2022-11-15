'use strict'

let globalSteps = [[0, 0], [0, 0]];
const pxBody = 12;
let booster = [];

function createBoard(X = 400, Y = 400){
    const board = document.createElement("div");
        board.classList.add("board");
        board.style.cssText = `
        position: relative;
        width: ${X}px;
        height: ${Y}px`
        return board
}
const renderBoard = (parent = ".snake_game", X, Y) => {
    const parentBoard = document.querySelector(parent);
    parentBoard.append(createBoard(X, Y));
}
renderBoard()
   

const createRandomBooster = (X = 400, Y = 400) => [~~(Math.random() * X * (1/pxBody)) * pxBody, ~~(Math.random() * Y * (1/pxBody)) * pxBody];


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
booster = createRandomBooster();
renderBooster(booster)
const rerenderBooster = ([posX, posY]) => {
    const boost = document.querySelectorAll('div');
    boost[2].style.top = `${posY}px`;
    boost[2].style.left = `${posX}px`;
}
const renderSnake = (steps, pxBody, lengthSnake) => {
    console.dir(steps)

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
const startTimer = (step, positionBooster) => {
    
    window.timer = window.setInterval(() => {
      rerenderBooster(booster);
      const [lastX, lastY] = globalSteps.at(-1);
      let grow = JSON.stringify([lastX + pxBody, lastY]) == JSON.stringify(positionBooster);
    console.log(lastX + pxBody, lastY)
    console.log(positionBooster)
        switch(step){
            case 'D': globalSteps.push([lastX + pxBody, lastY]); break;
            case 'S': globalSteps.push([lastX, lastY + pxBody]); break;
            case 'A': globalSteps.push([lastX - pxBody, lastY]); break;
            case 'W': globalSteps.push([lastX, lastY - pxBody]); break;
            default: console.log('error'); break;
        }
        renderSnake(globalSteps, pxBody, globalSteps.length)
        if (!grow) { 
            globalSteps.shift();
        } else {
            console.log('true')
            booster = createRandomBooster();
        }
    }, 100)
}

const listener = (key, option) => {
  document.addEventListener('keydown', (event) => {
        if (event.code == key){
            window.clearInterval(window.timer)
            startTimer(option, booster)
        }
    })
}

listener("KeyD", "D");
listener("KeyS", "S");
listener("KeyA", "A");
listener("KeyW", "W");











