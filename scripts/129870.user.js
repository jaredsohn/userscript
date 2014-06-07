// ==UserScript==
// @name           proPl
// @namespace      Sylver
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

var results =  document.getElementById("menuTable").getElementsByClassName("menubutton ");	

for(var i = 0; i < results.length; i++)
{
	if (results[i].href.indexOf("index.php?page=defense") > 0 || results[i].href.indexOf("index.php?page=trader") > 0)
	{
		document.getElementById("menuTable").removeChild(results[i].parentNode);
	}
}