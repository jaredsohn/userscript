// ==UserScript==
// @name          LJ Plus Account Slicer
// @namespace     http://www.eternalbloodlust.com/
// @include       http://livejournal.com/*
// @include       http://*.livejournal.com/*
// @description   Removes ads on Sponsored+ Account blogs and other ads around the site!
// @exclude
// ==/UserScript==

(function() {
	var frames = document.getElementsByTagName('iframe');
	var divs = document.getElementsByTagName('div');
	
	remove = document.getElementById('PortalAdBox');
	if (remove) remove.style['display'] = 'none';
	
	// loop thru the iframe tags and set them not to show
	for (y = 0; y < frames.length; y++) {
		if (frames[y].id.indexOf("adframe") != -1) frames[y].style['display'] = 'none';
	}
	
	// Now search for all divs in the class "ljad"
	for (y = 0; y < divs.length; y++) {
		if (divs[y].className.indexOf("ljad") != -1) divs[y].style['display'] = 'none';
	  	if (divs[y].className.indexOf("ljadbadge") != -1) divs[y].style['display'] = 'none';
	  	if (divs[y].className.indexOf("ljadskyscraper") != -1) divs[y].style['display'] = 'none';
	}
})();
