// ==UserScript==
// @name           New Google Ad-block
// @namespace      http://ineedattention.com/
// @description    Blocks the ad elements in new (experimental) Google search results pages
// @include        http://*.google.com/*
// ==/UserScript==

(function() {
	if (topad = document.getElementById('tads'))
	{
		document.getElementById('tads').style.display='none';
	}
	if (sidead = document.getElementById('rhs'))
	{
		document.getElementById('rhs').style.display='none';
		document.getElementById('center_col').style.marginRight='0px';
	}
})();