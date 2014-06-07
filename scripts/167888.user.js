// ==UserScript==
// @name		Konachan/yande.re: Forums List Link to Last Page
// @namespace	Zolxys
// @description	Replaces the "last" links in the forum list with "first" links and changes the main links to link to the last page.
// @include	http://konachan.com/forum
// @include	http://konachan.com/forum?*
// @include	http://konachan.net/forum
// @include	http://konachan.net/forum?*
// @include	https://yande.re/forum
// @include	https://yande.re/forum?*
// @version	1.1
// ==/UserScript==
var t = document.getElementById('forum').getElementsByTagName('table')[0].getElementsByTagName('td');
for (var i = 0; i < t.length; ++i) {
	var a = t[i].getElementsByTagName('a');
	if (a.length == 2)
	  if (a[1].innerHTML.trim() == 'last') {
		var h = a[0].href;
		a[0].href = a[1].href;
		a[1].href = h;
		a[1].innerHTML = 'first';
	}
}
