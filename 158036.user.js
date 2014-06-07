/*
.nyud.net:8090 anonymous/proxy surfing

*/
// ==UserScript==
// @name          CoralCache - Surf
// @description	  replaces all links with their .nyud.net (CoralCache) counterparts if you are viewing the page through CoralCDN.
// @author      Justin Ormont, steve dp, Volkan K.
// @licence     GNU General Public License version 3 or any later version; https://www.gnu.org/licenses/gpl-3.0.html
// @copyright   2005-2010 Justin Ormont, 2005 steve dp, 2012-2013 Volkan K.
// @include       http://*.nyud.net:8090/*
// @include       http://*.nyud.net:8080/*
// @include       http://*.nyud.net/*
// ==/UserScript==

// Based on original userscripts by Justin Ormont, steve dp and Volkan K.
// Feel free to reuse & modify this for any purpose.  Attribution to us would be appreciated. 

(function() {

// make sure we're on a .nyud.net site
	if (
		!document.location.toString().match(new RegExp("^http://[^/]+.nyud.net:8090($|/)")) 
	&& 
		!document.location.toString().match(new RegExp("^http://[^/]+.nyud.net:8080($|/)"))
	&& 
		!document.location.toString().match(new RegExp("^http://[^/]+.nyud.net($|/)"))
	)
		return;

es = document.getElementsByTagName("a");

for (var i = 0; i < es.length; i++)
{
	var href = es[i].href;

	if (!href) continue;

	// if the link href already has .nyud.net:8090 in it, skip it
	if (href.indexOf(".nyud.net/") != -1 || href.indexOf(".nyud.net:8090") != -1 || href.indexOf(".nyud.net:8080") != -1) continue;

	htre = new RegExp("(http://)([^/]+)");
	// if there is no host name then create one from the pages address
	if (!href.match(htre))
	{
		/* 
		// No need to do this, as we're already at *.nyud.net and therefore /blah.htm will load from nyud.net.
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
		*/
	} 
	else {

		href = href.replace(htre, "$1$2.nyud.net");
		es[i].href = href;
	}
}

})();
