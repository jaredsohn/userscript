// ==UserScript==
// @name           BGG Games Played Numbers
// @namespace      http://www.cise.ufl.edu/~chsmith/userscripts/bgggamesplayed.user.js
// @description    add numbers to the game played table on boardgamegeek.com
// @include        http://www.boardgamegeek.com/plays/bygame*
// @include        http://*.geekdo.com/plays/bygame*
// ==/UserScript==



var oRows = document.evaluate('//div/table[@class=\'forum_table\']//tr', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


var re = /page\/(\d+)/;

var page = 1;
if (re.test(location.href)) {
	page = RegExp.$1;
}

//GM_log(page);

var offset = (page -1 ) * 100; //100 is hardcoded as it is hardcoded on the site.
for (var cand = null, i = 0; (cand = oRows.snapshotItem(i)); i++) {
	//GM_log("bgg: " + i)
	var oTd;
	if (i == 0) {
		oTd = document.createElement("TH");
		oTd.innerHTML = "#";
	}
	else {
		oTd = document.createElement("TD");
		oTd.innerHTML = i + offset;
	}
	cand.insertBefore(oTd, cand.firstChild);
}
