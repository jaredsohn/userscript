// ==UserScript==
// @name          Casual Collective ranking
// @namespace     http://casualcollective.com/
// @description   This script visualizes the number of games played by members of the Casual Collective.
// @include       http://casualcollective.com/*
// @include       http://www.casualcollective.com/*
// @exclude       http://www.casualcollective.com/chat
// @copyright     2010+, ATimmer & Philipp (http://casualcollective.com/)
// @license       Creative Commons Attribution 3.0 License (http://creativecommons.org/licenses/by/3.0/)
// @version       0.1.0
// ==/UserScript==

// Fix: JavaScript doens't support associative arrays.
const NAME = 0, GAMES = 1, BOX = 2;

// Search for the DOM elements which contain
// the game information and the member search.
var gameBox = document.getElementById('stDiv');
var searchBox = document.getElementById('sb-search-results');

// Regular expressions used for pattern matching of
// the game name and the number of games played.
const titleRegex = new RegExp('CC - Games > (.+)$');
const totalRegex = new RegExp('Totals<\/b><\/td><td class=\\\\"row\\d\\\\"><b>(\\d+)<\/b>');
var gameRegex = null;
var searchRegex = null;

// Stores the name of the game. 
var gameTheGame = null;
var searchTheGame = null;

// Shared memory stack, concurrently used during
// the fork of requests and the join of responses.
// Structure: Arrays [0..11][NAME / GAMES / BOX]
var gameStack = null;
var searchStack = null;

// Additional CSS
GM_addStyle('\
	.skillometer { \
		color: white; \
		background-image: url(http://cdn.casualcollective.com/images/site/compiled_general2.png); \
		background-position: -18px -140px; \
		border-right: 1px dotted #CCCCCC; \
		position: absolute; \
		top: 1px; \
		left: 1px; \
		height: 20px; \
	} \
	#stDiv .ub-sa .ub-lv-se { \
		border-right: 22px solid #EAEEF3; \
	} \
	#stDiv .ub-un a.profilelink { \
		position: relative !important; \
	} \
	#sb-search-results .ub-sa .ub-lv-se { \
		border-right: 22px solid #FFFFFF; \
	} \
	.skilltext { \
		font-size: 80%; \
		opacity: 0.6; \
		position: absolute; \
		right: 48px; \
	}');

// Register callback functions to DOM-changes of the game information and the member search.
if (gameBox) gameBox.addEventListener('DOMNodeInserted', OnGameUpdate, false);
if (searchBox) searchBox.addEventListener('DOMNodeInserted', OnSearchUpdate, false);

function OnGameUpdate() {
	OnNodeInserted(true);
}

function OnSearchUpdate() {
	OnNodeInserted(false);
}

function OnNodeInserted(isGameUpdate) {
	if (isGameUpdate == null) {
		GM_log('Illegal call to OnNodeInserted!');
		return;
	}
	// Unregister the callback to prevent us from processing own DOM-changes.
	(isGameUpdate ? gameBox : searchBox).removeEventListener('DOMNodeInserted', isGameUpdate ? OnGameUpdate
			: OnSearchUpdate, false);

	// Search the DOM for the affected members.
	var members = getElementsByCSS(isGameUpdate ? gameBox : searchBox, 'userbox ub-sa');
	if (members == null || members.length == null || members.length <= 0) {
		// Reregister callback function to DOM-changes.
		(isGameUpdate ? gameBox : searchBox).addEventListener('DOMNodeInserted', isGameUpdate ? OnGameUpdate
				: OnSearchUpdate, false);
		return;
	}

	// Determine the name of the game and use it in the regex.
	if (isGameUpdate) {
		gameStack = new Array(members.length);
		gameTheGame = getElementsByCSS(gameBox, 'gamename')[0].firstChild.nodeValue;
		gameRegex = new RegExp(gameTheGame + '<\/a><\/td><td class=\\\\"row\\d\\\\">(\\d+)<\/td>');
	} else {
		searchStack = new Array(members.length);
		searchTheGame = 'total';
		searchRegex = totalRegex;
		if (titleRegex.test(document.title)) {
			searchTheGame = titleRegex.exec(document.title)[1];
			searchRegex = new RegExp(searchTheGame + '<\/a><\/td><td class=\\\\"row\\d\\\\">(\\d+)<\/td>');
		}
	}

	// For each player ...
	for ( var i = 0, j = (isGameUpdate ? gameStack : searchStack).length; i < j; ++i) {
		// Allocate some memory,
		// search for the enclosing DOM element and the enclosed name.
		(isGameUpdate ? gameStack : searchStack)[i] = new Array(3);
		(isGameUpdate ? gameStack : searchStack)[i][BOX] = members[i].lastChild.previousSibling;
		(isGameUpdate ? gameStack : searchStack)[i][NAME] = members[i].lastChild.previousSibling.firstChild.firstChild.nodeValue;

		// Send and process requests asynchronous.
		forkRequests(i, isGameUpdate);
	}
}

