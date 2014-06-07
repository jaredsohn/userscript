// ==UserScript==
// @name           BvS Synchro Helper
// @namespace      rvBvS
// @description    BvS WorldKai Synchro Helper 1.3
// @include        http://*animecubed.com/billy/bvs/worldkaiju-group.html
// @require        http://rveach.romhack.org/BvS/gmupdater.user.js
// @version        1.3
// @history        1.3 Made more complient
// ==/UserScript==

const VERSION = "1.3";
const GMSTORAGE_PATH = "BvS_Synchro_";

try {
	ScriptUpdater.setInterval(259200000); // 3 days
	ScriptUpdater.check("BvSSynchroHelper", "http://rveach.romhack.org/BvS/bvs_synchro_helper.user.js", VERSION);
} catch(e) {};

var match;
	
var possibilities = [];
var guesses = [];
var responses = [];
var previousGuesses = [];	//guess1, guess2, guess3, guess4, correct, wrong position

var elementDisplay = ["Fire", "Lightning", "Water", "Earth", "Wind", "RNG", "Awesome", "Code", "XXXX"];
var reverseElements = {"Fire" : 0, "Lightning" : 1, "Water" : 2, "Earth" : 3, "Wind" : 4, "RNG" : 5, "Awesome" : 6, "Code" : 7, "XXXX" : 8};
var standardFirstGuess = null;
var legacyHelp;
var guess = null;

var element1;
var element2;
var element3;
var element4;

var numberofcolors;
var possibilitiesleft = null;
var allowpossibilitiesdisplay = false;
var possibilitydisplaypage = 0;

