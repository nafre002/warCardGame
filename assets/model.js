var suits = ['spades', 'hearts', 'clubs', 'diams'];
var cardFace = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
var cards = [];
var players = [[],[]];
var firstRun = true;
var gameOver = false;
var timer;
var r = 0;
var fightButton = document.querySelector('#btnBattle');
var fightButton10 = document.querySelector('#btnBattle10');
var p1 = document.querySelector('#player1 .hand');
var p2 = document.querySelector('#player2 .hand');
var s1 = document.querySelector('#player1 .score');
var s2 = document.querySelector('#player2 .score');
var message = document.getElementById('message');

//event listeners
fightButton.addEventListener('click', battle);
fightButton10.addEventListener('click', function(){
	rounds(10);
});

//functions

function rounds(a){
	r = a;
	timer = setInterval(function(){
		battle()
	}, 100);
}

function battle() {
	if ( timer){
		r--;
		outputMessage('Rounds left ' + r);
		if ( r < 1){
			window.clearInterval(timer);
		}
	}
	if (firstRun){
		firstRun = false;
		buildCards();
		dealCards();
	}
	attack();
}

function attack(){
	if(!gameOver){
		var card1 = players[0].shift();
		var card2 = players[1].shift();
		var pot = [card1, card2];
		//update html
		p1.innerHTML = showCard(card1, 0);
		p2.innerHTML = showCard(card2, 0);
		//check winners
		checkWinner(card1, card2, pot);
		//update scores
		s1.innerHTML = players[0].length;
		s2.innerHTML = players[1].length;
	}else{
		outputMessage('Game over!');
	}
}

function checkWinner(card1, card2, pot){
	if(card1.cardValue > card2.cardValue){
		outputMessage('player1 wins')
		players[0] = players[0].concat(pot);
	}else if(card2.cardValue > card1.cardValue){
		outputMessage('player2 wins');
		players[1] = players[1].concat(pot);
	}else{
		battlemode(pot);
		outputMessage('tie');
	}
}

function battlemode(pot){
	var card1, card2;
	var pos = (pot.length/2);
	if((players[0].length <= 4)||(players[1].length <= 4)){
		console.log('Game Over!');
		gameOver = true;
		return; 
	}else{
		for (var i = 0 ; i < 4 ; i++){
			card1 = players[0].shift();
			pot = pot.concat(card1);
			p1.innerHTML += showCard(card1, (pos+i));
		}
		for ( var i = 0 ; i < 4 ; i++){
			card2 = players[1].shift();
			pot = pot.concat(card2);
			p2.innerHTML += showCard(card2, (pos+i));
		}
		checkWinner(card1, card2, pot);
	}
}

function showCard(c, p){
	var move = p * 40 ;
	//var bgColor = (c.icon == 'H' || c.icon == 'D') ? 'red' : 'black';
	var bCard = '<div class="icard '+c.suit+' " style="left:'+move+'px">';
	bCard += '<div class="cardtop suit">' + c.num + '<br/></div>';
	bCard += '<div class="cardmid suit"></div>';
	bCard += '<div class="cardbottom suit">'+c.num+'<br/></div></div>';
	return bCard;
}

function dealCards(){
	for( var i = 0 ; i<cards.length ; i++){
		players[i % 2].push(cards[i]);
	}
}

function buildCards(){
	cards = [];
	for(s in suits){
		var suit = suits[s][0].toUpperCase();
		for ( n in cardFace){
			var card = {
				suit: suits[s],
				num: cardFace[n],
				cardValue: parseInt(n) + 2,
			//	icon:suitNew
			}
			cards.push(card);
		}
	}
	cards = cards.sort(() => Math.random() - 0.5)
		
}

function outputMessage(mes){
	message.innerHTML = mes;
}