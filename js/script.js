// funzione che genera uno switch tra varie opzioni
function activeChoice(choice, option1, option2, option3) {
    const main = document.querySelector("main");
    const gameTable = document.createElement("div");
    gameTable.classList.add("game-table");
    if(choice.value == option1.value){
        main.innerHTML = "";
        getactivableDivOnDOM(100, gameTable, "square-100", "active", "mine", 16, "stop-hover");
    } else if(choice.value == option2.value){
        main.innerHTML = "";
        getactivableDivOnDOM(81, gameTable, "square-81", "active", "mine", 16, "stop-hover");
    } else if(choice.value == option3.value){
        main.innerHTML = "";
        getactivableDivOnDOM(49, gameTable, "square-49", "active", "mine", 8, "stop-hover");
    }
    main.append(gameTable);
}
// funzione che genera una griglia con elementi cliccabili
function getactivableDivOnDOM(numberOfDiv, positionOnDOM, divClass, divActiveClass, mine, numberOfMines, stopGameClass) {
    // array delle mine
    const mines = getRandArray(numberOfMines, 1, numberOfDiv);
    // array degli elementi controllati
    const checked = [];
    // costruisco i div assegnando le classi square e le classi mine in base all'array generato in precedenza
    for(let i = 0; i < numberOfDiv; i++) {
        const div = document.createElement("div");
        div.classList.add(divClass);
        if(mines.includes(i + 1)) {
            div.classList.add(mine);
        };
        div.append(i + 1);
        div.addEventListener("click",
            function () {
                div.classList.add(divActiveClass);
                const scoreCounter = getValue(positionOnDOM.childNodes[numberOfDiv].childNodes[1].childNodes[1]);
                if(this.classList.contains(mine)) {
                    const squares = document.querySelectorAll("div[class *= square]");
                    
                    for (let j = 0; j < numberOfDiv; j++){
                        squares[j].classList.add(stopGameClass);
                        if(squares[j].classList.contains(mine)){
                            squares[j].classList.add(divActiveClass);
                        }
                        positionOnDOM.replaceChild(squares[j].cloneNode(true), squares[j]);
                    }

                    positionOnDOM.childNodes[numberOfDiv].classList.add(divActiveClass);
                    giveValue("Hai perso", positionOnDOM.childNodes[numberOfDiv].childNodes[0]);
                } else if (scoreCounter != numberOfDiv - 16) {
                    if(!(checked.includes(this))) {
                        giveValue(scoreCounter + 1, positionOnDOM.childNodes[numberOfDiv].childNodes[1].childNodes[1]);
                        checked.push(this);
                    }
                } else {
                    giveValue(scoreCounter + 1, positionOnDOM.childNodes[numberOfDiv].childNodes[1].childNodes[1]);
                    giveValue("Hai vinto!", positionOnDOM.childNodes[numberOfDiv].childNodes[0]);
                    positionOnDOM.childNodes[numberOfDiv].classList.add(divActiveClass);
                }
            }
        );

        positionOnDOM.append(div);
    }
    const div = document.createElement("div");
    div.classList.add("message");
    const divText = document.createElement("h2");
    const spanText = document.createElement("span");
    const spanScore =  document.createElement("span");
    div.append(divText);
    spanText.append("punteggio: ")
    spanScore.append("0");
    spanText.append(spanScore);
    div.append(spanText);
    positionOnDOM.append(div);
}
// funzione che genera un array di N numeri casuali contenuti tra min e max
function getRandArray(numberOfElements, minValue, maxValue){
    const array = [];
    let i = 0;
    if(numberOfElements <= (maxValue - minValue + 1)) {    
        while(i < numberOfElements) {
            const rand = Math.floor(Math.random()*(maxValue - minValue + 1) + minValue);
            if(!(array.includes(rand))) {
                array.push(rand);
                i++;
            }
        }
        return array;
    }
}
// funzione che prende un numero dal Dom e ne verifica il valore
function getValue(domPosition) {
    return parseInt(domPosition.innerHTML);
}
// funzione che stampa un elemento sul Dom
function giveValue(value, domPosition) {
    domPosition.innerHTML = value; 
}


// seleziono l'header
const pageHeader = document.querySelector("header");
// genero il titolo e lo metto in pagina
const pageTitle = document.createElement("h1");
pageTitle.append("Campo Minato: La Griglia");
pageHeader.firstElementChild.append(pageTitle);
// genero la parte dell'header per selezionare la difficoltà
const difficultyDiv = document.createElement("div");

const difficultyLabel = document.createElement("label");
difficultyLabel.append("difficoltà:");
difficultyLabel.for = "difficulty";

const difficultySelect= document.createElement("select");
difficultySelect.name = "difficulty"; 
difficultySelect.id = "difficulty"; 

const difficultyOption1 = document.createElement("option");
difficultyOption1.innerHTML = "easy";
difficultyOption1.value = "easy";
difficultySelect.appendChild(difficultyOption1);
const difficultyOption2 = document.createElement("option");
difficultyOption2.innerHTML = "hard";
difficultyOption2.value = "hard";
difficultySelect.appendChild(difficultyOption2);
const difficultyOption3 = document.createElement("option");
difficultyOption3.innerHTML = "crazy";
difficultyOption3.value = "crazy";
difficultySelect.appendChild(difficultyOption3);

const difficultyButton = document.createElement("button");
difficultyButton.append("Play");

difficultyDiv.appendChild(difficultyLabel);
difficultyDiv.appendChild(difficultySelect);
difficultyDiv.appendChild(difficultyButton);

pageHeader.appendChild(difficultyDiv);


// lancio le mie funzioni sull'addEvent listener
difficultyButton.addEventListener('click', () => {activeChoice(difficultySelect, difficultyOption1, difficultyOption2, difficultyOption3)});
