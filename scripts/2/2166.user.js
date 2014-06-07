/*
.nyud.net:8090 anonymous/proxy surfing

*/
// ==UserScript==
// @name          CoralCache - external images
// @description	  replaces all external images with their .nyud.net (CoralCache) counterparts if you are viewing the page through CoralCache.
// @include       http://*.nyud.net:8090/*
// @include       http://*.nyud.net:8080/*
// @include       http://*.nyud.net/*
// ==/UserScript==

//by Justin Ormont
// Feel free to reuse & modify this for any purpose.  Attribution to me (Justin Ormont) would be appreciated. 

(function() {

// make sure we're on a .nyud.net:8090 site
	if (
		!document.location.toString().match(new RegExp("^http://[^/]+.nyud.net:8090($|/)")) 
	&& 
		!document.location.toString().match(new RegExp("^http://[^/]+.nyud.net:8080($|/)"))
	&& 
		!document.location.toString().match(new RegExp("^http://[^/]+.nyud.net($|/)"))
	)
		return;


	es = document.evaluate( '//img[contains(@src, "")]', 
		document, 
		null, 
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		null);


	//alert("Length: " + es.snapshotLength); 

	for (var i = 0; i < es.snapshotLength; i++)
	{
		var thisLink = es.snapshotItem(i);
		var src = thisLink.src;
	
		if (!src) continue;

		// if the image source already has .nyud.net:8090 in it, skip it
		if (src.indexOf(".nyud.net/") != -1 || src.indexOf(".nyud.net:8090") != -1 || src.indexOf(".nyud.net:8080") != -1) continue;

		htre = new RegExp("(http://)([^/]+)");
		// if there is no host name then create one from the pages address
		if (!src.match(htre))
		{
			/* 
			// No need to do this, as we're already at *.nyud.net and therefore /blah.png will load from nyud.net.
			var loc = document.location;
	
			if (!src['startsWith']) continue;
	
			if (src.startsWith("/"))
			{
				src = loc.replace(new RegExp("^(http://[^/]+).*$"), "$1") + src;
			}
			else
			{
				// strip filename off the end
				src = loc.replace(new RegExp("/[^/]+$"), "/") + src;
			} 
			*/
		}
		else {
			src = src.replace(htre, "$1$2.nyud.net");
			thisLink.src = src;
		}
	
		
	}
})();




