// ==UserScript==
// @name           TeamLiquid.net Banned User Link
// @namespace      http://teamliquid.net
// @description    Provide links to banned user post histories
// @include        http://www.teamliquid.net/forum/viewmessage.php?*topic_id=32696*
// ==/UserScript==
// Source: http://userscripts.org/scripts/show/99162

(function () {
    var mainBody = document.getElementsByTagName('table')[0];
    mainBody.innerHTML = mainBody.innerHTML.replace(
	    /<b>(.*?)<\/b> was just <b>/g, 
	'<b><a href="http://www.teamliquid.net/forum/search.php?q=&t=c&f=-1&u=$1&gb=date">$1</a></b> was just <b>'
    );
}());
