// ==UserScript==
// @name           Memrise Preview & Auto-Grow Buttons
// @description    Adds two new buttons to every Memrise level screen.  The Preview button will let you look at the details for each thing in the current level.  This is helpful if you want to modify a mem without waiting to be tested on a specific thing.  THe Auto-Grow button allows you to skip the planting phase for 5 words at a time.  Each word will move directly to the watering phase.  No points will be awarded.
// @match          http://www.memrise.com/course/*/*/
// @version        1.0
// @updateURL      https://userscripts.org/scripts/source/174602.meta.js
// @downloadURL    https://userscripts.org/scripts/source/174602.user.js
// @grant          none
// ==/UserScript==

var onLoad = function($) {
  $(".things-header").prepend('<a href="garden/auto_grow/" class="btn btn-icos-active btn-small roundy pull-left" accesskey="a"><i class="ico ico-bolt"></i>Auto-Grow</a>');
  $(".things-header").prepend('<a href="garden/preview/"   class="btn btn-icos-active btn-small roundy pull-left" accesskey="p"><i class="ico ico-look"></i>Preview</a>');
};

var injectWithJQ = function(f) {
	var script = document.createElement('script');
	script.textContent = '$(' + f.toString() + '($));';
	document.body.appendChild(script);
};
injectWithJQ(onLoad);