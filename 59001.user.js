// ==UserScript==
// @name           ingame.de sidebar remover
// @namespace      http://userscripts.org/users/26744
// @include        http://*.ingame.de/forum/forumdisplay.php*
// @include        http://*.ingame.de/forum/index.php*
// ==/UserScript==

// list the available tds
var tds = document.body.getElementsByTagName('td');

// run through them and get them removed if they match the sidebar criteria
for(var i=0; i<tds.length; i++) {
	if( tds[i].getAttribute('width') == "120" && tds[i].getAttribute('valign') == "top" ) {
		tds[i].parentNode.removeChild(tds[i]);
	}
}