// ==UserScript==
// @name           Team Liquid Banned User Link
// @namespace      http://visual77.com/blog/
// @description    Provide links to banned user post histories
// @include        http://www.teamliquid.net/forum/viewmessage.php?*topic_id=32696*
// ==/UserScript==

(function () {
    var mainBody = document
			.getElementsByTagName('table')[0]
			.getElementsByTagName('tr')[0]
			.getElementsByTagName('table')[2]
			.getElementsByTagName('tr')[0]
			.childNodes[1]
			.getElementsByTagName('td')[1]
			.getElementsByTagName('tr')[2]
			.getElementsByTagName('tbody')[1];
	mainBody.innerHTML = mainBody.innerHTML.replace(
	    /<b>(.*?)<\/b> was just <b>/g, 
	    '<b><a href="http://www.teamliquid.net/forum/search.php?q=&t=c&f=-1&u=$1&gb=date">$1</a></b> was just <b>'
	);
}());