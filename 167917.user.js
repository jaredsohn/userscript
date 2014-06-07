// ==UserScript==
// @name           BvS Big Board Helper
// @namespace      sa'saren
// @description    Records who wins a particular game and suggests that you use the top 5 least-used numbers in the next game.
// @include        http://www.animecubed.com/billy/bvs/partyhouse.html
// @include        http://animecubed.com/billy/bvs/partyhouse.html
// @priority       -99
// @grant          GM_log
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

var vars = [];
vars.logLevel = 1500;

log = function(logLevel, msg) {
	if ( logLevel <= vars.logLevel ) {
		GM_log(msg);
	}
};

debug = function(msg) {
	return log(500, msg);
};

trace = function(msg) {
	return log(1000, msg);
};

if ( typeof(String.prototype.endsWith) != "function" ) {
	String.prototype.endsWith = function(suffix) {
		return String.prototype.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}


evaluate = function(xpathValue, resultType) {
	if ( resultType === null ) {
		throw("resultType can not be null");
	}
	try {
		return document.evaluate(xpathValue, document, null, resultType, null);
	} catch (err) {
		GM_log("xpath that failed: " + xpathValue);
		GM_log("reason:" + err);
		throw err;
	}
};

evalSnapshot = function(xpathValue) {
	return evaluate(xpathValue, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
};

evalIterator = function(xpathValue) {
	return evaluate(xpathValue, XPathResult.UNORDERED_NODE_ITERATOR_TYPE);
};

function getXPathOneNode(xpath) {
	var val = document.evaluate(xpath, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
	if ( val ) {
		if ( val.singleNodeValue ) {
			return val.singleNodeValue;
		} else {
			return null;
		}
	} else {
		return null;
	}
}


getFirstXPathResult = function(xpathValue) {
	var firstNode = evaluate(xpathValue, XPathResult.FIRST_ORDERED_NODE_TYPE);
	var item = null;
	if (! firstNode ) {
		trace("no match for " + xpathValue);
	} else {
		item = firstNode.singleNodeValue;
		if ( item !== null && typeof(item) == "object" && item.wrappedJSObject !== null ) {
			item = item.wrappedJSObject;
		}
	}
	return item;
};

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

isOnPage = function (page) {
	return document.location.href.indexOf(page) != -1;
};


isOnPartyHousePage = function () {
	return isOnPage("bvs/partyhouse.html");
}


isOnBigBoardPage = function () {
	if ( isOnPartyHousePage() ) {
		var isOnBigBoard = getFirstXPathResult("//b[contains(text(), 'The Big Board')]");
		return isOnBigBoard != null;
	}
	return false;
}

getLastBigBoardGameNumber = function (winnerBold) {
	if (!winnerBold ) {
		winnerBold = getWinnerBold();
	}
	if ( winnerBold && typeof(winnerBold) == "object" ) {
		var gameNumberString = winnerBold.textContent;
		var gameNumberResult = /Game (\d+) Winner/.exec(gameNumberString);
		if ( gameNumberResult && typeof(gameNumberResult) == "object" && gameNumberResult.length > 1 ) {
			return parseInt(gameNumberResult[1]);
		}
	}
	return -1;
}

getWinnerBold = function() {
	return getFirstXPathResult("//b[contains(text(), 'Winner:') and contains(text(), 'with the only throw of')]");
}

getGameData = function(gameNumber) {
	var data = GM_getValue("game" +gameNumber);
	if ( data ) {
		data = eval(data);
	}
	return data;
}


performBigBoardRecord = function () {
	if ( isOnBigBoardPage() ) {
		var winnerBold = getWinnerBold();
		if ( winnerBold && winnerBold.nextSibling ) {
			var gameNumber = getLastBigBoardGameNumber(winnerBold);
			if ( gameNumber > -1 ) {
				var bigBoardRecord = [];
				var item = winnerBold.nextSibling;
				var itemText = null;
				while ( item ) {
					if ( item.textContent ) {
						itemText = trim(item.textContent);
						if ( itemText.length > 0 ) {
							bigBoardRecord.push(itemText);
						}
					}
					item = item.nextSibling;
				}
				var index = "game"+gameNumber;
				GM_setValue(index, uneval(bigBoardRecord));
			}
		}
	}
}

extractGameData = function(line) {
	var dataResult = /(\d+): \d+ - (.*)/.exec(line);
	var data = null;
	if ( dataResult && typeof(dataResult) == "object" && dataResult.length > 2 ) {
		data = {};
		data.index = parseInt(dataResult[1]);
		data.players = dataResult[2].split(", ");
	}
	return data;
}

addSuggestion = function(suggestions, index, reason) {
	suggestions.push(index);
	if ( reason ) {
		debug(reason);
	}
};

getBigBoardSuggestions = function(numberOfSuggestions) {
	var suggestions = null;
	var lastGame = getLastBigBoardGameNumber();
	var data = getGameData(lastGame);
	if ( data ) {
		suggestions = [];
		var gameData = null;
		var expectedIndex = 500;
		for (x in data) {
			gameData = extractGameData(data[x]);
			if ( gameData ) {
				if ( expectedIndex != gameData.index ) {
					addSuggestion(suggestions, expectedIndex, "adding " + expectedIndex + " because a non-used entry was found");
				} else if ( gameData.players.length <= 2 ) {
					addSuggestion(suggestions, gameData.index, "adding " + gameData.index + " because "+gameData.players.length+" (less than 3) players have used it");
				}
			}
			if ( suggestions.length >= numberOfSuggestions ) {
				break;
			}
			expectedIndex = gameData.index-1;
		}
	}
	return suggestions;
}


performBigBoardSuggest = function () {
	var suggestions = getBigBoardSuggestions(5);
	if ( suggestions ) {
		GM_log("suggestions : " + suggestions);
		for(var i = 1; i < 6; i++) {
			if ( suggestions.length >= i-1 ) {
				var input = getFirstXPathResult("//input[@name='throw"+i+"']");
				if ( input ) {
					input.value = suggestions[i-1];
				}
			}
		}
	}
};


performBigBoardRecord();
performBigBoardSuggest();