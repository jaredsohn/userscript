// ==UserScript==
// @name            Google Reader Watcher Fix
// @version         1.0
// @author          TzAnAnY
// @description     Fix Google Reader Watcher Addon
// @include         https://www.google.com/reader/view/feed/*
// @updateVersion   1
// ==/UserScript==
(function() {
	var url, href, component;
	
	url = "https://www.google.com/reader/view/feed/";
	href = window.location.href;
	component = href.substr(url.length);
	//If Not Encoded => Encode And Change Location
	if(component.search("%") == -1) {
		//Add Component
		url += encodeURIComponent(component);
		//Change Location To The Fixed Location
		window.location.href = url;
	}
})();