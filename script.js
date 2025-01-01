const words = ["javascript", "hangman", "programming", "coding", "challenge", "jayce", "hummus", "turtle", "fart", "toilet", "words", "item", "apple", "stairs", "because", "microscopic", "disease", "language"];
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
    const guessInputValue = guessInput.value.trim().toLowerCase();
    guessInput.value = ""; // Clear input

    if (guessInputValue) {
        // Check if it's a single letter or a full word
        if (guessInputValue.length === 1) {
            // It's a letter guess
            if (!wrongLetters.includes(guessInputValue) && !correctLetters.includes(guessInputValue)) {
                if (selectedWord.includes(guessInputValue)) {
                    correctLetters.push(guessInputValue); // Add guessed letter to correctLetters
                } else {
                    wrongLetters.push(guessInputValue); // Add guessed letter to wrongLetters
                }
            }
        } else if (guessInputValue === selectedWord) {
            // Full word guess
            correctLetters = selectedWord.split(""); // Set correctLetters to the full word
        } else {
            // If the word guess is incorrect
            wrongLetters.push(guessInputValue);
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

// Event listener for the "Enter" key press
document.getElementById("guessInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        guess();
    }
});