function load(ev) {
	try {
		var temp = document.getElementsByName("c1");
		if ((temp != null) && (temp.length > 0)) {
			element1 = temp[0];
			element2 = document.getElementsByName("c2")[0];
			element3 = document.getElementsByName("c3")[0];
			element4 = document.getElementsByName("c4")[0];

			numberofcolors = element1.options.length;

			legacyHelp = getLegacyHelp();
	
			getPreviousGuesses();

			if (previousGuesses.length <= 1) {
				if (legacyHelp == null) {
					switch (numberofcolors) {
					case 1: standardFirstGuess = [0, 0, 0, 0];	break;
					case 2: standardFirstGuess = [0, 0, 1, 1];	break;
					case 3: standardFirstGuess = [0, 0, 0, 1];	break;
					case 4: standardFirstGuess = [0, 0, 1, 2];	break;
					case 5: standardFirstGuess = [0, 0, 1, 1];	break;
					case 6: standardFirstGuess = [0, 0, 1, 1];	break;
					case 7: standardFirstGuess = [0, 1, 2, 3];	break;
					case 8: standardFirstGuess = [0, 1, 2, 3];	break;
					}
				} else {
					switch (numberofcolors) {
					case 2: standardFirstGuess = [0, 0, 0, 1];	break;
					case 3: standardFirstGuess = [1, 0, 0, 2];	break;
					case 4: standardFirstGuess = [1, 0, 1, 2];	break;
					case 5: standardFirstGuess = [1, 2, 3, 4];	break;
					case 6: standardFirstGuess = [1, 1, 2, 2];	break;
					case 7: standardFirstGuess = [1, 0, 2, 3];	break;
					case 8: standardFirstGuess = [1, 2, 3, 4];	break;
					}
	
					if (standardFirstGuess != null) {
						standardFirstGuess[0] += legacyHelp;
						standardFirstGuess[1] += legacyHelp;
						standardFirstGuess[2] += legacyHelp;
						standardFirstGuess[3] += legacyHelp;
	
						standardFirstGuess[0] %= numberofcolors;
						standardFirstGuess[1] %= numberofcolors;
						standardFirstGuess[2] %= numberofcolors;
						standardFirstGuess[3] %= numberofcolors;
					}
				}
			}
	
			if ((previousGuesses.length == 0) && (standardFirstGuess != null)) {
				guess = standardFirstGuess;
	
				if (legacyHelp == null)
					possibilitiesleft = numberofcolors * numberofcolors * numberofcolors * numberofcolors;
				else
					possibilitiesleft = (numberofcolors - 1) * numberofcolors * numberofcolors * numberofcolors;
			} else if ((previousGuesses.length == 1) && (numberofcolors >= 4) && (numberofcolors <= 8) && (compareArray(previousGuesses[0], standardFirstGuess, 4))) {
				var index = Math.floor((previousGuesses[0][4] * 11 - previousGuesses[0][4] * previousGuesses[0][4]) / 2) + previousGuesses[0][5];

				if (legacyHelp == null) {
					switch (numberofcolors) {
					case 4:
						switch (index) {
						case 0: guess = [3, 3, 3, 3];	possibilitiesleft = 1;		break;
						case 1: guess = [3, 3, 1, 3];	possibilitiesleft = 16;		break;
						case 2: guess = [3, 3, 0, 1];	possibilitiesleft = 42;		break;
						case 3: guess = [1, 3, 2, 0];	possibilitiesleft = 20;		break;
						case 4: guess = [1, 2, 0, 0];	possibilitiesleft = 2;		break;
						case 5: guess = [0, 3, 2, 3];	possibilitiesleft = 18;		break;
						case 6: guess = [0, 3, 0, 3];	possibilitiesleft = 46;		break;
						case 7: guess = [0, 1, 2, 1];	possibilitiesleft = 40;		break;
						case 8: guess = [0, 1, 2, 0];	possibilitiesleft = 4;		break;
						case 9: guess = [0, 3, 0, 3];	possibilitiesleft = 29;		break;
						case 10:guess = [0, 1, 1, 0];	possibilitiesleft = 20;		break;
						case 11:guess = [0, 1, 0, 2];	possibilitiesleft = 5;		break;
						case 12:guess = [0, 1, 1, 3];	possibilitiesleft = 12;		break;
						}
						break;
					case 5:
						switch (index) {
						case 0: guess = [2, 2, 2, 3];	possibilitiesleft = 81;		break;
						case 1: guess = [1, 2, 0, 2];	possibilitiesleft = 108;	break;
						case 2: guess = [1, 2, 0, 3];	possibilitiesleft = 54;		break;
						case 3: guess = [0, 1, 0, 2];	possibilitiesleft = 12;		break;
						case 4: guess = [1, 1, 0, 0];	possibilitiesleft = 1;		break;
						case 5: guess = [0, 2, 1, 2];	possibilitiesleft = 108;	break;
						case 6: guess = [0, 2, 0, 0];	possibilitiesleft = 120;	break;
						case 7: guess = [0, 1, 0, 2];	possibilitiesleft = 28;		break;
						case 8:	break;
						case 9: guess = [0, 2, 0, 2];	possibilitiesleft = 68;		break;
						case 10:guess = [0, 1, 1, 2];	possibilitiesleft = 24;		break;
						case 11:guess = [0, 1, 0, 2];	possibilitiesleft = 4;		break;
						case 12:guess = [0, 0, 2, 3];	possibilitiesleft = 16;		break;
						}
						break;
					case 6:
						switch (index) {
						case 0: guess = [2, 2, 3, 4];	possibilitiesleft = 256;	break;
						case 1: guess = [1, 2, 3, 3];	possibilitiesleft = 256;	break;
						case 2: guess = [1, 2, 3, 3];	possibilitiesleft = 96;		break;
						case 3: guess = [0, 1, 0, 2];	possibilitiesleft = 16;		break;
						case 4: guess = [1, 1, 0, 0];	possibilitiesleft = 1;		break;
						case 5: guess = [0, 2, 3, 3];	possibilitiesleft = 256;	break;
						case 6: guess = [0, 0, 2, 3];	possibilitiesleft = 208;	break;
						case 7: guess = [0, 1, 0, 2];	possibilitiesleft = 36;		break;
						case 8:	break;
						case 9: guess = [0, 1, 2, 3];	possibilitiesleft = 114;	break;
						case 10:guess = [0, 1, 1, 2];	possibilitiesleft = 32;		break;
						case 11:guess = [0, 1, 0, 2];	possibilitiesleft = 4;		break;
						case 12:guess = [0, 1, 1, 2];	possibilitiesleft = 20;		break;
						}
						break;
					case 7:
						switch (index) {
						case 0: guess = [4, 4, 4, 5];	possibilitiesleft = 81;		break;
						case 1: guess = [0, 4, 4, 5];	possibilitiesleft = 444;	break;
						case 2: guess = [1, 2, 4, 2];	possibilitiesleft = 582;	break;
						case 3: guess = [1, 2, 4, 2];	possibilitiesleft = 180;	break;
						case 4: guess = [0, 0, 0, 1];	possibilitiesleft = 9;		break;
						case 5: guess = [4, 4, 5, 5];	possibilitiesleft = 256;	break;
						case 6: guess = [0, 1, 4, 5];	possibilitiesleft = 432;	break;
						case 7: guess = [0, 0, 1, 1];	possibilitiesleft = 168;	break;
						case 8: guess = [0, 0, 1, 2];	possibilitiesleft = 8;		break;
						case 9: guess = [0, 2, 4, 5];	possibilitiesleft = 150;	break;
						case 10:guess = [0, 0, 1, 1];	possibilitiesleft = 60;		break;
						case 11:guess = [0, 0, 1, 1];	possibilitiesleft = 6;		break;
						case 12:guess = [0, 0, 1, 1];	possibilitiesleft = 24;		break;
						}
						break;
					case 8:
						switch (index) {
						case 0: guess = [4, 4, 5, 6];	possibilitiesleft = 256;	break;
						case 1: guess = [4, 4, 5, 5];	possibilitiesleft = 976;	break;
						case 2: guess = [1, 2, 0, 4];	possibilitiesleft = 936;	break;
						case 3: guess = [1, 2, 4, 2];	possibilitiesleft = 224;	break;
						case 4: guess = [0, 0, 0, 1];	possibilitiesleft = 9;		break;
						case 5: guess = [4, 4, 5, 5];	possibilitiesleft = 500;	break;
						case 6: guess = [0, 1, 4, 5];	possibilitiesleft = 660;	break;
						case 7: guess = [0, 0, 1, 1];	possibilitiesleft = 204;	break;
						case 8: guess = [0, 0, 1, 2];	possibilitiesleft = 8;		break;
						case 9: guess = [0, 2, 4, 5];	possibilitiesleft = 216;	break;
						case 10:guess = [0, 0, 1, 1];	possibilitiesleft = 72;		break;
						case 11:guess = [0, 0, 1, 1];	possibilitiesleft = 6;		break;
						case 12:guess = [0, 0, 1, 1];	possibilitiesleft = 28;		break;
						}
						break;
					}
				} else {
					switch(numberofcolors) {
					case 4:
						switch (index) {
						case 0: guess = [3, 3, 3, 3];	possibilitiesleft = 1;		break;
						case 1: guess = [0, 2, 2, 3];	possibilitiesleft = 12;		break;
						case 2: guess = [3, 1, 0, 3];	possibilitiesleft = 28;		break;
						case 3: guess = [3, 1, 2, 0];	possibilitiesleft = 12;		break;
						case 4: guess = [2, 1, 0, 1];	possibilitiesleft = 1;		break;
						case 5: guess = [0, 2, 3, 2];	possibilitiesleft = 14;		break;
						case 6: guess = [1, 1, 3, 3];	possibilitiesleft = 34;		break;
						case 7: guess = [1, 0, 2, 0];	possibilitiesleft = 30;		break;
						case 8: guess = [1, 1, 2, 0];	possibilitiesleft = 3;		break;
						case 9: guess = [3, 1, 1, 3];	possibilitiesleft = 24;		break;
						case 10:guess = [1, 1, 3, 2];	possibilitiesleft = 17;		break;
						case 11:guess = [2, 0, 1, 1];	possibilitiesleft = 4;		break;
						case 12:guess = [0, 0, 1, 3];	possibilitiesleft = 11;		break;
						}
						break;
					case 5:
						switch (index) {
						case 0:	break;
						case 1: guess = [0, 0, 0, 4];	possibilitiesleft = 12;		break;
						case 2: guess = [0, 0, 1, 2];	possibilitiesleft = 90;		break;
						case 3: guess = [2, 0, 2, 3];	possibilitiesleft = 81;		break;
						case 4: guess = [0, 1, 1, 2];	possibilitiesleft = 9;		break;
						case 5: guess = [0, 0, 1, 3];	possibilitiesleft = 20;		break;
						case 6: guess = [2, 0, 1, 1];	possibilitiesleft = 93;		break;
						case 7: guess = [2, 1, 0, 1];	possibilitiesleft = 87;		break;
						case 8: guess = [1, 1, 2, 3];	possibilitiesleft = 8;		break;
						case 9: guess = [1, 0, 1, 2];	possibilitiesleft = 45;		break;
						case 10:guess = [0, 1, 1, 4];	possibilitiesleft = 33;		break;
						case 11:guess = [1, 1, 2, 2];	possibilitiesleft = 6;		break;
						case 12:guess = [2, 2, 0, 1];	possibilitiesleft = 15;		break;
						}
						break;
					case 6:
						switch (index) {
						case 0: guess = [3, 0, 3, 4];	possibilitiesleft = 192;	break;
						case 1: guess = [3, 3, 1, 4];	possibilitiesleft = 208;	break;
						case 2: guess = [3, 0, 1, 3];	possibilitiesleft = 84;		break;
						case 3: guess = [2, 0, 1, 2];	possibilitiesleft = 15;		break;
						case 4: guess = [2, 2, 1, 1];	possibilitiesleft = 1;		break;
						case 5: guess = [3, 3, 2, 4];	possibilitiesleft = 208;	break;
						case 6: guess = [3, 0, 2, 2];	possibilitiesleft = 183;	break;
						case 7: guess = [1, 2, 1, 3];	possibilitiesleft = 34;		break;
						case 8:	break;
						case 9: guess = [2, 1, 0, 3];	possibilitiesleft = 101;	break;
						case 10:guess = [1, 2, 2, 3];	possibilitiesleft = 30;		break;
						case 11:guess = [0, 1, 1, 2];	possibilitiesleft = 4;		break;
						case 12:guess = [1, 0, 1, 2];	possibilitiesleft = 19;		break;
						}
						break;
					case 7:
						switch (index) {
						case 0: guess = [4, 4, 4, 5];	possibilitiesleft = 81;		break;
						case 1: guess = [4, 5, 2, 5];	possibilitiesleft = 396;	break;
						case 2: guess = [2, 4, 1, 1];	possibilitiesleft = 466;	break;
						case 3: guess = [4, 1, 1, 2];	possibilitiesleft = 131;	break;
						case 4: guess = [2, 3, 0, 1];	possibilitiesleft = 6;		break;
						case 5: guess = [1, 4, 3, 5];	possibilitiesleft = 240;	break;
						case 6: guess = [1, 0, 4, 5];	possibilitiesleft = 375;	break;
						case 7: guess = [2, 4, 1, 2];	possibilitiesleft = 135;	break;
						case 8: guess = [0, 0, 0, 2];	possibilitiesleft = 6;		break;
						case 9: guess = [2, 0, 4, 5];	possibilitiesleft = 140;	break;
						case 10:guess = [1, 2, 4, 2];	possibilitiesleft = 53;		break;
						case 11:guess = [0, 0, 0, 3];	possibilitiesleft = 5;		break;
						case 12:guess = [2, 0, 1, 4];	possibilitiesleft = 23;		break;
						}
						break;
					case 8:
						switch (index) {
						case 0: guess = [5, 0, 5, 6];	possibilitiesleft = 192;	break;
						case 1: guess = [5, 5, 6, 6];	possibilitiesleft = 807;	break;
						case 2: guess = [2, 0, 4, 5];	possibilitiesleft = 837;	break;
						case 3: guess = [2, 3, 5, 3];	possibilitiesleft = 213;	break;
						case 4: guess = [0, 1, 1, 2];	possibilitiesleft = 9;		break;
						case 5: guess = [1, 0, 5, 5];	possibilitiesleft = 425;	break;
						case 6: guess = [5, 2, 3, 6];	possibilitiesleft = 597;	break;
						case 7: guess = [1, 1, 2, 2];	possibilitiesleft = 195;	break;
						case 8: guess = [1, 1, 2, 3];	possibilitiesleft = 8;		break;
						case 9: guess = [2, 5, 3, 6];	possibilitiesleft = 198;	break;
						case 10:guess = [0, 1, 3, 5];	possibilitiesleft = 69;		break;
						case 11:guess = [1, 1, 2, 2];	possibilitiesleft = 6;		break;
						case 12:guess = [2, 1, 3, 3];	possibilitiesleft = 27;		break;
						}
						break;
					}				
	
					if (guess != null) {
						guess[0] += legacyHelp;
						guess[1] += legacyHelp;
						guess[2] += legacyHelp;
						guess[3] += legacyHelp;
	
						guess[0] %= numberofcolors;
						guess[1] %= numberofcolors;
						guess[2] %= numberofcolors;
						guess[3] %= numberofcolors;
					}
				}
			} else {
				makePossibilities();
	
				for (var i = 0; i < previousGuesses.length; i++) {
					cleanse([previousGuesses[i][4], previousGuesses[i][5]], [previousGuesses[i][0], previousGuesses[i][1], previousGuesses[i][2], previousGuesses[i][3]], true);
				}
	
				allowpossibilitiesdisplay = true;
				possibilitiesleft = possibilities.length;

				if (possibilities.length == 1) {
					guess = guesses[possibilities[0]];
				} else {
					for (var i = 0; i < 3; i++) {
						for (var j = 0; j < 5 - i; j++) {
							responses.push([i, j]);
						}
					}
					responses.push([3, 0]);

					guess = findBestGuess();
				}
			}

			element1.selectedIndex = guess[0];
			element2.selectedIndex = guess[1];
			element3.selectedIndex = guess[2];
			element4.selectedIndex = guess[3];

			if (possibilitiesleft) {
				var temp = document.evaluate("//center/table/tbody/tr/td/form", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
				if ((temp != null) && (temp.snapshotLength > 0)) {
					temp = temp.snapshotItem(0);
	
					var helper = document.createElement("div");
					var helperText = "<font size='+1' color='#A10000'><b>Possibilities Remaining</b></font>: " + possibilitiesleft + "<br />\n<div id='rvExpandSynchroDisplay'></div><div id='rvSynchroLinks'>";
	
					if (allowpossibilitiesdisplay)
						helperText += "<a href='javascript:;' id='rvExpandPossibilities' style='font-size: 12px; color: #a10000;' onfocus='this.blur();'><b>Expand Possibilities</b></a>";
	
					helperText += "</div>";
	
					helper.setAttribute("id", "rvMiniSynchroDisplay");
					helper.innerHTML = helperText;
	
					temp.parentNode.insertBefore(helper, temp.nextSibling);
	
					if (allowpossibilitiesdisplay)
						document.getElementById("rvExpandPossibilities").addEventListener("click", function() { ExpandPossibilities(0); }, false);
				} else {
					alert("Error:\n\nFailed to find spot to put helper");
				}
			}
		}
	} catch (e) { alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message); }
}

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function ArrayRemove(array, from, to) {
	var rest = array.slice((to || from) + 1 || array.length);
	array.length = from < 0 ? array.length + from : from;
	array.push.apply(array, rest);

	return array;
}

