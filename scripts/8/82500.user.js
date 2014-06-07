// ==UserScript==
// @name           Colorful Twistar
// @namespace      http://moco.nond.es/
// @description    Like Favotter.net tweet color and remove ads, for Twistar.cc.
// @version        0.0.4.20100803
// @include        http://twistar.cc/*
// ==/UserScript==
(function () {
	var css = [
		'div#ad_468_60 {'
			,'display: none;'
		,'}'
		,'#timeline a.name {'
			,'color: #333;'
		,'}'
		,'#timeline div.status a {'
			,'color: #0386e7;'
		,'}'
		,'#timeline li.r1 div.status {'
			,'color: #333;'
		,'}'
		,'#timeline li.r2 div.status {'
			,'color: #090;'
		,'}'
		,'#timeline li.r3 div.status {'
			,'color: #609;'
		,'}'
		,'#timeline li.r4 div.status {'
			,'color: #609;'
		,'}'
		,'#timeline li.r5 div.status {'
			,'color: #f00;'
		,'}'
	].join('');

	var style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));
	document.getElementsByTagName('head')[0].appendChild(style);
})();