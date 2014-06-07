// Copyright (c) 2009-2010 RxR

// ==UserScript==
// @name KingsAge Forum Enhancement
// @namespace RxR KingsAge
// @description This script adds a couple of buttons to built-in Forum to make navigation easier
//
// @include http://s*.kingsage.*/forum.php*
// @include http://s*.kingsage.*/game.php*s=ally*m=forum*
//
// Auto-update function. Many thanks, Buzzy!
// @require	http://buzzy.260mb.com/AutoUpdater.js
// @version	1.45
//
// @history	1.45 03.10.2010	fixed some bugs
// @history	1.44 29.07.2010	v.0.1.22 added links to subpages at the bottom of the page so I changed script accordingly
// @history	1.43 03.06.2010	implemented waitForReady (thanks GIJoe) to be compatible with the newest version Greasemonkey
// @history	1.42 27.05.2010	language system was rewrited in way inspired by PhasmaExMachina
// @history	1.41 25.05.2010	link on tab "Alliance forum" was changed directly to http://s*.kingsage.*/forum.php
// @history	1.40 25.05.2010	script works on all servers now, fixed bug in language's recognizing (thanks szczeciu for suggestion and bug reporting), added autoupdate
// @history	1.30 03.01.2010	prevent from jump to main forum in time of writing reply
// @history	1.22 17.12.2009	reload interval was randomized to 5 minutes +/- 30 seconds
// @history	1.21 15.12.2009	changed searching for "headerInfo" - forced by changes in v.0.1.21
// @history	1.20 13.12.2009	added "breadcrumb" and "headerInfo" to bottom of topic's page
// @history	1.10 10.12.2009	pressing "MFaR" (Mark Forum as Read) will jump to main forum
// @history	1.00 06.12.2009	added buttons to topic (jump to top and bottom of page, list of pages at bottom og page)
// @history	0.07 06.12.2009	reload of main forum every 5 minutes
// @history	0.06 06.12.2009	exclamation mark in <title> if there's any unread topic
// @history	0.05 06.12.2009	<title> was changed
// @history	0.04 05.12.2009	added jump to main forum after some time
// @history	0.03 05.12.2009	button "read" shifted to left, removed one <br>
// @history	0.02 05.12.2009	added choice to show all/unreaded forums
// @history	0.01 05.12.2009	added buttons form marking forum as read
//
// ==/UserScript==

autoUpdate (53768, "1.45");					// Buzzy's autoaupdate

if (!GM_getValue || !GM_getValue || !GM_deleteValue) return;	// opps, my precious functions're missing

var delayForReady = 10;						// delay in miliseconds for waitForReady's setTimeout
waitForReady(main, delayForReady);				// wait while document is ready and then call main()

var SHOW_ALL = "SHOW_ALL";
var forumLabel = "ForumLook";
var forumView = "ShowAll";
var forumMainPage = "forum.php?s=forum_main"
var showAll = SHOW_ALL;
var mainForumDelay = 5*60*1000 + Math.round(30*1000*(2*Math.random()-1));	// 5 minutes +/- 30 seconds in milliseconds
var exclamationMark = "! ";
var jumpToMainForumTimeout;

var bottomOfList = "RxR_bottomOfList";

// TRANSLATIONS ***********************************************************************************************************
var texty = {
	en: {	allForums	: "All forums",
		onlyUnread	: "Only unread",
		bottomOfPage	: "To the bottom of the page",
		topOfPage	: "To the top of the page",
	},
	sk: {	allForums	: "Všetky fóra",
		onlyUnread	: "Len neprečítané",
		bottomOfPage	: "Na koniec stránky",
		topOfPage	: "Na začiatok stránky",
	},
}
var text = new legend(window.location.hostname, texty);
// ************************************************************************************************************************