function compareArray(arr1, arr2, maxColumn) {
	if ((maxColumn == null) || (maxColumn == undefined)) maxColumn = arr1.length;

	for (var i = 0; i < maxColumn; i++) {
		if (arr1[i] != arr2[i]) return false;
	}

	return true;
}

function getLegacyHelp() {
	var snap = document.evaluate("//form/center/font/b", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	if ((snap == null) && (snap.snapshotLength == 0))
		return null;

	for (var i = 0; temp = snap.snapshotItem(i); i++) {
		if (match = temp.textContent.match("Legacy Hint\\: You have a strong feeling that the first Chakra isn't (.*)\\.\\.")) {
			return reverseElements[match[1]];
		}
	}

	return null;
}

function getPreviousGuesses() {
	var snap = document.evaluate("//center/table/tbody/tr/td/center/table/tbody/tr/td/table/tbody/tr", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	if ((snap == null) && (snap.snapshotLength == 0))
		return;

	for (var i = 0; temp = snap.snapshotItem(i); i++) {
		temp = temp.childNodes;
		previousGuesses[i] = [];

		for (var j = 0; j < 4; j++) {
			previousGuesses[i][j] = reverseElements[temp[j].textContent];
		}

		if (match = temp[4].textContent.match("(\\d+) / (\\d+)")) {
			previousGuesses[i][4] = (parseInt(match[1]) || 0);
			previousGuesses[i][5] = (parseInt(match[2]) || 0);
		}
	}
}

function makePossibilities() {
	for (var i = 0; i < numberofcolors; i++) {
		for (var j = 0; j < numberofcolors; j++) {
			for (var k = 0; k < numberofcolors; k++) {
				for (var l = 0; l < numberofcolors; l++) {

					if (i != legacyHelp)
						possibilities.push(guesses.length);
					guesses.push([i, j, k, l]);
				}
			}
		}
	}
}

function guessResult(currentguess, solution) {
	var inplace = 0;
	var exist = 0;
	var tempcurrentguess = currentguess.slice(0);
	var tempsolution = solution.slice(0);

	/*for (var i = 0; i < 4; i++) {
		if (tempcurrentguess[i] == tempsolution[i]) {
			inplace++;
			tempcurrentguess[i] = "?";
			tempsolution[i] = "!";
			continue;
		}

		for (var j = 0; j < 4; j++) {
			if (tempcurrentguess[i] == tempsolution[j]) {
				exist++;
				tempcurrentguess[i] = "?";
				tempsolution[j] = "!";
				break;
			}
		}
	}*/

	for (var i = 0; i < 4; i++) {
		if (tempcurrentguess[i] == tempsolution[i]) {
			inplace++;
			tempcurrentguess[i] = "?";
			tempsolution[i] = "!";
		}
	}

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (tempcurrentguess[i] == tempsolution[j]) {
				exist++;
				tempcurrentguess[i] = "?";
				tempsolution[j] = "!";
				break;
			}
		}
	}

	return [inplace, exist];
}

