let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
function getRandomCard() {
    let randomCard = Math.floor(Math.random() * 13) + 1; // Simulating all possible cards
    if (randomCard > 10) {
        return 10; // Face cards are worth 10
    } else if (randomCard === 1) {
        return 1; // Player will choose between 1 or 11
    } else {
        return randomCard;
    }
}

function startGame() {
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}
function renderGame() {
   cardsEl.textContent = "Cards: ";
    for(let i = 0; i < cards.length; i++) {
       cardsEl.textContent += cards[i] + ' ';
    }
    sumEl.textContent = "Sum: " + sum;
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
    } else {
        message = "You're out of the game!";
        isAlive = false;
    }
    messageEl.textContent = message;
}
function showAceChoices() {
    document.getElementById("choose-ace-btn").style.display = "none";
    document.getElementById("ace-1-btn").style.display = "block";
    document.getElementById("ace-11-btn").style.display = "block";
}

function setAceValue(value) {
    sum += value;
    cards.push(value);
    document.getElementById("ace-1-btn").style.display = "none";
    document.getElementById("ace-11-btn").style.display = "none";
    document.getElementById("choose-ace-btn").style.display = "none";
renderGame(); 
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
      let card = getRandomCard();
        if (card === 1) {
            document.getElementById("choose-ace-btn").style.display = "block";
        return;
        }
    sum += card;
    cards.push(card);
    renderGame();  
    }
}
