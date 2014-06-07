// ==UserScript==
// @id             fangraphs-search-auto-redirect@hcxangel
// @name           Fangraphs Search Auto-redirect
// @version        1.0
// @namespace      hcxangel
// @author         hcxangel
// @description    
// @include        http://www.fangraphs.com/players.aspx?lastname=*
// @run-at         document-end
// ==/UserScript==
var query = document.location.search.slice(1).split('&');
var qtre = /^(")?(.+?)\1?$/;
var playerSearched = '';

for (var i = 0, l = query.length; i < l; i++) {
	var n = query[i].split('=')
	console.log(n[1])

	if (n[0] == 'lastname') {
		playerSearched = unescape(n[1]).match(qtre)[2].toLowerCase();
		break;
	}
}

var players = document.querySelectorAll('#PlayerSearch1_panSearch > table table tr > td:first-child > a');

for (var i = 0, l = players.length; i < l; i++) {
	var player = players[i];
	
	if (player.innerHTML.toLowerCase() == playerSearched) {
		document.location.assign(player.href)
	}
}