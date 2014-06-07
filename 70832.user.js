// ==UserScript==
// @name           OGame Cancel Research from any Planet
// @description    Fixes the bug in OGame v0.84 which prevents research from being canceled from any planet
// @namespace      Vess
// @version        1.00
// @date           2010-03-08
// @include        http://uni*.ogame.*/game/index.php?page=buildings&*&mode=Forschung*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if ((document.location.href.indexOf ("/game/index.php?page=buildings") == -1) ||
            (document.location.href.indexOf ("mode=Forschung") == -1))
		return;
	var bxx = document.getElementById ("bxx");
	if (bxx == null)
		return;
	var script = bxx.parentNode.getElementsByTagName ('script') [0].innerHTML;
	if (script.match (/\"\>.+\<\/a\>\"/) != null)
		return;
	var cp = script.match (/cp=\d+/g) [1];
	var dropdown = document.getElementById ("header_top").getElementsByTagName ("select") [0].getElementsByTagName ("option");
	var planetName;
	for (var i = 0; i < dropdown.length; i++)
	{
		if (dropdown [i].value.indexOf (cp) != -1)
		{
			planetName = dropdown [i].textContent;
			planetName = planetName.replace (/\s+\[[0-9:]+\]/, "");
		}
	}
	script = script.replace (/(unbau=\d+&mode=Forschung&cp=\d+\"\+)/gi, "$1" + '">' + "Cancel research on " + planetName + '</a>"');
	script = script.replace (/window\.onload=t;/, "t ();");
	var node = document.createElement ('script');
	node.innerHTML = script;
	document.body.appendChild (node);
}
)();
