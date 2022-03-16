//Creare una griglia di gioco quadrata, in cui ogni cella contiene un numero 
//tra quelli compresi in un range compreso tra 1 e 100
//Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.


let difficulty;
do{
    difficulty = parseInt(prompt('Scegli un livello di difficoltà tra 1, 2 o 3'));
} while (difficulty < 1 || difficulty > 3 || isNaN(difficulty));

const grid = document.querySelector('.grid');

let columns = 10;
let rows = 10;

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
//const allNumberExtract = [];

//creazione quadrati dentro la griglia
for(let i=0; i < totalSquares; i++){
    const square = createSquare()
    grid.appendChild(square);
    square.innerHTML = [i + 1];
    // let numberExtract;
    
    if(difficulty == 2){
        square.classList.add('width9');
      //  numberExtract = numeroUnico(1, 81, allNumberExtract);
    }
    else if(difficulty == 3){
        square.classList.add('width7');
      //  numberExtract = numeroUnico(1, 49, allNumberExtract);
    }
    else{
        square.classList.add('width10');
       // numberExtract = numeroUnico(1, 100, allNumberExtract);
    }
/*
    square.innerHTML = numberExtract;
    allNumberExtract.push(numberExtract);
*/

//function click cambio colore
    square.addEventListener('click', function(){
        square.classList.toggle('bg-blue')

    })
}

//function create square
function createSquare(){
    const square = document.createElement('div');
    square.classList.add('square');
    return square;
}


/*

// numero random in un determinato range
function numeroRandomRange(min, max){
    const range = (max - min) + 1;
    const numeroRandom = Math.floor(Math.random()*range + min);
    return numeroRandom; 
}

//numer unico
function numeroUnico (min, max, used){
    let numeroUnico = numeroRandomRange(min, max);
    while(used.includes(numeroUnico)){
        numeroUnico = numeroRandomRange(min, max);
    }
    return numeroUnico;
}
*/


