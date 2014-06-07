// ==UserScript==
// @name          Force Monobook for Wookieepedia
// @namespace     http://www.wikia.com/Wikia
// @description   A hacky approach at removing the Oasis skin from Wookieepedia
// @license       GPL version 2; http://www.gnu.org/licenses/gpl-2.0.html
// @include       http://starwars.wikia.com/*
// @version       1.0
// ==/UserScript==

if (document.location.href.indexOf('useskin=monobook') == -1) {
	document.location.href += (document.location.href.indexOf('?') > -1 ? '&' : '?') + 'useskin=monobook';
}

for (var i in document.links) {
	if (!document.links[i].href.indexOf('http://starwars.wikia.com')) {
		document.links[i].href += (document.links[i].href.indexOf('?') > -1? '&' : '?') + 'useskin=monobook';
	}
}
