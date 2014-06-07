// ==UserScript==
// @name           Little Golem game notifier
// @namespace      http://userscripts.org/users/72778
// @description    Periodically check littlegolem.net to see if there are any games you need to make moves in
// @include        *
// ==/UserScript==

function updateLittleGolemStatus(gameCount, totalGames) {
	lgStatus = '';
	if (gameCount != "0") {
		lgStatus = ' **LG: ' + gameCount + '/' + totalGames + '**';
	}
	GM_setValue('LG_lastStatus', lgStatus);
}
function parseGamePage(response, iframe) {
	if (iframe == undefined) {
		var iframe = document.createElement('iframe');
		iframe.style.display = 'none';
		document.getElementsByTagName('body')[0].appendChild(iframe);
	}
	if (iframe.contentWindow == undefined) {
		// So poll to make sure it is ready.
		window.setTimeout(function() {parseGamePage(response, iframe)}, 100);
		return false;
	}

	var iframeDoc = iframe.contentWindow.document;
	iframeDoc.open("text/html", "replace");
	iframeDoc.write(response.responseText);
	iframeDoc.close()

	findGameInfo(iframeDoc);

	iframe.parentNode.removeChild(iframe);
}

function updatePageTitle() {
	var lgStatus = GM_getValue('LG_lastStatus', '');
	document.title = document.title.replace(/ \*\*LG: .*\*\*/,'') + lgStatus;
}

function checkLittleGolem() {
	var lastChecked = GM_getValue('LG_lastChecked', null);
	if (lastChecked == null ||
		new Date().getTime() - parseInt(lastChecked) > 300000) {

		GM_setValue('LG_lastChecked', '' + new Date().getTime());

		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.littlegolem.net/jsp/game/index.jsp',
			onload: parseGamePage
		});
	}

	updatePageTitle()
	window.setTimeout(checkLittleGolem,60000);
}
checkLittleGolem()

function findGameInfo(doc) {
	// We might as well do some looking up if we're already accessing the page
	var allAnchorElements = doc.getElementsByTagName('a');
	for (var i = 0; i < allAnchorElements.length; i++) {
		var currentElement = allAnchorElements[i];
		if (currentElement.firstChild.nodeValue == 'Your games:') {
			GM_setValue('LG_lastChecked', '' + new Date().getTime());
			// Walk the DOM to find the game numbers
			var gameText = currentElement.parentNode.parentNode.childNodes[3].firstChild.firstChild.nodeValue;
			var gameMatches = gameText.match(/([0-9]*)\/([0-9]*)/);
			var gamesWithMoves = gameMatches[1];
			var totalGames = gameMatches[2];
			updateLittleGolemStatus(gamesWithMoves, totalGames);
			updatePageTitle();
		}
	}
}
if (window.location.host.match(/littlegolem.net/)) {
	findGameInfo(document);
}
