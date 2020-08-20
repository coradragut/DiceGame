/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying;

init();


//var lastDice;


function init(){
    
    gamePlaying = true;
    
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;  
    
    //make the die disappear from the page when we first open the game
    //we select the class .dice, then call the method style, and set the display property to none
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    
    //sets all scores to 0;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    
    //change back the names of players when a new game starts
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active'); //because he is the start player by default
    
    document.getElementById('name').value = '';
      
}

 

//event
document.querySelector('.btn-roll').addEventListener('click', function(){
  
    if(gamePlaying){
         //1. random nr
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
         
    
        //2.display result
        document.querySelector('#dice-1').style.display = 'block'; //make it visible
        document.querySelector('#dice-2').style.display = 'block'; //make it visible;
       
        document.querySelector('#dice-1').src = 'dice-' + dice + '.png';
        document.querySelector('#dice-2').src = 'dice-' + dice2 + '.png';
          
        //3.update round score IF the rolled nr was NOT a 1
        if(dice !== 1 && dice2 !== 1 ){
            //add score
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }  else {
            //next player
            nextPlayer();
        }
    }
});
  


document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if(gamePlaying){
        //add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore; //activePlayer, aka 0 or 1, becomes the index for the array of scores

        //update UI - user interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        var winningScore = document.getElementById('name').value;
        if (winningScore === '' || winningScore === '0' || winningScore === null){
            winningScore = 100;
        }
    
        
        
        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else{
            nextPlayer(); 
        }
    }  
});

function nextPlayer(){
    //next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        
        //the dice will disappear when the other player becomes active
        document.querySelector('#dice-1').style.display = 'none';
        document.querySelector('#dice-2').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);