function cleanse(comparison, theguess, apply) {
	var count = 0;

	for (var i = possibilities.length - 1; i >= 0; i--) {
		var lessee = guessResult(theguess, guesses[possibilities[i]]);

		if ((lessee[0] != comparison[0]) || (lessee[1] != comparison[1])) {
			count++;
			if (apply)
				ArrayRemove(possibilities, i);
		}
	}

	return count;
}

function guessScore(guess) {
	var thisguessscore = 99999;

	for (var j = 0; j < responses.length; j++) {
		thisguessscore = Math.min(thisguessscore, cleanse(responses[j], guess, false));
	}

	return thisguessscore;
}

function findBestGuess() {
	var bestguessscore = 0;
	var possible = false;
	var thisguessscore;
	var bestguess;

	for (var i = 0; i < guesses.length; i++) {
		thisguessscore = guessScore(guesses[i]);

		if (thisguessscore > bestguessscore) {
			bestguessscore = thisguessscore;
			bestguess = guesses[i];
			possible = (possibilities.indexOf(i) != -1);
		} else if ((thisguessscore == bestguessscore) && (!possible) && (possibilities.indexOf(i) != -1)) {
			bestguess = guesses[i];
			possible = true;
		}
	}

	return bestguess;
}

function ExpandPossibilities(pagescroll) {
	try {
		var helperText = "";

		possibilitydisplaypage += pagescroll;

		helperText += "<table border='0' cellspacing='0' cellpadding='0'>";

		var temp;
		var i;
		var j;
		for (i = 0; i < 10; i++) {
			j = i + possibilitydisplaypage*10;
			if (j >= possibilitiesleft)
				break;

			temp = guesses[possibilities[j]];
			helperText += ("<tr><td><b>Possibility #" + j + "</b>:&nbsp;</td><td>" + elementDisplay[temp[0]] + ",&nbsp;</td><td>" + elementDisplay[temp[1]] + ",&nbsp;</td><td>" + elementDisplay[temp[2]] + ",&nbsp;</td><td>" + elementDisplay[temp[3]] + "</td></tr>\n");
		}

		helperText += "</table>";

		document.getElementById("rvExpandSynchroDisplay").innerHTML = helperText;

		if (pagescroll == 0) {
			helperText = "<a href='javascript:;' id='rvNextSet' style='display: inline; font-size: 12px; color: #a10000;' onfocus='this.blur();'><b>Next 10</b></a>";
			helperText += " <a href='javascript:;' id='rvPreviousSet' style='display: inline; font-size: 12px; color: #a10000;' onfocus='this.blur();'><b>Previous 10</b></a>";

			document.getElementById("rvSynchroLinks").innerHTML = helperText;

			document.getElementById("rvNextSet").addEventListener("click", function() { ExpandPossibilities(+1); }, false);
			document.getElementById("rvPreviousSet").addEventListener("click", function() { ExpandPossibilities(-1); }, false);
		}

		if ((i == 10) && (j < possibilitiesleft-1))
			document.getElementById("rvNextSet").style.display = 'block';
		else
			document.getElementById("rvNextSet").style.display = 'none';

		if (possibilitydisplaypage > 0)
			document.getElementById("rvPreviousSet").style.display = 'block';
		else
			document.getElementById("rvPreviousSet").style.display = 'none';
	} catch (e) { alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message); }
}

