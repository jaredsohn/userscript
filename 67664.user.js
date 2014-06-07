// ==UserScript==
// @name           ComaTool Favicon Fix
// @include        http://coma.gameforge.de/*
// ==/UserScript==

function removeLinkIfExists()
{
	var links = document.getElementsByTagName("head")[0].getElementsByTagName("link");
	for (var i=0; i<links.length; i++)
	{
		var link = links[i];
		if (link.rel=="shortcut icon")
		{
			document.getElementsByTagName("head")[0].removeChild(link);
			return;
		}
	}
}

function addLink(iconURL)
{
	var link = document.createElement("link");
	link.type = "image/x-icon";
	link.rel = "shortcut icon";
	link.href = iconURL;
	removeLinkIfExists();
	document.getElementsByTagName("head")[0].appendChild(link);
}

addLink("http://www.gameforge.de/favicon.ico");