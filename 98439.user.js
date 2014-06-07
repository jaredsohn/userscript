// ==UserScript==
// @name        Facebook_Gallery_Fix
// @namespace	http://www.facebook.com/
// @author      Wojciech Dlubacz
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://facebook.com/*
// @include     https://*.facebook.com/*
// @version     0.5.1
// ==/UserScript==

(function() {

var script = document.createElement('script'); 
script.type = "text/javascript"; 
script.innerHTML = (<><![CDATA[

if(!!document.domain.toLowerCase().match(/(^|\.)facebook\..*/)) {
	letsJQuery();
}

function letsJQuery() {
	window.setTimeout(letsJQuery, 100);
	delete PhotoTheater;
	PhotoTheater = {};
	PhotoTheater.bootstrap = function(link, event){
		event.preventDefault();
		event.stopPropagation();
		window.location = link;
	};
}

]]></>).toString();
document.getElementsByTagName('head')[0].appendChild(script);
})();