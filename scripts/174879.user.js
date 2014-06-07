// ==UserScript==
// @name           Memrise Timer Disabler
// @description    Disables the Timer on watering & gardening levels in Memrise.com
// @match          http://www.memrise.com/course/*/garden/*
// @version        0.1.1
// @updateURL      https://userscripts.org/scripts/source/174879.meta.js
// @downloadURL    https://userscripts.org/scripts/source/174879.user.js
// @grant          none
// ==/UserScript==

var onLoad = function($) {
  $("div.garden-timer div.txt").bind("DOMSubtreeModified", function() {
    MEMRISE.garden.timer.cancel();
  });
};

var injectWithJQ = function(f) {
	var script = document.createElement('script');
	script.textContent = '$(' + f.toString() + '($));';
	document.body.appendChild(script);
};
injectWithJQ(onLoad);