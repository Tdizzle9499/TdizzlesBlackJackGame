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
//betting
let balance = 100;
let betAmount = 0;
function getRandomCard() {
    let randomCard = Math.floor(Math.random() * 13) + 1; // Simulating all cards including face cards

    if (randomCard > 10) {
        return 10; // Face cards are worth 10
    } else if (randomCard === 1) {
        return "Ace"; // Player will choose between 1 or 11
    } else {
        return randomCard;
    }
}


function startGame() {
    isAlive = true;
    hasBlackJack = false;

    // Player cards
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();

    cards = [firstCard, secondCard];
    document.getElementById("ace-1-btn").style.display = "none";
    document.getElementById("ace-11-btn").style.display ="none";
    
    // Check if an Ace was drawn, then show choice buttons
    if (firstCard === "Ace" || secondCard === "Ace") {
        document.getElementById("ace-1-btn").style.display = "block";
        document.getElementById("ace-11-btn").style.display = "block";
    }

    // Calculate sum, ignoring Ace (since player will choose its value)
    sum = 0;
    for (let i = 0; i < cards.length; i++) {
        if (cards[i] !== "Ace") {
            sum += cards[i];
        }
    }
 // Dealer cards (Automatically assigns Ace values)
    let dealerFirstCard = getRandomCard();
    let dealerSecondCard = getRandomCard();

    if (dealerFirstCard === "Ace") dealerFirstCard = (dealerSum + 11 <= 21) ? 11 : 1;
    if (dealerSecondCard === "Ace") dealerSecondCard = (dealerSum + 11 <= 21) ? 11 : 1;

    dealerCards = [dealerFirstCard, dealerSecondCard];
    dealerSum = dealerFirstCard + dealerSecondCard;

    renderGame();
}

function placeBet() {
    let betInput = document.getElementById("bet-input").value;

    // Prevent betting when balance is zero
    if (balance <= 0) {
        alert("You're out of money! Reload page to play again.");
        return;
    }

    // Validate bet amount
    if (betInput > 0 && betInput <= balance) {
        betAmount = parseInt(betInput);
        balance -= betAmount;
        document.getElementById("balance-el").textContent = "Balance: $" + balance;
        startGame(); // Start game after bet
} else if (betInput === 0) {
  alert("You can not place a bet of $0");  
} else {
        alert("Invalid bet! Check your balance.");
    }
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
    document.getElementById("ace-1-btn").style.display = "block";
    document.getElementById("ace-11-btn").style.display = "block";
}
function setAceValue(value) {
    let aceIndex = cards.indexOf("Ace");
    if (aceIndex !== -1) {
        cards[aceIndex] = value; // Replace "Ace" with 1 or 11
        sum += value; // Add selected value to total sum
    }

    // Hide selection buttons
    document.getElementById("ace-1-btn").style.display = "none";
    document.getElementById("ace-11-btn").style.display = "none";

    renderGame();
}


function dealerPlay() {
    while (dealerSum < 17) {
        let card = getRandomCard();

        // Proper Ace Handling
        if (card === "Ace") {
            card = (dealerSum + 11 <= 21) ? 11 : 1;
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
    if (dealerSum > 21 || sum > dealerSum) {
        message = "You win!";
        balance += betAmount * 2; // Double payout
    } else if (sum < dealerSum) {
        message = "Dealer wins!";
        // No refund, bet is lost
    } else {
        message = "It's a tie!";
        balance += betAmount; // Refund
    }

    isAlive = false;
    messageEl.textContent = message;
    document.getElementById("balance-el").textContent = "Balance: $" + balance;
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard();

        if (card === "Ace") {
            cards.push("Ace"); // Temporarily show "Ace"
            renderGame(); // Update UI to allow selection

            // Show buttons for 1 or 11 choice
            document.getElementById("ace-1-btn").style.display = "block";
            document.getElementById("ace-11-btn").style.display = "block";
            return; // Wait for player choice
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

function setAceValue(value) {
    for (let i = 0; i < cards.length; i++) {
        if (cards[i] === "Ace") {
            cards[i] = value; // Replace ALL occurrences of "Ace"
            sum += value; // Update sum accordingly
        }
    }

    // Hide selection buttons
    document.getElementById("ace-1-btn").style.display = "none";
    document.getElementById("ace-11-btn").style.display = "none";

    renderGame();
}




function playerStand() {
    if (isAlive){
    dealerPlay();
} else {
        messageEl.textContent = "You busted!";
}
}

