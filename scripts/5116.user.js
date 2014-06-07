// BGG Price Comparator GreaseMonkey script
// version 0.1 BETA!
// 2006-08-04
// Copyright (c) 2006, Thomas Feiler
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "BGG Price Comparator", and click Uninstall.
//
// use at your own risk
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BGG Price Comparator
// @namespace     tag:tfeiler@gmail.com,2006-08-04:BGGComp
// @description   adds price comparison data to BoardGameGeek.com game pages
// @include       http://www.boardgamegeek.com/game/*
// ==/UserScript==

// many thanks to Mark Pilgrim and his excellent guide at http://diveintogreasemonkey.org/

// store definitions - start
    var gameSurplusMap = new Object();
	gameSurplusMap.storeName = "Game Surplus";
	gameSurplusMap.searchURL = "http://www.gamesurplus.com/site/search.cfm?search=";
	gameSurplusMap.gameIDExpression = "<td class=\"generalBlack\" height=\"22\" valign=\"top\"><a href=\"product.cfm\\?id=\(.*\)\" class=\"siteLink\">";
	gameSurplusMap.gameURL = "http://www.gamesurplus.com/site/product.cfm?id=";
	gameSurplusMap.priceExpression = "<td><strong>Our Price:</strong>&nbsp;&nbsp;\(\\$[0-9]*\\.[0-9]*\) </td>";
	gameSurplusMap.titleExpression = "<title>\(.*\) - Game Surplus</title>";
	gameSurplusMap.stockExpression = "<td><strong>Status:</strong>[\\t\\r\\n]*&nbsp;\(.*\)[\\t\\r\\n]*</td>";
	gameSurplusMap.noResultProbe = "Sorry, your search returned no results, please try again!";
	gameSurplusMap.stockDefault = false;

    var boulderMap = new Object();
	boulderMap.storeName = "Boulder Games";
	boulderMap.searchURL = "http://www.bouldergames.com/search_results.asp?txtsearchParamCat=ALL&BtnQuickSearch=Search&txtsearchParamType=ALL&iLevel=1&txtsearchParamMan=ALL&txtsearchParamVen=ALL&txtFromSearch=fromSearch&title=title&txtsearchParamTxt=";
	boulderMap.gameIDExpression = "<a href=\"detail.asp\\?Product_id=\([0-9]*\)\">";
	boulderMap.gameURL = "http://www.bouldergames.com/detail.asp?Product_id=";
	boulderMap.priceExpression = ".*\(\\$[0-9]*\\.[0-9]*\)</font></center></b>";
	boulderMap.titleExpression = "<font face=\"Comic Sans MS\" size=\"4\" >\(.*\)\\.\\.\\.";
	boulderMap.stockExpression = "<b>\(In Stock\)[.\\n\\r]*</b>&nbsp; <br>";
	boulderMap.noResultProbe = "";
	boulderMap.stockDefault = false;

    var thoughtHammerMap = new Object();
	thoughtHammerMap.storeName = "ThoughtHammer";
	thoughtHammerMap.searchURL = "http://thoughthammer.com/advanced_search_result.php?inc_subcat=1&categories_id=&keywords=";
	thoughtHammerMap.gameIDExpression = "<td align=\"center\" class=\"productListing-data\">&nbsp;<a href=\".*\\?products_id=\([0-9]*\)\">";
	thoughtHammerMap.gameURL = "http://thoughthammer.com/product_info.php?products_id=";
	thoughtHammerMap.priceExpression = "<td class=\"pageHeading\" align=\"right\" valign=\"top\"><font size=\"-1\" color=\"red\"><s>.*</s></font>&nbsp\(\\$[0-9]*\\.[0-9]*\)&nbsp<font size=\"-1\" color=\"red\">.* off!.*</font></td>";
	thoughtHammerMap.titleExpression = "<td class=\"pageHeading\" valign=\"top\">\(.*\)<br><span class=\"smallText\">\\[.*\\]</span></td>";
	thoughtHammerMap.stockExpression = "<!--  products_released: 99   Ding & Dent game.  The next 'verify' will remove the game if inventory is zero //-->\n.*<p>\(.*\)</p></font>";
	thoughtHammerMap.noResultProbe = "There is no game that matches the search criteria";
	thoughtHammerMap.stockDefault = false;

    var funagainMap = new Object();
	funagainMap.storeName = "Funagain";
	funagainMap.searchURL = "http://www.funagain.com/control/keywordsearch?SEARCH_STRING=";
	funagainMap.gameIDExpression = "<span class=\"ProductText\"[\\r\\n].*product_id=\(.*\)\">";
	funagainMap.gameURL = "http://www.funagain.com/control/product/~product_id=";
	funagainMap.priceExpression = "<span class=\"ProductPriceActualText\">Your Price: <span class=\"ProductPriceActualText\">\(.*\)</span></span>";
	funagainMap.titleExpression = "<title>Funagain Games: \(.*\)</title>";
	funagainMap.stockExpression = "<span class=\"ProductTextStrong\">[\\r\\n]* *\(Funagain Games does not stock this edition of this title\)";
	funagainMap.stockExpressionTwo = "This item is a \(preorder\)";
	funagainMap.noResultProbe = "There is no game that matches the search criteria";
	funagainMap.stockDefault = true;

    var gamefestMap = new Object();
	gamefestMap.storeName = "GameFest";
	gamefestMap.searchURL = "http://gamefest.com/advanced_search_result.php?keywords=";
	gamefestMap.gameIDExpression = "<td align=\"center\" class=\"productListing-data\">&nbsp;<a href=\"http://gamefest.com/product_info.php/products_id/\([0-9]*\)\">";
	gamefestMap.gameURL = "http://gamefest.com/product_info.php/products_id/";
	gamefestMap.priceExpression = "<td class=\"main\" width=\"58\" height=\"8\" bgcolor=\"#eeeeCC\"><b><font color=\"#990000\">\(\\$[0-9]*\\.[0-9]*\)</font></b></td>";
	gamefestMap.titleExpression = "<title>Board Games by Gamefest.com - \(.*\)</title>";
	gamefestMap.stockExpression = "<font color=990000><b>\(OUT OF STOCK\)</b> </div>";
	gamefestMap.noResultProbe = "did not match any products";
	gamefestMap.stockDefault = true;

    var boardsBitsMap = new Object();
	boardsBitsMap.storeName = "Boards & Bits";
	boardsBitsMap.searchURL = "http://www.boardsandbits.com/commerce/catalog/srhkeyword.cz?keyword=";
	boardsBitsMap.gameIDExpression = "/commerce/catalog/product.jsp\\?product_id=\(.*\)&czuid=";
	boardsBitsMap.gameURL = "http://www.boardsandbits.com/commerce/catalog/product.jsp?product_id=";
	boardsBitsMap.priceExpression = "<td class=\"contentbig\"><font color=\"#cc0000\"><b>\(\\$[0-9]*\\.[0-9]*\)</b></font></td>";
	boardsBitsMap.titleExpression = "<title>\(.*\)-Boards & Bits</title>";
	boardsBitsMap.stockExpression = "<td class=\"content\">Availability:</td><td class=\"content\">\(.*\)</td>";
	boardsBitsMap.noResultProbe = "Sorry, no matching product available at this time";
	boardsBitsMap.stockDefault = false;

    var timewellspentMap = new Object();
	timewellspentMap.storeName = "TimeWellSpent";
	timewellspentMap.searchURL = "http://www.timewellspent.org/html/searchresults.php?key_words=";
	timewellspentMap.gameIDExpression = "'gamepage.php\\?id=\([0-9]*\)'";
	timewellspentMap.gameURL = "http://www.timewellspent.org/html/gamepage.php?id=";
	timewellspentMap.priceExpression = "<td align=\"right\" class=\"body\" nowrap><b>Our Price:</b></td>[\\t\\r\\n]*[\\t]*<td align=\"left\" class=\"body\"><b>\(\\$ [0-9]*\\.[0-9]*\)</b></td>";
	timewellspentMap.titleExpression = "<title>\(.*\) listing on www.TimeWellSpent.org</title>";
	timewellspentMap.stockExpression = "<td align=\"right\">Availability:</td>[\\t\\r\\n]*[\\t]*<td align=\"left\">\(.*\)</td>";
	timewellspentMap.noResultProbe = "Sorry no games in our catalog matched your search criteria";
	timewellspentMap.stockDefault = false;

    var gameStores = new Array(gameSurplusMap, boulderMap, thoughtHammerMap, funagainMap, gamefestMap, boardsBitsMap, timewellspentMap);
