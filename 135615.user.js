// ==UserScript==
// @name          SporzaNoSoccer
// @description   Removes all soccer from Sporza
// @include       http://www.sporza.be/*
// ==/UserScript==
var links = document.getElementsByTagName('a');
for (i=0; i < links.length; i++)
{
	if (new RegExp('voetbal').test(links[i].href) == true) {
		if (links[i].parentNode.parentNode.className != 'hnav nav2') {
			links[i].parentNode.parentNode.style.visibility = 'hidden';
			links[i].parentNode.parentNode.style.display = 'none';
		}
	}
}
