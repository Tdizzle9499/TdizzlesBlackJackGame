let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let player = {
 let name: = "name",
 chips: 0 
};
let playerName = "Will be added soon " + name;
let playerChips = chips;
let playerEl = document.getElementById("player-el");
playerEl.textContent = playerName + ": $" + playerChips;
function getRandomCard() {
    let randomCard = Math.floor(Math.random()*11) + 1;
    if (randomCard > 10) {
        return 10;
    } else if (randomCard === 1) {
        return 11;
    } else {
        return randomCard;
    }
    return randomCard;
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

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
      let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();  
    }
}


