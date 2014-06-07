// ==UserScript==
// @name           BvS WK Sync
// @namespace      BvS
// @include        http://www.animecubed.com/billy/bvs/worldkaiju-group.html
// @include        http://animecubed.com/billy/bvs/worldkaiju-group.html
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2010, Daniel Karlsson
// ==/UserScript==

const TIMELIMIT = 5000; // ms

var options = document.evaluate("//form[@name='groupcheck']/select[@name='c1']/option",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var colours = [];
for (var i = 0; i < options.snapshotLength; i++) {
	var value = parseInt(options.snapshotItem(i).value);
	var colour = options.snapshotItem(i).textContent;
	colours[value] = colour;
}

function find(val, arr)
{
	for (var i in arr)
		if (arr[i] == val)
			return i;
	return -1;
}
function print(arr)
{
	var xarr = [];
	for (var i in arr)
		xarr.push(colours[arr[i]]);
	return xarr.join(",");
}
	
function Mastermind(pegs, colours)
{
	var my = this;
	
	my.colours = colours;
	my.pegs = pegs;
	my.prevGuesses = [];
	
	// Create array of all possible combinations
	my.combinations = [];
	for (var i = 0; i < Math.pow(my.colours, my.pegs); i++) {
		var n = i;
		var comb = [];
		for (var p = 0; p < my.pegs; p++) {
			comb.push(n % my.colours);
			n = Math.floor(n / my.colours);
		}
		my.combinations.push(comb);
	}
	
	my.appendGuess = function(g, s) {
		my.prevGuesses.push({guess: g, score: s});
	}
	
	// Determine score as [<correct colour, correct position>, <correct colour, wrong position>]
	my.score = function(guess, board) {
		var boardColours = [];
		var guessColours = [];
		
		for (var i = 0; i < my.colours; i++) {
			boardColours.push(0);
			guessColours.push(0);
		}

		var correctPosition = 0;
		for (var i = 0; i < my.pegs; i++) {
			if (board[i] == guess[i])
				correctPosition++;
			else {
				boardColours[board[i]]++;
				guessColours[guess[i]]++;
			}
		}

		var correctColour = 0;
		for (var c = 0; c < my.colours; c++)
			correctColour += Math.min(guessColours[c], boardColours[c]);

		return [correctPosition, correctColour];
	}
	
	my.possibleScores = [];
	for (var c = 0; c <= my.pegs; c++)
		for (var p = 0; p <= my.pegs - c; p++)
			my.possibleScores.push([p, c]);

	// Remove combinations based on guess and score
	my.eliminateCombinations = function(guess, score, splice) {
		var keepers = [];
		var removals = 0;
		for (var c in my.combinations) {
			var s = my.score(guess, my.combinations[c]);
			if (s[0] == score[0] && s[1] == score[1]) {
				if (splice)
					keepers.push(my.combinations[c]);
			} else {
				removals++;
			}
		}
		if (splice)
			my.combinations = keepers;
		return removals;
	}
	
	// Calculate minimum number of eliminations
	my.guessScore = function(guess) {
		var score = my.combinations.length + 1;
		for (var s in my.possibleScores) {
			var removals = my.eliminateCombinations(guess, my.possibleScores[s], false);
			score = Math.min(removals, score);
		}
		return score;
	}
	
	// Estimate time of bsetGuess brute force method
	my.estimateTime = function() {
		var t1 = new Date();
		var score = my.guessScore(my.combinations[0]);
		var t2 = new Date();
		var t = t2.getTime() - t1.getTime();
		return t * my.combinations.length;
	}
	
	// Brute force search of all possibilities
	my.bestGuess = function() {
		var bestGuess;
		var bestScore = -1;
		for (var guess in my.combinations) {
			var score = my.guessScore(my.combinations[guess]);
			if (score > bestScore) {
				bestScore = score;
				bestGuess = my.combinations[guess];
			}
		}
		my.bestScore = bestScore;
		my.bestGuess = bestGuess;
		return bestGuess;
	}

	// Try random guesses until we run out of time
	my.fastGuess = function(limit) {
		var t1 = new Date();
		t1 = t1.getTime();
		var bestGuess;
		var bestScore = -1;
		var time = 0;
		var tried = [];
		do {
			var guess;
			guess = Math.floor(Math.random() * my.combinations.length);
			while (find(guess, tried) >= 0)
				guess = (guess + 1) % my.combinations.length;
			tried.push(guess);
			
			var score = my.guessScore(my.combinations[guess]);
			if (score > bestScore) {
				bestScore = score;
				bestGuess = my.combinations[guess];
			}
			var t2 = new Date();
			time = t2.getTime() - t1;

			if (tried.length >= my.combinations.length)
				break;
		} while (time < limit)
		my.bestScore = bestScore;
		my.bestGuess = bestGuess;
		return bestGuess;
	}
}

var form = document.evaluate("//form[@name='groupcheck']",
	document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
if (form) {
	form = form.singleNodeValue;
	var guesses = document.evaluate("//table/tbody/tr[count(descendant::td)=5]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
	var prevGuesses = 0;
	var board = new Mastermind(4, colours.length);

	// Legacy hint
	if (/You have a strong feeling that the first Chakra isn.t (\w+)/.test(form.textContent)) {
		GM_log("Legacy: " + RegExp.lastParen);
		var chakra = find(RegExp.lastParen, colours);
		
		if (chakra >= 0) {
			keepers = [];
			for (var i in board.combinations)
				if (board.combinations[i][0] != chakra)
					keepers.push(board.combinations[i]);
			GM_log("Kept " + keepers.length + " / " + board.combinations.length);
			board.combinations = keepers;
		}
	}

	for (var g = 0; g < guesses.snapshotLength; g++) {
		var tds = guesses.snapshotItem(g).getElementsByTagName("td");
		var guess = [];
		var res = []
		for (var i = 0; i < 4; i++) {
			var col = tds[i].textContent;
			if (find(col, colours))
				guess.push(find(col, colours));
			else
				continue;
		}
		var match = tds[4].textContent.match(/(\d+)[^\d]+(\d+)/);
		if (match && guess.length == 4) {
			res = [parseInt(match[1]), parseInt(match[2])];
			board.appendGuess(guess, res);
			board.eliminateCombinations(guess, res, true);
			prevGuesses++;
		}
	}
	
	var div = document.createElement("div");
	form.parentNode.insertBefore(div, form.nextSibling);
	div.textContent = "Searching...";
	setTimeout(function() {
		var limited = false;
		var bestGuess;
		if (board.estimateTime() > TIMELIMIT) {
			bestGuess = board.fastGuess(TIMELIMIT);
			limited = true;
		} else
			bestGuess = board.bestGuess();

		if (board.combinations.length > 0) {
			if (limited)
				div.textContent = "Guess (" + Math.round(TIMELIMIT / 1000) + " s search): " + print(bestGuess);
			else
				div.textContent = "Best guess: " + print(bestGuess);
		}
	}, 100);
}
