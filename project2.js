// Get the HTML elements we need to interact with
const playerForm = document.getElementById('player-form');
const playerOneDetails = document.getElementById('player-one-details');
const playerTwoDetails = document.getElementById('player-two-details');
const boardSection = document.getElementById('board');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const timer = document.getElementById('timer');
console.log("boy")
// Define the players
let playerOne = {};
let playerTwo = {};

// Function to validate player names
function validateNames(name) {
  // Names can only contain letters and spaces
  const regex = /^[a-zA-Z\s]*$/;
  return regex.test(name);
}

// Function to display player details
function displayPlayerDetails(player, detailsElement) {
  // Create HTML elements for the player details
  const nameElement = document.createElement('h2');
  const imageElement = document.createElement('img');
  const emailElement = document.createElement('p');

  // Set the values of the HTML elements
  nameElement.textContent = player.name;
  // imageElement.src = player.image;
  emailElement.textContent = player.email;

  // Add the HTML elements to the details element
  detailsElement.appendChild(nameElement);
  // detailsElement.appendChild(imageElement);
  detailsElement.appendChild(emailElement);
}

// Function to roll the dice
function rollDice() {
  // Roll the dice and return the result
  return Math.floor(Math.random() * 6) + 1;
}

// Function to update the player scores
function updatePlayerScores() {
  if (currentPlayer === playerOne) {
    playerOne.score += dice;
  } else {
    playerTwo.score += dice;
  }
}

// Function to switch players
function switchPlayer() {
  if (currentPlayer === playerOne) {
    currentPlayer = playerTwo;
  } else {
    currentPlayer = playerOne;
  }
}

// Function to update the timer
function updateTimer() {
  // Get the current time and convert it to seconds
  const currentTime = timer.textContent;
  const currentTimeInSeconds = parseInt(currentTime.split(':')[0]) * 60 + parseInt(currentTime.split(':')[1]);

  // Decrement the time by 1 second
  const newTimeInSeconds = currentTimeInSeconds - 1;

  // Convert the new time back to minutes and seconds
  const newMinutes = Math.floor(newTimeInSeconds / 60);
  const newSeconds = newTimeInSeconds % 60;

  // Update the timer display
  timer.textContent = `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;

  // End the game if the timer runs out
  if (newTimeInSeconds === 0) {
    clearInterval(timerInterval);
    rollDiceBtn.disabled = true;
    alert(`Time's up! ${currentPlayer.name} wins with a score of ${currentPlayer.score}!`);
  }
}

// Event listener for the player form submission
playerForm.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the player details from the form
  const playerOneName = document.getElementById('player-one-name').value;
  const playerOneImage = document.getElementById('player-one-image').value;
  const playerOneEmail = document.getElementById('player-one-email').value;
  const playerTwoName = document.getElementById('player-two-name').value;
  const playerTwoImage = document.getElementById('player-two-image').value;
  const playerTwoEmail = document.getElementById('player-two-email').value;

  // Validate the player names
  if (!validateNames(playerOneName) || !validateNames(playerTwoName)) {
    alert('Please enter valid names for both players!');
    return;
    }
    
    // Set the player details
    playerOne = {
    name: playerOneName,
    image: playerOneImage,
    email: playerOneEmail
    };
    playerTwo = {
    name: playerTwoName,
    image: playerTwoImage,
    email: playerTwoEmail
    };
    
    // Display the player details on the board section
    displayPlayerDetails(playerOne, playerOneDetails);
    displayPlayerDetails(playerTwo, playerTwoDetails);
    
    // Show the game board and controls
    boardSection.classList.remove('hidden');
    rollDiceBtn.classList.remove('hidden');
    timer.classList.remove('hidden');
    });
    
   // Variables to keep track of the current player and dice roll
let currentPlayer = {};
let dice = 0;

// Event listener for the roll dice button
rollDiceBtn.addEventListener('click', function() {
  // Roll the dice and update the current player's score
  dice = rollDice();
  updatePlayerScores();

  // Update the player scores on the board
  const playerOneScoreElement = document.getElementById('player-one-score');
  const playerTwoScoreElement = document.getElementById('player-two-score');
  if (currentPlayer === playerOne) {
    playerOneScoreElement.textContent = dice;
    playerTwoScoreElement.textContent = '';
  } else {
    playerTwoScoreElement.textContent = dice;
    playerOneScoreElement.textContent = '';
  }

  // Switch players
  switchPlayer();
});

// Start the timer countdown
let timerInterval = setInterval(updateTimer, 1000);

// Function to roll the dice and return a random number between 1 and 6
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Function to update the player scores and check for a winner
function updatePlayerScores() {
  // Update the current player's score
  currentPlayer.score += dice;

  // Check for a winner
  if (currentPlayer.score >= WINNING_SCORE) {
    clearInterval(timerInterval);
    showWinner();
  }
}

// Function to switch players
function switchPlayer() {
  if (currentPlayer === playerOne) {
    currentPlayer = playerTwo;
  } else {
    currentPlayer = playerOne;
  }

  // Update the active player display
  updateActivePlayerDisplay();
}

// Function to update the active player display
function updateActivePlayerDisplay() {
  const playerOneDisplay = document.getElementById('player-one-display');
  const playerTwoDisplay = document.getElementById('player-two-display');

  if (currentPlayer === playerOne) {
    playerOneDisplay.classList.add('active');
    playerTwoDisplay.classList.remove('active');
  } else {
    playerTwoDisplay.classList.add('active');
    playerOneDisplay.classList.remove('active');
  }
}

// Function to show the winner
function showWinner() {
  const winnerDisplay = document.getElementById('winner-display');
  winnerDisplay.textContent = `${currentPlayer.name} wins!`;
  winnerDisplay.classList.add('show');
}
