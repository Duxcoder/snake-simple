'use strict'

let lengthSnake = 1;
let globalSteps = [];
const pxBody = 12;

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
   
const createSnake = (lengthSnake, nowX, nowY) => {
    let steps = [];
    for (let i = 0; i < lengthSnake; i++){
        const X = globalSteps[i][0] ? globalSteps[i][0]: nowX;
        const Y = globalSteps[i][1] ? globalSteps[i][1]: nowY;
        steps.push([X, Y]);
        return steps
    }  
}

const snakeGrow = (lengthSnake, nowX, nowY) => {
    lengthSnake += 1
    createSnake(lengthSnake, nowX, nowY)
}
    
const listener = (parent = ".snake_game", key = 'KeyW') => {
    document.querySelector(parent).addEventListener('keydown', (event) => {
    if (event.code == key){
    
    }
    })
    }

let i = 0;

const renderSnake = (steps, pxBody, lengthSnake) => {
    const board = document.querySelector('.board');
    board.childNodes.length > 0 ? board.removeChild(board.firstChild) : null
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
        top: ${steps[i][0]}px;
        left: ${steps[i][1]}px;`
        wrapper.append(div);
    }
    
}
let arr = [[0, 0], [12, 0], [24, 0], [24, 12], [24, 24], [24, 36], [24, 48], [36, 48], [48, 48]]
const timer = setInterval(() => {
    console.log('hello'); 
    i += 1;
    if (i == 10) {clearInterval(timer)}
    renderSnake(arr, 12, 3)
    arr.shift()

}, 800)
timer()



