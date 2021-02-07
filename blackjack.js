const deck = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const value = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
const imgDeck = [];
var z, dea_score, pl_score, pl, dea;

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

init();

function init() {
	let node_pl = document.getElementById("player");
	let node_dea = document.getElementById("dealer");

	while (node_pl.firstChild) {
		node_pl.removeChild(node_pl.lastChild);
	}

	while (node_dea.firstChild) {
		node_dea.removeChild(node_dea.lastChild);
	}

	z = 2;
	pl = [];
	dea = [];
	dea_score = 0;
	pl_score = 0;
	let colour;
	for (let i = 0; i < 2; i++) {
		let x = Math.floor(Math.random() * deck.length);
		colour = randomizer();
		dea.push(deck[x]);
		node_dea.appendChild(colour[x]);
		console.log(colour[x]);
		console.log(deck[x]);
		console.log();
		
		if (deck[x] == 'A') {
			dea_score = checkAce(dea_score);
		}
		else {
			dea_score += value[x];
		}

		colour = randomizer();
		x = Math.floor(Math.random() * deck.length);
		pl.push(deck[x]);
		node_pl.appendChild(colour[x]);
		console.log(colour[x]);
		console.log(deck[x]);
		console.log();
		if (deck[x] == 'A') {
			pl_score = checkAce(pl_score);
		}
		else {
			pl_score += value[x];
		}	
	}
	document.getElementById("pl_label").innerHTML ="Gracz: " + pl_score;

	document.getElementById("dea_label").innerHTML ="Krupier: " + dea_score;

	blackCheck();
	dealerMatch();
}

function f(){
	let x = Math.floor(Math.random() * deck.length);
	if (deck[x] == 'A') {
		pl_score = checkAce(pl_score);
	}
	else {
		pl_score += value[x];
	}
	let colour;
	colour = randomizer();
	document.getElementById("player").appendChild(colour[x]);
	document.getElementById("pl_label").innerHTML ="Gracz: " + pl_score;
	z++;
	if (pl_score > 21) {
		end();
	}
}

async function end(){
	colour = randomizer();
	for (var i = 0; i < imgDeck.length; i++) {
		document.getElementById("dealer").appendChild(imgDeck[i]);
	}
	document.getElementById("dea_label").innerHTML ="Krupier: " + dea_score;

	if ((pl_score > dea_score || (pl_score == dea_score && pl.length < dea.length) || dea_score > 21) && pl_score <= 21) {
		alert("Wygrales");
	}
	else if(pl_score == dea_score && pl.length == dea.length) {
		alert("Remis");
	}
	else if (pl_score < dea_score || (pl_score == dea_score && pl.length > dea.length) || pl_score > 21) {
		alert ("Przegrales");
	}
	await sleep(3000);
	init();
}

function checkAce(score) {
	if (score > 10) {
		score++;
	}
	else {
		score += 11;
	}
	return score;
}

function randomizer() {
	let colour;
	let x = Math.floor(Math.random() * 4);
	switch(x) {
		case 0 : colour = clubs; break;
        case 1 : colour = diamonds; break;
        case 2 : colour = hearts; break;
        case 3 : colour = spades; break;
	}
	return colour;
}

async function blackCheck() {
	if ((pl.includes('A') && (pl.includes('Q') || pl.includes('J') || pl.includes('K') || dea.includes('10'))) &&
	 (dea.includes('A') && (dea.includes('Q') || dea.includes('J') || dea.includes('K') || dea.includes('10')))) {
		await sleep(2000)
		alert("Blackjack po obu stronach, remis");
		init();
	}
	else if (pl.includes('A') && (pl.includes('Q') || pl.includes('J') || pl.includes('K') || dea.includes('10'))) {
		await sleep(2000)
		alert("Blackjack, wygrales");
		init();
	}
	else if (dea.includes('A') && (dea.includes('Q') || dea.includes('J') || dea.includes('K') || dea.includes('10'))) {
		await sleep(2000);
		alert("Blackjack, przeciwnik wygral");
		init();
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function dealerMatch() {
	let i = 0;
	while (dea_score <= 16) {
		let x = Math.floor(Math.random() * deck.length);
		if (deck[x] == 'A') {
			dea_score = checkAce(pl_score);
		}
		else {
			dea_score += value[x];
		}
		dea.push(deck[x]);
		colour = randomizer();
		imgDeck[i] = colour[x];
		i++;
	}
}