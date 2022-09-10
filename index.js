const cards = document.querySelectorAll(".memory-card");

let hasFlipCard = false;
// add lockboard, which lock only 2 click on the same time
let lockBoard = false; 
let firstCard, secondCard

function flipCard() { 
    // if lockBoard is true retunr the function below
    if(lockBoard) return;
    // to avoid not working due to clicking more than 2 times
    if(this === firstCard) return;
    this.classList.add("flip");
    if(!hasFlipCard){
        // first click
        hasFlipCard = true;
        firstCard=this;   
    } else {
        // second click
        hasFlipCard = false;
        secondCard=this;

        //function match do cards match? using dataset.framework
        // function disable match if it's a match
        // function unflipcard if it's not match and set time out to sse the flipping
        checkMatchCard()
    }
}

function checkMatchCard() {
        if (firstCard.dataset.frame === secondCard.dataset.frame) {
            disableCard()
        } else {
            unflippedCard()
        }
   
}

function disableCard(){
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflippedCard(){
    lockBoard = true;
    setTimeout(()=> {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1500)
    
}

function resetBoard() {
    [hasFlipCard, lockBoard] = [false, false],
    [firstCard, secondCard] = [null, null]
}

// shuffle the card
function shuffle() {
    cards.forEach(card=> {
        let randomPass = Math.floor(Math.random()*12);
        card.style.order = randomPass;
    });
};

shuffle()


cards.forEach(card => card.addEventListener("click", flipCard));