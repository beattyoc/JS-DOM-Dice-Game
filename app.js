var scores, roundScore, activePlayer, gamePlaying, prevDiceOne, prevDiceTwo, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        document.querySelector('.btn-score').style.display = "none";
        document.querySelector('.winning-score').style.display = "none";

        // 1. Random number
        var diceOne = Math.floor(Math.random() * 6) + 1;
        var diceTwo = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOMOne = document.querySelector('.dice-0');
        diceDOMOne.style.display = 'block';
        diceDOMOne.src = 'dice-' + diceOne + '.png';
        var diceDOMTwo = document.querySelector('.dice-1');
        diceDOMTwo.style.display = 'block';
        diceDOMTwo.src = 'dice-' + diceTwo + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if (diceOne === 1 || diceTwo == 1
            || (diceOne === 6 && prevDiceOne === 6)
            || (diceTwo === 6 && prevDiceTwo === 6)) {
            // Next player
            nextPlayer();
        } else {
            // Add score
            roundScore += diceOne + diceTwo;
            prevDiceOne = diceOne;
            prevDiceTwo = diceTwo;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } 
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice-0').style.display = 'none';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        } else {
            // Next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    prevDiceOne = null;
    prevDiceTwo = null;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    winningScore = 100;

    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.btn-score').style.display = "block";
    document.querySelector('.winning-score').style.display = "block";

    gamePlaying = true;
}

document.querySelector('.btn-score').addEventListener('click', function () {
    winningScore = document.querySelector('.winning-score').value;
    if (!winningScore) {
        winningScore = 100;
    }
    console.log(winningScore);

    document.querySelector('.btn-score').style.display = "none";
    document.querySelector('.winning-score').style.display = "none";
});