var gvar = new Object();

function GM_ApiBrowserCheck() {
	if (typeof(unsafeWindow) == 'undefined') { unsafeWindow=window; }
	if (typeof(GM_log) == 'undefined') { GM_log = function(msg) { try { unsafeWindow.console.log('GM_log: ' + msg); } catch(e) {} }; }
	GM_clog = function(msg) { if (arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; } GM_log('('+arguments.callee.counter+') '+msg); }
	GM_addGlobalStyle = function(css) {
		var sel = document.createElement('style');
		sel.setAttribute('type','text/css');
		sel.appendChild(document.createTextNode(css));
		var hel = document.documentElement.firstChild;
		while (hel && hel.nodeName != 'HEAD') { hel=hel.nextSibling; }
		if (hel && hel.nodeName == 'HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
		return sel;
	}
	
	var needApiUpgrade=false;

	if(window.navigator.appName.match(/^opera/i) && typeof(window.opera) != 'undefined') {
		needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; GM_log('Opera detected...');
	}

	if(typeof(GM_setValue) != 'undefined') {
		try {
			var gsv=GM_setValue.toString();
			if (gsv.indexOf('staticArgs') > 0) { gvar.isGreaseMonkey = true; GM_log('GreaseMonkey Api detected...'); }
			else if (gsv.match(/not\s+supported/)) { needApiUpgrade = true; gvar.isBuggedChrome = true; GM_log('Bugged Chrome GM Api detected...'); }
		} catch(e) {
			gvar.isGreaseMonkey = (typeof(GM_setValue) == 'function');
			if (gvar.isGreaseMonkey)
				GM_log('GreaseMonkey Api is assumed because of exception...');
			else
				needApiUpgrade = true;
		}
	} else {
		needApiUpgrade=true; GM_log('No GM Api detected...');
	}

	if(needApiUpgrade) {
		GM_log('Try to recreate needed GM Api...');
 		var ws = null;
		try { ws=typeof(unsafeWindow.localStorage); unsafeWindow.localStorage.length; } catch(e) { ws=null; } // Catch Security error

		if (ws=='object') {
			GM_log('Using localStorage for GM Api.');
			GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; }
			GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } }
			GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); }
		} else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
			GM_log('Using temporarilyStorage for GM Api.'); gvar.temporarilyStorage=new Array();
			GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } }
			GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } }
			GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
		}
		
		if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); } }
		if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); } } // Dummy
		if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
			GM_log('Using XMLHttpRequest for GM Api.');
			GM_xmlhttpRequest=function(obj) {
				var request=new XMLHttpRequest();
				request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
				request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
				try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
				if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
				request.send(obj.data); return request;
			}
		}
	}
}

function waitForReady(callback) {
	var docState;
	
	try { docState = unsafeWindow.document.readyState; } catch(e) { docState = null; }
	if(docState) {
		if ((docState != 'complete') && (docState != 'interactive')) {
			window.setTimeout(waitForReady, 150, callback);
			return;
		}
	}
	
	callback();
}

GM_ApiBrowserCheck();
waitForReady(load);