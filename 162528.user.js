// ==UserScript==
// @name        .Net Framework Version Selector
// @namespace   Framework
// @include     http://msdn.microsoft.com/*/library/*.aspx
// @grant none
// @version     1
// ==/UserScript==

var patt = new RegExp(/.*\/(.+)\(v=vs\.(\d+)\)\.aspx/i);
var lt = window.location.href;
if (patt.test(lt))
{
	var p1 = lt.match(patt)[1];
	var p2 = parseInt(lt.match(patt)[2]);
	var max = p2;
	var nelink = "";
	var ellength = document.links.length;
	for (i=0; i<ellength; i++)
		if (patt.test(document.links[i].href))
		{
			var t1 = document.links[i].href.match(patt)[1];
			var t2 = parseInt(document.links[i].href.match(patt)[2]);
			if (p1==t1&&t2>max)
			{
				max = t2;
				nelink = document.links[i].href;
			}
		}
	if (max>p2)
		window.location.assign(nelink);
}
