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

const grid = document.querySelector('.grid');
const positionsBomb = [];
let difficulty;
let score = 0;
let columns = 10;
let rows = 10;

//scelta difficoltà
do{
    difficulty = parseInt(prompt('Scegli un livello di difficoltà tra 1, 2 o 3'));
} while (difficulty < 1 || difficulty > 3 || isNaN(difficulty));




if(difficulty == 2){
    columns = 9;
    rows = 9;
}
else if(difficulty == 3){
    columns = 7;
    rows = 7;
}
else{}

const totalSquares = columns * rows;

//array bombe

for(let i=0; positionsBomb.length < 16; i++){
    let bomb = numeroUnico(1, totalSquares, positionsBomb);
    positionsBomb.push(bomb);
}

//quadrati dentro la griglia
for(let i=0; i < totalSquares; i++){
    const square = createSquare()
    square.id = (i+1);
    grid.appendChild(square);
    square.innerHTML = [i + 1];
    
    if(difficulty == 2){
        square.classList.add('width9');
    }
    else if(difficulty == 3){
        square.classList.add('width7');
    }
    else{
        square.classList.add('width10');
    }
}

//FUNCTION CREO ELEMENTI DIV CON CLASSE SQUARE
function createSquare(){
    const square = document.createElement('div');
    square.classList.add('square');
    return square;
}

// FUNCTION NUMERO RANDOM
function numeroRandomRange(min, max){
    const range = (max - min) + 1;
    const numeroRandom = Math.floor(Math.random()*range + min);
    return numeroRandom; 
}

//FUNCTION NUMERO UNICO RANDOM
function numeroUnico (min, max, used){
    let numeroUnico = numeroRandomRange(min, max);
    while(used.includes(numeroUnico)){
        numeroUnico = numeroRandomRange(min, max);
    }
    return numeroUnico;
}


//FUNCTION CAMBIO COLORE AL CLICK
for(let i=1; i <= totalSquares; i++){
    const square = document.getElementById(i);
    const isBomb = positionsBomb.includes(i);
    square.addEventListener('click', function(){
        if(isBomb){
            square.classList.add('bg-red');
            square.innerHTML = `<i class="fas fa-bomb"></i>`
            document.querySelector('.container').classList.add('pointer-none');
            document.querySelector('.game-over').classList.remove('d-none');
            document.querySelector('.game-over').innerHTML = `HAI PERSO! Il tuo punteggio è: ${score}!`
            showBombs(positionsBomb)
        }
        else{
            square.classList.add('bg-blue');
            square.classList.add('pointer-none');
            score = score + 1;
        }
    })
}

//FUNCTION MOSTRA BOMBE AL GAME OVER
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