// store definitions - end

// popup menu code from simplythebest.net (although I modified it quite a bit)
var ie	= document.all
var ns6	= document.getElementById&&!document.all

var isMenu 	= false ;

var menuSelObj = null ;
var overpopupmenu = false;

function hidePriceInfo() {
    document.getElementById("toggleText").innerHTML = "Show Price Comparison";

    if( isMenu ) {
	if( overpopupmenu == false ) {
	    isMenu = false ;
	    overpopupmenu = false;
	    document.getElementById('menudiv').style.display = "none" ;
	    return true ;
	}
	return true ;
    }
    return false;
}

// POP UP MENU
function showPriceInfo() {
    if (document.getElementById('menudiv').style.display == "none") {
	document.getElementById("toggleText").innerHTML = "Hide Price Comparison";

	document.getElementById('menudiv').style.display = "";
	isMenu = true;
	return false ;
    } else {
	hidePriceInfo();
    }
}

// replace method from irt.org
function replace(string,text,by) {
// Replaces text with by in string
    var strLength = string.length, txtLength = text.length;
    if ((strLength == 0) || (txtLength == 0)) return string;

    var i = string.indexOf(text);
    if ((!i) && (text != string.substring(0,txtLength))) return string;
    if (i == -1) return string;

    var newstr = string.substring(0,i) + by;

    if (i+txtLength < strLength)
        newstr += replace(string.substring(i+txtLength,strLength),text,by);

    return newstr;
}