function main() {

// uprav <title>KingsAge</title>
document.title = window.location.host.replace(".kingsage.","-");	// make "s2.org"

switch (paramValue("S", window.location.href.toUpperCase())) {
case "FORUM_MAIN":
	var bolaZmena = Boolean(false);

	clearTimeout(jumpToMainForumTimeout);				// zrus timeout
	setTimeout(function() { window.location.reload(); }, mainForumDelay);	// obnovit po x minutach

	showAll = GM_getValue(forumView,"");

	var myNodes = xpath(document, '//table[@class="forumpost"]');
	if (myNodes.snapshotLength > 0) {
		var myTable = myNodes.snapshotItem(0);			// riskneme, ze je to spravne

		var myButton = document.createElement("div");		// vytvor tlacidlo "vsetko/len neprecitane"

		myButton.className = "smallButton";
		myButton.style.cssFloat = "right";
		myButton.style.margin = "0px 0px 5px 0px";
		myTable.parentNode.insertBefore(myButton, myTable);	// vloz tlacidlo

		var aForButton = document.createElement("a");		// vytvor odkaz pre tlacidlo
		aForButton.href = window.location.href;
		aForButton.innerHTML = (hideReaded())?text.getTranslation("allForums"):text.getTranslation("onlyUnread");
		aForButton.addEventListener("click", function() {
					if (hideReaded()) GM_setValue(forumView,SHOW_ALL); else GM_deleteValue(forumView);
				}, true);
		myButton.insertBefore(aForButton, myButton.firstChild);	// vloz odkaz do tlacidla

		for (var i = 0; i < myTable.rows.length; i++) {
			var myCell = myTable.rows[i].cells[0];			// zaujima nas prvy stlpec
			var aNodes = xpath(myCell, "descendant::a[@href]"); 	// vyhladaj <a href

			if (aNodes.snapshotLength > 0) {
				var aNode = aNodes.snapshotItem(0);

				var imgNodes = xpath(myCell, "descendant::img[@src]"); 	// vyhladaj <img src="http://s1.kingsage.sk/img/forum/boardNewM.png" alt="">
				if (imgNodes.snapshotLength > 0) {
					var imgNode = imgNodes.snapshotItem(0);
					var innerTXT = imgNode.src.toUpperCase();

					if (innerTXT.indexOf("BOARDNEWM") < 0) {
						if (hideReaded()) {
							myTable.deleteRow(i);
							i--;
							continue;
						}
						else {
							aNode.style.fontWeight = "normal";
							aNode.style.color = "black";
							aNode.innerHTML = aNode.innerHTML.replace(/<\/?b>/i,"");
						}
					}
					else {
						bolaZmena = true;
					}
				}

				var forumID = paramValue("FORUM_ID", aNode.href.toUpperCase());	// precitaj forum_id
				var myButton = document.createElement("div");	// vytvor tlacidlo "precitane"

				myButton.className = "smallButton";
				myButton.style.cssFloat = "left";
				myButton.style.marginRight = "10px";
				myCell.insertBefore(myButton, aNode.parentNode);	// vloz tlacidlo

				var aForButton = document.createElement("a");		// vytvor odkaz pre tlacidlo
				aForButton.href = "forum.php?s=forum_board&forum_id=" + forumID + "&a=forumBoardMarkRead";

				aForButton.innerHTML = "<span>MFaR</span>";
				aForButton.addEventListener("click", function() {
							GM_setValue(forumLabel,window.location.href);
						}, true);
				myButton.insertBefore(aForButton, myButton.firstChild);	// vloz odkaz do tlacidla
			}
		}

		if (bolaZmena) {
			if (document.title.indexOf(exclamationMark) != 0) document.title = exclamationMark + document.title;
		}
		else {
			document.title = document.title.replace(exclamationMark,"");
		}
	}
	break;
case "FORUM_BOARD":
	skipIfMust(forumLabel);						// pozri sa, ci netreba skocit

	var myNodes = xpath(document, '//form[@name="kingsage"]');
	if (myNodes.snapshotLength > 0) {				// zrus <br>
		var myNode = myNodes.snapshotItem(0);

		var brNode = getPreviousSibling(myNode);
		if (brNode && (brNode.nodeName == "BR")) brNode.parentNode.removeChild(brNode);
	}

	myNodes = xpath(document, '//div[@class="smallButton"]');
	for (var i = 0; i < myNodes.snapshotLength; i++) {
		var divNode = myNodes.snapshotItem(i);
		var aNodes = xpath(divNode, "descendant::a[@href]"); 	// vyhladaj <a href

		if (aNodes.snapshotLength > 0) {			// presun tlacidlo "precitane" dolava
			var aNode = aNodes.snapshotItem(0);

			if (paramValue("A", aNode.href.toUpperCase()) == "FORUMBOARDMARKREAD") {
				divNode.style.cssFloat = "left";
				divNode.style.margin = "0px 0px 5px 0px";
				aNode.addEventListener("click", function() { GM_setValue(forumLabel,forumMainPage); }, true);
			}
			if (paramValue("M", aNode.href.toUpperCase()) == "NEW_THREAD") {
				divNode.style.margin = "0px 0px 5px 0px";
				if (text.getLanguageID() == "sk") aNode.innerHTML = "Nová téma";
			}
		}
	}

	// skocit po (viac-menej) piatich minutach
	jumpToMainForumTimeout = setTimeout(function() { window.location.href = "forum.php?s=forum_main"; }, mainForumDelay);

	break;
case "FORUM_THREAD":
	var myNodes = xpath(document, '//a[@name="bottom"]');			// find "bottom" tab
	if (myNodes.snapshotLength > 0) {
		var firstNode;
		var lastNode;

		myNodes = xpath(document, '//table[@class="forumborder"]');	// find all articles
		if (myNodes.snapshotLength > 0) {
			firstNode = myNodes.snapshotItem(0);			// set firstNode to first article
			remove2BR(firstNode);					// remove one <br> before first article

			// set lastNode after last article
			lastNode = getNextSibling(myNodes.snapshotItem(myNodes.snapshotLength-1));
			if (lastNode.nodeName == "BR") lastNode = getNextSibling(lastNode);
		}

		myNodes = xpath(document, '//a[@href]');			// finf first "Reply"
		for (var i = 0; i < myNodes.snapshotLength; i++) {
			var xNode = myNodes.snapshotItem(i);
			if ((paramValue("ANSWER", xNode.href.toUpperCase()) == "1") && (paramValue("QUOTE", xNode.href.toUpperCase()) == "")) {
				firstNode = xNode.parentNode;			// set firstNode to first "Reply"
				firstNode.style.margin = "0px 0px 5px 0px";
				break;
			}
		}

		// v.0.1.22 added links to subpages at the bottom so we have to find firstNode outside routine bellow
		myNodes = xpath(document, '//span[@class="forumPage"]');	// find links to subpages
		if (myNodes.snapshotLength > 0) firstNode = myNodes.snapshotItem(0);

/* v.0.1.22 added following links
		myNodes = xpath(document, '//span[@class="forumPage"]');	// find links to subpages
		if (myNodes.snapshotLength > 0) {
			firstNode = myNodes.snapshotItem(0);			// nastav firstNode na prvy odkaz
			var lNode;

			for (var i = 0; i < myNodes.snapshotLength; i++) {
				var cNode = myNodes.snapshotItem(i).cloneNode(true);	// klonuj aj s vnutrom
				lastNode.parentNode.insertBefore(cNode,lastNode);	// zarad pred lastNode
				if (i == 0) lNode = cNode;				// prvy odpamataj
			}
			lastNode = lNode;						// lastNode bude prvy odkaz
		}
*/
		if (firstNode) {
			var myButton = document.createElement("div");		// vytvor "skok dole"

			myButton.className = "smallButton";			// vloz pred prvy odkaz tlacidlo na skok dole
			myButton.style.cssFloat = "left";
			myButton.style.margin = "0px 10px 5px 0px";
			myButton.innerHTML = '<a href="#bottom"><img src="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%01%E7%96X%A0%00%00%00%06tRNS%00%FF%00%FF%00%FF7X%1B%7D%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%01lIDATx%9Cc%F8%0F%06%0C%40%EC8%F1%01%03%94%A7Yz%86%01%08%80L%E9%F4C%C2%15W%A1*D%0A%2FUn%FF%0A%E5%C0%01%88%23%DFx%07%A2%1E%A4%CD%7D%DA%13%06%08%00%0A%D4%EE%FA%CA%A0%14%84%D0%C3%80%04%10%FA%81%40)%EF%84A%C7%5D%CD%E6%9B(%12l%A9%A7%A7%1C%FF%91%B8%FCu%E0%DC%A7%81%0B%DF0%F0i%A3X%EF%3D%EF%05%83%E3%04%14%A7%60%05%84%2C%07%9A%23Y%7B%9B%D5g9%BAD%F1%A67zmw%F9BV%22%24%20%A0%FF%E0g%97%A9O%04%C2%D7%C2Mc%60%88%7D%B8%E5%D6%BF%B4%D5%EF%A3%16%BD%04%3A%975%60%1DT%02%84%E3%9E%ED%7F%F8%BFh%F3%17%91%AC%13%E8v0%E4%BE%0B%98%F3%1A.%8A%C5%1F%0C%18%00%BB%FF%20%80%D1i9%AB%C7j%20%C9h%3D%13%820%F5%A0p%80%91%9C%BE%F2%050%E8%81%D1(_s%15%12%0C%D85%40%24%80%E9%A3q%D7%07%CB%DE%FB%40%04%8C4x(%A0%87%2CC%FC%01%99%82%B3%CA%C5%E7%EC%BBng%AF%7B%0F%8A%C3%B9O%3D%A7%3DPJZ-%18%BD%95%3Fv%0F%83%CB%5C%06.%09T%1Bb%1F%02%23%1D%18%90%C0%94%03%D4%03%0CN%60%EC%03%11W%F4.%06i%3B%9C%A1%C4%90%FER%A3%E1%EE%B1\'%FF%E7%9C%FF%0F%F4%03%83%5E%26%81P%82%0A%E5%3EdH%B9%8C%A9%14%02%00%C5%1E%F8%0C*%5D%20%B2%00%00%00%14IDATx%9Cc%F8%FF%9F%01%09%11%22%E8%CD%18%60%01%00%C6%DD%FF%01%1DI%C32%00%00%00%00IEND%AEB%60%82" alt="' + text.getTranslation("bottomOfPage") + '" title="' + text.getTranslation("bottomOfPage") + '" style="margin: 0px 0px 0px 2px"></a>';
			firstNode.parentNode.insertBefore(myButton, firstNode);	// vloz tlacidlo
		}
		if (lastNode) {
			var myButton = document.createElement("div");		// vytvor "skok hore"

			myButton.className = "smallButton";			// vloz pred prvy odkaz tlacidlo na skok dole
			myButton.style.cssFloat = "left";
			myButton.style.margin = "0px 10px 5px 0px";
			myButton.innerHTML = '<a href="#top"><img src="http://' + window.location.hostname + '/img/forum/upS.png" alt="' + text.getTranslation("topOfPage") + '" title="' + text.getTranslation("topOfPage") + '" style="margin: 2px 1px 0px 2px"></a>';
			lastNode.parentNode.insertBefore(myButton, lastNode);	// vloz tlacidlo

			myNodes = xpath(document, '//td[@class="headerInfo"]');		// najdi "headerInfo"
			var cNode = null;
			if (myNodes.snapshotLength > 0) {
				cNode = myNodes.snapshotItem(0);
			}
			else {	// v.0.1.21 pouziva class="class headerInfo", ale mozno je to len chyba programatora
				myNodes = xpath(document, '//td[@class="class headerInfo"]');	// najdi "headerInfo"
				if (myNodes.snapshotLength > 0) cNode = myNodes.snapshotItem(0);
			}
			if (cNode) {
				cNode = cNode.parentNode.parentNode.parentNode.cloneNode(true);	// klonuj aj s vnutrom
				lastNode.parentNode.appendChild(cNode);		// vloz to na koniec
				remove2BR(cNode);
			}

			myNodes = xpath(document, '//div[@class="breadcrumb"]');	// najdi "omrvinky"
			if (myNodes.snapshotLength > 0) {
				var cNode = myNodes.snapshotItem(0).cloneNode(true);	// klonuj aj s vnutrom
				lastNode.parentNode.appendChild(cNode);			// vloz to na koniec
			}
		}
	}

	if (paramValue("ANSWER", window.location.href.toUpperCase()) != "1") {
		// set timeout for jump to main forum after (more or less) 5 minutes
		jumpToMainForumTimeout = setTimeout(function() { window.location.href = "forum.php?s=forum_main"; }, mainForumDelay);
	}
	else clearTimeout(jumpToMainForumTimeout);			// cancel timeout, when answering

	break;
case "ALLY":								// change link on tab directly to forum
	var tabElements = xpath(document, '//td[contains(@background,"img/tabs/menue_s_back.png")]/a[contains(@href,"s=ally&m=forum")]');
	if (tabElements.snapshotLength == 1) {
		var tabElement = tabElements.snapshotItem(0);
		tabElement.href = "forum.php?s=forum_main";
		break;
	}
}
} // DO NOT TOUCH!! -> function main() {

