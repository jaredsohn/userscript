// ==UserScript==
// @name          Weather.gov favicon
// @namespace     http://design.aqueo.us
// @description	  Restore the favicon to weather.gov forecasts
// @author        Doug
// @include       http://forecast.weather.gov/*
// @version       1.0
// ==/UserScript==

;(function() {
	var heads = document.getElementsByTagName('head');
	if (heads.length > 0) {
		var node = document.createElement('link');
		node.rel = 'shortcut icon';
		node.href = 'http://www.weather.gov/favicon.ico';
		heads[0].appendChild(node);
	}
})();
