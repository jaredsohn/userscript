// ==UserScript==
// @name           LL/ETI Topic Autorefresher
// @namespace      http://userscripts.org/scripts/show/101420
// @autor          Kalphak
// @include        http://boards.endoftheinter.net/showmessages.php?board=*
// @include        https://boards.endoftheinter.net/showmessages.php?board=*
// @date           19/04/2011
// ==/UserScript==

var theButton = document.getElementsByTagName("input")[3];
theButton.addEventListener('click',messagePosted,false);

function messagePosted(e){
	location.reload(true);
	return true;
}