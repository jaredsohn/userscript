// ==UserScript==
// @name           Facebook in School
// @description    Fixar så att Facebook fungerar utan problem och krångel i skolan, i Firefox. Skapad av IT 3:an, JB Borås.
// @include        *facebook.com*
// @version        1.0
// ==/UserScript==

var url = window.location.href;

if (url.match("http://"))
{
	window.location.href = url.replace("http://", "https://");
}
var elms = document.getElementsByTagName('a');
for (var i = 0; i < elms.length; i++)
{
	if (elms[i].href.match("facebook.com"))
	{
		elms[i].href = elms[i].href.replace("http://", "https://");
	}
}