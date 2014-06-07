// ==UserScript==
// @name           hide nasa pesnicka
// @namespace      ..
// @include        http://www.priori-incantatem.sk/show.php*
// ==/UserScript==

var alltds = document.getElementsByTagName("td");
for (var i=0; i<=alltds.length; i++)
	{
		var atd = alltds[i].innerHTML;
		if (atd.indexOf('nasa_pesnicka') >= 0 && atd.indexOf('nasa_pesnicka') <= 100)
			{
				alltds[i].style.display="none";
				i = alltds.length;
			}
	}