// ==UserScript==
// @name          Google to Blingo
// @namespace     http://gid.rata.com
// @description   Forces a Blingo Search instead of a Google search
// @include       http://*.google.com/search*
// @include       http://*.google.com/images*
// ==/UserScript==

	var res = document.location.search.match(/(\?|&)q=([^&]+)/);
	if (res.length == 3)
	{
		var url = 'http://search.pch.com/search?q=' + res[2];
		GM_openInTab(url);
	}
