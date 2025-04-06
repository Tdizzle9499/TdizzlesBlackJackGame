let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
//dealer
let dealerCards = [];
let dealerSum = 0;
function getRandomCard() {
    let randomCard = Math.floor(Math.random() * 10) + 1; // Simulating all possible cards
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
    //player
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    //Dealer
    let dealerFirstCard = getRandomCard();
    let dealerSecondCard = getRandomCard();
    dealerCards = [dealerFirstCard, dealerSecondCard];
    dealerSum = dealerFirstCard + dealerSecondCard;
    renderGame();
}
function renderGame() {
    // Player Cards
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }
    sumEl.textContent = "Sum: " + sum;

    // Dealer Cards (Only Show First Card)
    let dealerEl = document.getElementById("dealer-el");
    dealerEl.textContent = "Dealer's Cards: " + dealerCards[0] + ", hidden";

    // Dealer Sum (Only Show First Card's Value)
    let dealerSumEl = document.getElementById("dealerSum-el");
    dealerSumEl.textContent = "Dealer's Sum: " + dealerCards[0]; // Only show first card's value

    // Game Message
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
function dealerPlay() {
    while (dealerSum < 17) {
        let card = getRandomCard();

        // Convert Ace to 11 if it doesn't bust the dealer
        if (card === 1 && dealerSum + 11 <= 21) {
            card = 11;
        }

        dealerCards.push(card);
        dealerSum += card;
    }
    
    let dealerEl = document.getElementById("dealer-el");
    dealerEl.textContent = "Dealer's Cards: " + dealerCards.join(" ");

    let dealerSumEl = document.getElementById("dealerSum-el");
    dealerSumEl.textContent = "Dealer's Sum: " + dealerSum;

    determineWinner();
}


function determineWinner() {
    if (dealerSum > 21) {
        message = "Dealer busted! You win";
    } else if (sum > dealerSum) {
        message = "You win";
    } else if (sum < dealerSum) {
        message = "Dealer wins!";
    } else {
        message = "It's a tie";
    }
    isAlive = false;
    messageEl.textContent = message;
}

    function newCard() {
    if (isAlive && !hasBlackJack) {
      let card = getRandomCard();
        if (card === 1) {
            document.getElementById("choose-ace-btn").style.display = "block";
        return;
        }
    sum += card;
    cards.push(card);
    renderGame(); 
        if (sum > 21) {
            isAlive = false;
            messageEl.textContent = "You busted!";
    }
}
    }
function playerStand() {
    if (isAlive){
    dealerPlay();
} else {
        messageEl.textContent = "You busted!";
}
}

