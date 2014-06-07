//
// 27.05.2009
//

// ==UserScript==
// @name  		Vkontakte Away Links Parser
// @namespace 	http://userscripts.org/users/chez
// @description   Remove vkontakte away link page from all pages
// @include   	*vkontakte.ru/*

// ==/UserScript==


var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
	if (links[i].href.split('away.php?to=').length == 2) {
		links[i].href = unescape(links[i].href.split('away.php?to=')[1]);
	}
}