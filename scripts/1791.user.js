// version 1.0
// 2005-09-22
// Copyright (c) 2005, Rafal Smyka
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Onephoto graph-rank", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Onephoto graph-rank
// @namespace     http://rafal.smyka.org/greasemonkey
// @description   Display plfoto-like graphical rank in onephoto
// @include       *onephoto.net/info.php3?id=*
// ==/UserScript==

// get text nodes with number of votes and rank
var nodes = document.evaluate(
	"//*[@class='fotodes']//a[substring(@href, 1, 9)='histogram']/parent::*/text()",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (nodes.snapshotLength > 1) {
	var voters = parseInt(nodes.snapshotItem(0).substringData(4, 30));
	var rank = parseFloat(nodes.snapshotItem(1).substringData(0, 30)) * 30;
//	alert("voters=" + voters + ", rank=" + rank);

	// create a div for votes
	var rankDiv = document.createElement('div');
	rankDiv.id = 'graphRank';
	rankDiv.style.background = '#eee';
	rankDiv.style.width = '300px';

	var rank1Div = document.createElement('div');
	rank1Div.style.background = '#900';
	rank1Div.style.width = rank + 'px';
	rank1Div.style.height = voters + 'px';
	rankDiv.appendChild(rank1Div);
	
	var ruler = document.createElement('img');
	ruler.src = 'data:image/gif;base64,R0lGODlhLAEMAIMAAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
		+ 'AAAAAAAAACH5BAMAAAIALAAAAAAsAQwAAAT5EMhJq7046827/2AojmRpnqigrmzrvgIAz7Qq'
		+ '13h75/zO474fLSiEEYuuI5KlXNqcs6ZTuqQirUWsUPvj9qBG8Ms7fIInK3JSkhbHmGKKGYqe'
		+ 'X+X2Kjuf3fPLTH5vbntqcGaGbYhxPomKj1WKjpCTOzeOlpA1gpl/WYOTh6GSjIdTSWeocaaR'
		+ 'i6dzWjKNj6OedG46uLK4NnWEMbW2rYOpwoCwvKy/yYKpwcS1hbzPvdG9r8jJxp/axLfezLqa'
		+ '39PjeuBdptTb6d3od77hy+9X3Z3lw9DuwdT38/PW2AGxZ44bvYG09unCQ6jZKmYO6UTMN20i'
		+ 'PHLVWkQAADs=';
	rankDiv.appendChild(ruler);

	// insert the div into the document
	var theRank = nodes.snapshotItem(0).parentNode;
	theRank.parentNode.insertBefore(rankDiv, theRank.nextSibling);
}

