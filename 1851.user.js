/*
.nyud.net:8090 anonymous/proxy surfing

*/
// ==UserScript==
// @name          Nyud.Net surf
// @description	  replaces all links with their .nyud.net:8090 counterparts if your current location is a .nyud.net:8090 domain
// @include       http://*
// ==/UserScript==

(function() {

// only do this if we started on a .nyud.net:8090 site
if (!document.location.toString().match(new RegExp("^http://[^/]+.nyud.net:8090($|/)")))
	return;

es = document.getElementsByTagName("a");

for (var i = 0; i < es.length; i++)
{
	var href = es[i].href;

	if (!href) continue;
	htre = new RegExp("(http://)([^/]+)");
	// if there is no host name then create one from the pages address
	if (!href.match(htre))
	{
		var loc = document.location;

		if (!href['startsWith']) continue;

		if (href.startsWith("/"))
		{
			href = loc.replace(new RegExp("^(http://[^/]+).*$"), "$1") + href;
		}
		else
		{
			// strip filename off the end
			href = loc.replace(new RegExp("/[^/]+$"), "/") + href;
		}

	}

	href = href.replace(htre, "$1$2.nyud.net:8090");
	es[i].href = href;
}

})();
