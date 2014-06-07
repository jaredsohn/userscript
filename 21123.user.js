// ==UserScript==
// @name           Link to Manager Records
// @namespace      baseballsimulator.com
// @include        http://forums.sportingnews.com/viewtopic.php*
// ==/UserScript==

var leagueLinks, leagueLink2s;

var myLink = document.createElement("a");


var leagueLink = document.evaluate("//a[contains(@href,'index.html?user_id')]/@href",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < leagueLink.snapshotLength; i++) {
leagueLinks = leagueLink.snapshotItem(i);
leagueLinks = leagueLinks.nodeValue

var myEnd = leagueLinks.indexOf('class="b"');
var myEnd2 = leagueLinks.indexOf('?user_id=');
var myEndTotal = myEnd2 - myEnd;

var leagueLinks2b = leagueLinks.substr(leagueLinks.indexOf('=') + 1,myEnd2 - myEnd);


	var leagueLink2 = document.evaluate("//a[contains(@href,'index.html?user_id')]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	myLink = document.createElement("a");
	leagueLink2s = leagueLink2.snapshotItem(i);
	myLink.innerHTML = '</a> | <a href="#"> Record';

	myLink.setAttribute("onclick","window.open('http://fantasygames.sportingnews.com/stratomatic/records/manager_records_indiv.html?mem_id=" + leagueLinks2b + "','NewWin','scrollbars=yes,resizable=yes,width=800,height=450');");


	leagueLink2s.parentNode.insertBefore(myLink,leagueLink2s.nextSibling);

}