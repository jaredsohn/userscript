// BBC Score Title
// v1 0 November 2007
// 

// ==UserScript==

// @name        BBC Score Title
// @namespace   brunwin.uk/greasemonkey
// @description Displays the score of a game in a BBC sport live text football commentary in the title of the page to make it easier to track multiple games
// @include http://*.bbc.co.uk/sport*/hi/football/teams/*/*/live_text/default.stm*

// ==/UserScript==

(function() {
 	var allDivs = document.evaluate(
     		"//div[@class='sh']",
     		document,
     		null,
     		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     		null);
 	for (var i = 0; i < allDivs.snapshotLength; i++)
 	{
		var thisDiv = allDivs.snapshotItem(i);
		document.title = thisDiv.innerHTML.replace(/^\s*|\s*$/g,'').replace(/Live:/, '');
	}
})();