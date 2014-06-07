// ==UserScript==
// @name           Amigofish Hide Lazy
// @namespace      tag:maeki.org
// @description    In predictions page, hide lazy podcasters who haven't updated in more than a month
// @include        http://*amigofish.com/catcher/podcast/predictions*
// ==/UserScript==

var allLi = document.getElementsByTagName('li');
for (var i=1; i<allLi.length; i++) {
	if (allLi[i].textContent.match('(months|year) ago')) {
		allLi[i].parentNode.parentNode.parentNode.style.display = 'none';
	}
}