// FUNCTIONS **************************************************************************************************************

function hideReaded() {
	return (showAll != SHOW_ALL);
}

function paramValue(name, url_string) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url_string);
	if (results == null)	return "";
	else			return results[1];
}

function xpath(node, query) {
	return document.evaluate(query, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function skipIfMust(nasaZnacka) {
	var txt = GM_getValue(nasaZnacka,"");

	if (txt != "") {
		GM_deleteValue(nasaZnacka);

		if (window.location.href != txt) {	// urobime to v nahodnom intervale 300-1000 ms
//			if (txt.indexOf("#") < 0) {	// prilozime zalozku
//	zalozka nefunguje	txt += "#"+bottomOfList;
//			}
			setTimeout(function() { window.location.href = txt; }, Math.round(300 + (700 * Math.random())));
		}
	}
}

function getNextSibling(node) {
	do {
		node = node.nextSibling;
	} while (node && (node.nodeType != 1));
	return (node);
}

function getPreviousSibling(node) {
	do {
		node = node.previousSibling;
	} while (node && (node.nodeType != 1));
	return (node);
}

function getFirstChild(node) {
	var nextNode = node.firstChild;
	while (nextNode && (nextNode.nodeType != 1)) {
		nextNode = nextNode.nextSibling;
	}
	return (nextNode);
}

function remove2BR(node) {				// odstrani dve <br> pred elementom
	var pNode = getPreviousSibling(node);
	if (pNode.nodeName == "BR") {
		var ppNode = getPreviousSibling(pNode);
		if (ppNode.nodeName == "BR") node.parentNode.removeChild(pNode);
	}	
}

function legend (domain, txtObj) {					// language handling
	const unknownSomething = "???";
	const unknownLanguage = "unknownLanguage";
	var languageIndex = {unknownLanguage: "en", "sk": "sk", "org": "en"};
	var languageID = unknownLanguage;
	var _texty = txtObj;

	var m, n;
	n = (m = domain.match(new RegExp("\.([a-z]{2,6})$","i"))) ? m[1] : this.unknownLanguage;
	if (typeof languageIndex[n] == "undefined") n = unknownLanguage;
	this.languageID = n;

	this.getLanguage = function () {				// returns appropriate part of texty
		return (_texty[languageIndex[this.languageID]]);
	}
	this.getLanguageID = function () {				// returns language
		return (languageIndex[this.languageID]);
	}
	this.getTranslation = function (txt) {
		if (_texty != "undefined") return (this.getText (txt, this.languageID));
		else return (unknownSomething);
	}
	this.getText = function  (txt, langID) {
		var lang = languageIndex[langID];
		var langObj = _texty[lang];

		var tokens = txt.split('.');
		for (var i = 0; i < tokens.length; i++) {
			if(typeof(langObj[tokens[i]]) != "undefined") langObj = langObj[tokens[i]];
			else return ((langID == unknownLanguage)? unknownSomething : this.getText(txt, unknownLanguage));
		}
		return (langObj);
	}
}

function waitForReady(callback, delayInMS) {			// thanks GIJoe
	var docState = "";					// since readyState returns String... should be string null
	try {
		docState = window.document.readyState;
	}
	catch(e) {}

	if (docState != "complete") {
		window.setTimeout(waitForReady, delayInMS, callback);
		return;
	}
	callback();
}