// trim methods from user steste on http://www.bigbold.com/snippets/posts/show/701
// Removes leading whitespaces
function LTrim( value ) {
    var re = /\s*((\S+\s*)*)/;
    return value.replace(re, "$1");
}

// Removes ending whitespaces
function RTrim( value ) {
    var re = /((\s*\S+)*)\s*/;
    return value.replace(re, "$1");
}

// Removes leading and ending whitespaces
function trim( value ) {
    return LTrim(RTrim(value));
}

function extractElement(fullText, startMarker, endMarker) {
    var firstHitIdx = fullText.indexOf(startMarker);
    if (firstHitIdx == -1) {
	return "";
    } else {
	if (endMarker == null) {
	    var rv = fullText.substring(firstHitIdx+startMarker.length);
	    return rv;
	} else {
	    var endIdx = fullText.indexOf(endMarker, firstHitIdx + startMarker.length);

	    if (endIdx == -1) {
		return "";
	    } else {
		var rv = fullText.substring(firstHitIdx+startMarker.length, endIdx);

		return rv;
	    }
	}
    }
}

function greasemonkeyLog(msg) {
    GM_log(msg);
}

function trimCrud(s) {
    var rv = replace(s, "&nbsp;", "");
    rv = replace(rv, "\r", "");
    rv = replace(rv, "\n", "");
    rv = trim(rv);

    rv = replace(rv, "<", "<!--");
    rv = replace(rv, ">", "-->");

    return rv;
}

function getRegexMatch(expression, fulltext) {
    greasemonkeyLog("regex [" + expression + "]");
    var re = new RegExp(expression);
    match = re.exec(fulltext);

    var rv = "";
    if (match != null && match.length >= 2) {
	rv = match[1];
    }
    return rv;
}

var storesCompleted = 0;
function performStoreLookup(gameTitle, bggID, gameStores, idx) {
    var storeMap = gameStores[idx];
    greasemonkeyLog(storeMap.storeName + ' - ' + 'doing lookup for [' + storeMap.storeName + ']');

    var persistenceKey = bggID + "_" + storeMap.storeName;
    greasemonkeyLog(storeMap.storeName + ' - persistence key is [' + persistenceKey + ']');
    storeMap.persistenceKey = persistenceKey;
    gameStores[idx] = storeMap;

    var gameID = GM_getValue(persistenceKey, null);
    greasemonkeyLog(storeMap.storeName + ' - got back id from persistence area [' + gameID + ']');
    // gameID = null; // testing

    if (gameID == null || gameID == "") {
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: storeMap.searchURL + gameTitle,
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
		var doProceed = true;

		if (storeMap.noResultProbe != "") {
		    greasemonkeyLog(storeMap.storeName + ' - checking noResultProbe');
		    if (responseDetails.responseText.indexOf(storeMap.noResultProbe) != -1) {
			greasemonkeyLog(storeMap.storeName + ' - short circuiting, the noResultProbe has fired');
			doProceed = false;
		    }
		}

		if (doProceed) {
		    gameID = getRegexMatch(storeMap.gameIDExpression, responseDetails.responseText);

		    greasemonkeyLog(storeMap.storeName + ' - ' + 'got a gameID: [' + gameID + ']');

		    if (gameID != "" && gameID != null) {
			GM_setValue(persistenceKey, gameID);
			specificGameLookup(gameID, gameTitle, bggID, gameStores, idx);
		    } else {
			gameNotFound(gameStores, gameTitle, idx);
		    }
		} else {
		    gameNotFound(gameStores, gameTitle, idx);
		}
	    }
	});
    } else {
	// we've been here before, and maybe the user has already tweaked things...eventually maybe there is a service posting this stuff!
	specificGameLookup(gameID, gameTitle, bggID, gameStores, idx);
    }
}

