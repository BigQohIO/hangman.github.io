const words = ["javascript", "hangman", "programming", "coding", "challenge", "jayce", "hummus", "turtle", "fart", "toilet", "words", "item", "apple", "stairs"];
let selectedWord;
let wrongLetters = [];
let correctLetters = [];
let messageElement = document.getElementById("message");
let wordDisplayElement = document.getElementById("wordDisplay");
let wrongLettersElement = document.getElementById("wrongLetters");
let guessInput = document.getElementById("guessInput");

function selectRandomWord() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    wordDisplayElement.innerHTML = selectedWord.split("").map(letter => (correctLetters.includes(letter) ? letter : "_")).join(" ");
}

function guess() {
    const guessedWord = guessInput.value.toLowerCase();
    guessInput.value = ""; // Clear input

    if (guessedWord && !wrongLetters.includes(guessedWord) && !correctLetters.includes(guessedWord)) {
        if (guessedWord === selectedWord) {
            correctLetters = selectedWord.split("");
        } else {
            wrongLetters.push(guessedWord);
        }
        updateDisplay();
    }
}

function updateDisplay() {
    displayWord();
    wrongLettersElement.innerHTML = "Wrong guesses: " + wrongLetters.join(", ");
    
    if (wrongLetters.length >= 6) {
        messageElement.innerHTML = "Game Over! The word was: " + selectedWord;
        document.getElementById("guessButton").disabled = true;
    } else if (!wordDisplayElement.innerHTML.includes("_")) {
        messageElement.innerHTML = "Congratulations! You've guessed the word!";
        document.getElementById("guessButton").disabled = true;
    }
}

function restartGame() {
    wrongLetters = [];
    correctLetters = [];
    messageElement.innerHTML = "";
    selectRandomWord();
    displayWord();
    wrongLettersElement.innerHTML = "";
    document.getElementById("guessButton").disabled = false;
    guessInput.value = "";
}

// Start the game
selectRandomWord();
displayWord();





// Existing code...

document.getElementById("guessInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        guess();
    }
});

// Existing code...