function forkRequests(index, isGameUpdate) {
	window.setTimeout(
		function() {
			GM_xmlhttpRequest( {
				method : 'GET',
				url : 'http://www.casualcollective.com/load/profiles/' + (isGameUpdate ? gameStack
						: searchStack)[index][NAME] + '/games',
				onload : function(response) {
					var ranking = Number.NaN;
					if ((isGameUpdate ? gameRegex : searchRegex).test(response.responseText)) {
						ranking = parseInt((isGameUpdate ? gameRegex : searchRegex)
								.exec(response.responseText)[1]);
					}
					(isGameUpdate ? gameStack : searchStack)[index][GAMES] = ranking;

					// Create the small label showing the number of games played.
					var text = document.createElement('div');
					text.className = 'skilltext';
					if (isNaN(ranking)) {
						(isGameUpdate ? gameStack : searchStack)[index][BOX].backgroundPosition = '-18px -190px';
						text.appendChild(document.createTextNode('error'));
					} else {
						text.appendChild(document.createTextNode(ranking));
						(isGameUpdate ? gameStack : searchStack)[index][BOX].title = ranking + ' '
								+ (isGameUpdate ? gameTheGame : searchTheGame) + ' games';
					}
					(isGameUpdate ? gameStack : searchStack)[index][BOX].insertBefore(text,
							(isGameUpdate ? gameStack : searchStack)[index][BOX].lastChild);

					// If this is the last request, join and process the responses.
					if ((isGameUpdate ? gameStack : searchStack).isFull()) {
						joinResponses(isGameUpdate);
					}
				},
				onerror : function(response) {
					GM_log('Error: ' + response.responseText);
					(isGameUpdate ? gameStack : searchStack)[index][GAMES] = -2;
					(isGameUpdate ? gameStack : searchStack)[index][BOX].backgroundPosition = '-18px -240px';

					// Create the small label showing the number of games played.
					var text = document.createElement('div');
					text.className = 'skilltext';
					text.appendChild(document.createTextNode('error'));
					(isGameUpdate ? gameStack : searchStack)[index][BOX].insertBefore(text,
							(isGameUpdate ? gameStack : searchStack)[index][BOX].lastChild);

					// If this is the last request, join and process the responses.
					if ((isGameUpdate ? gameStack : searchStack).isFull()) {
						joinResponses(isGameUpdate);
					}
				}
			});
		}, 0);
}

function joinResponses(isGameUpdate) {
	// Calculate the skill rating based on the number of games played.
	// maxGames = 100% = 135px
	if (isGameUpdate && gameStack != null) {
		var maxGames = 1;
		for ( var i = 0, j = gameStack.length; i < j; ++i) {
			maxGames = Math.max(maxGames, gameStack[i][GAMES]);
		}

		for ( var i = 0, j = gameStack.length; i < j; ++i) {
			if (isNaN(gameStack[i][GAMES])) continue;

			var skillometer = document.createElement('div');
			skillometer.style.width = (Math.ceil(135 * Math.min(Math.max(gameStack[i][GAMES] / maxGames, 0), 1))) + 'px';
			skillometer.className = 'skillometer';

			gameStack[i][BOX].insertBefore(skillometer, gameStack[i][BOX].firstChild);
			gameStack[i][BOX].style.backgroundPosition = '-18px -90px';
		}
		gameStack = null;
	} else {
		searchStack = null;
	}

	// Reregister callback function to DOM-changes.
	(isGameUpdate ? gameBox : searchBox).addEventListener('DOMNodeInserted', isGameUpdate ? OnGameUpdate
			: OnSearchUpdate, false);
}

// Use the native method getElementsByClassName() if the browser supports it.
function getElementsByCSS(node, classname) {
	if (document.getElementsByClassName) {
		if (!node) {
			node = document.getElementsByTagName('body')[0];
		}
		return node.getElementsByClassName(classname);
	} else {
		if (!node) {
			node = document.getElementsByTagName('body')[0];
		}
		var a = [], re = new RegExp('\\b' + classname + '\\b');
		els = node.getElementsByTagName('*');
		for ( var i = 0, j = els.length; i < j; ++i) {
			if (re.test(els[i].className)) {
				a.push(els[i]);
			}
		}
		return a;
	}
}

// Check whether all array items,
// and their fields are properly assigned. 
Array.prototype.isFull = function() {
	for ( var i = this.length - 1; i >= 0; --i) {
		if (this[i] == null || this[i][GAMES] == null) {
			return false;
		}
	}
	return true;
};
