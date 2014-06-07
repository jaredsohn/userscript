// ==UserScript==
// @name           AntiWM
// @namespace      Travian
// @description    entfernt scheiss fussball tippspiel
// @include        http://*.travian.*
// ==/UserScript==

window.addEventListener('load', main, false);
function main()
{	var a = document.getElementsByTagName('a');
	for(var i=0;i<a.length;i++)
		if(a[i].href.search(/wm.php/g)!=-1)
			a[i].parentNode.removeChild(a[i]);
}