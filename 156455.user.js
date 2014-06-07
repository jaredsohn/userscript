// ==UserScript==
// @name        Google Jump Remove
// @namespace   http://www.zhouxiongzhi.net/post/40501975141/resolve-google-connection-reset-by-fucking-gfw
// @description Remove Google Search Url Jump
// @include     http://www.google.com.hk/search*
// @include     https://www.google.com.hk/search*
// @grant       none
// @version     2
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	// Note, jQ replaces $ to avoid conflicts.
	jQ('li.g>div>h3>a').removeAttr('onmousedown');
}

// load jQuery and execute the main function
addJQuery(main);
