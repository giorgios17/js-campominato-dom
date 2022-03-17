/*Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.

In seguito l'utente clicca su una cella: se il numero è presente 
nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, 
altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, 
cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.

BONUS:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
*/
const bombTotal = 16;
const grid = document.querySelector('.grid');
const easy = document.getElementById('easy');
const medium = document.getElementById('medium');
const hard = document.getElementById('hard');
let score = 0;

easy.addEventListener('click', function(){
    grid.innerHTML = '';
    startGame(100, 'width10');
})

medium.addEventListener('click', function(){
    grid.innerHTML = '';
    startGame(81, 'width9');
})

hard.addEventListener('click', function(){
    grid.innerHTML = '';
    startGame(49, 'width7');
})

//START GAME
function startGame(totalSquares, level){
    squareOnGrid(totalSquares, level);
    const positionsBomb = createBombs(totalSquares);
    console.log('La posizione delle bombe è ' + positionsBomb)
}

//function create square
function createSquare(){
    const square = document.createElement('div');
    square.classList.add('square');
    return square;
}

//creazione quadrati dentro la griglia
function squareOnGrid(totalSquares, level){
    for(let i=0; i < totalSquares; i++){
        const square = createSquare()
        square.id = (i+1);
        grid.appendChild(square);
        square.innerHTML = [i + 1];
        square.classList.add(level);
    }
}

//function numero random in un determinato range
function numeroRandomRange(min, max){
    const range = (max - min) + 1;
    const numeroRandom = Math.floor(Math.random()*range + min);
    return numeroRandom; 
}

// function numer unico
function numeroUnico (min, max, used){
    let numeroUnico = numeroRandomRange(min, max);
    while(used.includes(numeroUnico)){
        numeroUnico = numeroRandomRange(min, max);
    }
    return numeroUnico;
}


//creazione array bombe
function createBombs(totalSquares){
    const positions = [];
    for(let i=0; positions.length < bombTotal; i++){
        let bomb = numeroUnico(1, totalSquares, positions);
        positions.push(bomb);
    }
    return positions;
}



// //function click cambio colore
// function checkClick(squareTarget,positionsBomb){
//     for(let i=1; i <= 100; i++){
//         const square = document.getElementById(i);
//         const positionsBomb = createBombs(totalSquares);
//         const isBomb = positionsBomb.includes(i);
//         square.addEventListener('click', function(){
//             if(isBomb){
//                 squareTarget.classList.add('bg-red');
//                 squareTarget.innerHTML = `<i class="fas fa-bomb"></i>`
//                 grid.classList.add('pointer-none');
//                 document.querySelector('.game-over').classList.remove('d-none');
//                 document.querySelector('.game-over').innerHTML = `HAI PERSO! Il tuo punteggio è: ${score}!`
//                 showBombs(positionsBomb)
//             }
//             else{
//                 square.classList.add('bg-blue');
//                 square.classList.add('pointer-none');
//                 score = score + 1;
//             }
//         })
//     }
// }


// function mostra bomba al game over
function showBombs(bombs){
    const allSquares = document.querySelectorAll('.square')
    for(let i=0; i < allSquares.length; i++){
        if(bombs.includes(i+1)){
            const square = allSquares[i];
            square.classList.add('bg-red');
            square.innerHTML = `<i class="fas fa-bomb"></i>`
        }
    }
}
