// ==UserScript==
// @name           Guardian idiots
// @namespace      http://userscripts.org/users/sjorford
// @include        http://www.guardian.co.uk/
// ==/UserScript==

li = document.getElementsByTagName('li');
for (i = li.length - 1; i >= 0; i--) {
	if (li[i].innerHTML.indexOf('Zoe Williams') >= 0) {
		li[i].parentNode.removeChild(li[i]);
	}
}