function gameNotFound(gameStores, gameTitle, idx) {
    var storeMap = gameStores[idx];
    greasemonkeyLog('game not found at ' + storeMap.storeName);
    storesCompleted++;

    storeMap.finalResult = new Array("&nbsp;", "<a href=\"" + storeMap.searchURL + gameTitle + "\">" + storeMap.storeName + "</a>", "N/A", "Not found");
    gameStores[idx] = storeMap;

    updateLinkArea(gameStores);
}

function specificGameLookup(gameID, gameTitle, bggID, gameStores, idx) {
    var storeMap = gameStores[idx];
    greasemonkeyLog("game lookup: [" + storeMap.gameURL + gameID + "]");
    GM_xmlhttpRequest({
	method: 'GET',
	url: storeMap.gameURL + gameID,
	headers: {
	    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(responseDetails) {
	    var gamePrice = getRegexMatch(storeMap.priceExpression, responseDetails.responseText);
	    greasemonkeyLog(storeMap.storeName + ' - ' + 'extracted a game price: [' + gamePrice + ']');

	    var gameStatus = getRegexMatch(storeMap.stockExpression, responseDetails.responseText);
	    greasemonkeyLog(storeMap.storeName + ' - ' + 'extracted a game status: [' + gameStatus + ']');

	    if (gameStatus == "" && storeMap.stockExpressionTwo) {
		gameStatus = getRegexMatch(storeMap.stockExpressionTwo, responseDetails.responseText);
		greasemonkeyLog(storeMap.storeName + ' - ' + 'extracted a secondary game status: [' + gameStatus + ']');
	    }

	    if (gameStatus == "" && storeMap.stockDefault) {
		gameStatus = "In Stock";
	    }

	    var extractedTitle = getRegexMatch(storeMap.titleExpression, responseDetails.responseText);
	    greasemonkeyLog(storeMap.storeName + ' - ' + 'extracted a game title: [' + extractedTitle + ']');

	    storesCompleted++;

	    storeMap.finalResult = new Array("<a target=\"rsltPage" + idx + "\" href=\"" + storeMap.gameURL + gameID + "\">" + extractedTitle + "</a>",
				    "<a target=\"rsltPage" + idx + "\" href=\"" + storeMap.searchURL + gameTitle + "\">" + storeMap.storeName + "</a>",
				    gamePrice,
				    gameStatus);

	    gameStores[idx] = storeMap;

	    updateLinkArea(gameStores);
	}
    });
}

function processCustomIDs() {
    for (var i = 0 ; i < gameStores.length ; i++) {
	var currInput = document.getElementById("customID" + i);
	GM_setValue(gameStores[i].persistenceKey, currInput.value);
	gameStores[i].finalResult = null;
    }
    storesCompleted = 0;
    getData();
}

function setCustomIDs() {
    for (var i = 0 ; i < gameStores.length ; i++) {
	var currStore = gameStores[i];
	var currKey = GM_getValue(currStore.persistenceKey);
	var slot = document.getElementById("storeline_" + i + "_0");
	slot.innerHTML = '<a href="' + currStore.gameURL + currKey + '" target="store' + i + '">' + currStore.storeName + '</a>: ' +
			    '<input id="customID' + i + '" type="text" size="50" value="' + currKey + '">';
	
	for (var k = 1 ; k < 4 ; k++) {
	    slot = document.getElementById("storeline_" + i + "_" + k);
	    slot.innerHTML = '&nbsp;';
	}
    }

    var saveSlot = document.getElementById('saveButtonArea');
    saveSlot.innerHTML = '<a href="#" id="saveLink"><b>Save and Reload</b></a>';

    var saveClicker = document.getElementById("saveLink");
    saveClicker.addEventListener("click", processCustomIDs, true);

    var customizeSlot = document.getElementById('customizeArea');
    customizeSlot.innerHTML = '<a href="#" id="cancelLink"><b>Cancel</b></a></span>';

    var cancelClicker = document.getElementById("cancelLink");
    cancelClicker.addEventListener("click", updateLinkAreaHelper, true);
}

function updateLinkAreaHelper() {
    updateLinkArea(gameStores);
}

function updateLinkArea(gameStores) {
    if (true || storesCompleted >= gameStores.length) {
	    var popupMenu = '<div id="menudiv" style="position:absolute;display:none;top:250;left:200px;z-index:10000;" ' +
				'onmouseover="javascript:overpopupmenu=true;" onmouseout="javascript:overpopupmenu=false;">' +
			    '<table width=700 cellspacing=1 border=1 cellpadding=0 bgcolor=lightgray>' +
			    '<tr><td>' +
				'<table width=100% border=1 cellspacing=0 cellpadding=3>';

	    var k = 0;
	    bgColors = new Array("#ACACAE", "#BEC4C6");
	    for (k = 0 ; k < gameStores.length ; k++) {
		var displayResult = gameStores[k].finalResult;

		if (!displayResult) {
		    popupMenu += '<tr><td bgcolor="' + bgColors[k%2] + '" align=left><i>Searching ' + gameStores[k].storeName + '...</i></td>';
		    for (var i = 0 ; i < 3 ; i++) {
			popupMenu += '<td bgcolor="' + bgColors[k%2] + '">&nbsp;</td>';
		    }
		    popupMenu += '</tr>';
		} else {
		    popupMenu += '<tr>';
		    for (var i = 0 ; i < displayResult.length ; i++) {
			var bitToShow = displayResult[i];
			if (bitToShow == "This item is in stock.") {
			    bitToShow = "In Stock";
			}

			popupMenu += '<td bgcolor="' + bgColors[k%2] + '" valign=top align=left><span id="storeline_' + k + '_' + i + '">' + bitToShow + '</span></td>';
		    }
		    popupMenu += '</tr></span>';
		}
	    }
	    popupMenu += '<tr>' +
				'<td colspan=3 bgcolor="' + bgColors[k%2] + '" valign=top align=left width="600" height="20">' +
				    '<span id="saveButtonArea"></span>&nbsp;' +
				'</td>' +
				'<td bgcolor="' + bgColors[k%2] + '" valign=top align=right width="100" height="20">' +
				    '<span id="customizeArea"><a href="#" id="customizeLink"><b>Edit</b></a></span>' +
				'</td>'+
			    '</tr>';
	    popupMenu += '</table>' +
			    '</td></tr>' +
			    '</table>' +
			    '</div>';

	var chunk = document.getElementById("gmhook");
	chunk.innerHTML = '<a href="#" id="mainLinkHook"><span id="toggleText">Hide Price Info</span></a>' + '\n\n' + popupMenu;

	var link = document.getElementById("mainLinkHook");
	link.addEventListener("click", showPriceInfo, true);
	showPriceInfo();

	var customizeLink = document.getElementById("customizeLink");
	customizeLink.addEventListener("click", setCustomIDs, true);
    } else {
	var chunk = document.getElementById("gmhook");
	chunk.innerHTML = "<i>got data from store " + storesCompleted + " of " + gameStores.length + "...</i>";
    }
}

// main

if (!GM_xmlhttpRequest || !GM_setValue || !GM_getValue) {
    alert('Please upgrade to the latest version of Greasemonkey to use the BGG Price Comparator script');
} else {
    var bggID = extractElement(document.location.href, "/game/", null);
    // in case it was /game/822#something, strip off the extra characters
    for (var i = 0 ; i < bggID.length ; i++) {
	var currChar = bggID.charAt(i);
	if (currChar == '0' || currChar == '1' || currChar == '2' || currChar == '3' || currChar == '4' ||
	    currChar == '5' || currChar == '6' || currChar == '7' || currChar == '8' || currChar == '9') {
	    // all good
	} else {
	    bggID = bggID.substring(0, i);
	    break;
	}
    }

    function getData() {
	var gameTitle = '';
	if (("" + document.location).indexOf("http://127.0.0.1/bggdev.html") != -1) {
	    // for local testing, esp. when BGG is down!
	    gameTitle = "Tempus";
	    bggID = "10";
	} else {
	    gameTitle = document.title;
	}

	updateLinkArea(gameStores);

	greasemonkeyLog('extracted game title [' + gameTitle + ']');

	for (var i = 0 ; i < gameStores.length ; i++) {
	    performStoreLookup(gameTitle, bggID, gameStores, i);
	}
    }

    var area = document.getElementById("edityear");
    var hook = document.createElement('i');
    hook.innerHTML = "<span id=\"gmhook\"><a href=\"#\" id=\"mainLinkHook\"><i>Get Price Comparison...</i></a></span>";
    area.appendChild(hook);

    var link = document.getElementById("mainLinkHook");

    link.addEventListener("click", getData, true);

}
