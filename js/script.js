// funzione che genera uno switch tra varie opzioni
function activeChoice(choice, option1, option2, option3) {
    const main = document.querySelector("main");
    const gameTable = document.createElement("div");
    gameTable.classList.add("game-table");
    if(choice.value == option1.value){
        main.innerHTML = "";
        getactivableDivOnDOM(100, gameTable, "square-100", "active", "mine", 20, "stop-hover");
    } else if(choice.value == option2.value){
        main.innerHTML = "";
        getactivableDivOnDOM(81, gameTable, "square-81", "active", "mine", 20, "stop-hover");
    } else if(choice.value == option3.value){
        main.innerHTML = "";
        getactivableDivOnDOM(49, gameTable, "square-49", "active", "mine", 20, "stop-hover");
    }
    main.append(gameTable);
}
// funzione che genera una griglia con elementi cliccabili
function getactivableDivOnDOM(numberOfDiv, positionOnDOM, divClass, divActiveClass, mine, numberOfMines, stopGameClass) {
    // array delle mine
    const mines = getRandArray(numberOfMines, 1, numberOfDiv);
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
                if(this.classList.contains(mine)) {
                    const squares = document.querySelectorAll("div[class *= square]");
                    for (let i = 0; i < numberOfDiv; i++){
                        squares[i].classList.add(stopGameClass);
                        if(squares[i].classList.contains(mine)){
                            squares[i].classList.add(divActiveClass);
                        }
                        positionOnDOM.replaceChild(squares[i].cloneNode(true), squares[i]);
                    }
                }
            }
        );
        positionOnDOM.append(div);
    }
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



difficultyButton.addEventListener('click', () => {activeChoice(difficultySelect, difficultyOption1, difficultyOption2, difficultyOption3)});
