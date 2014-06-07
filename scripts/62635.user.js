// ==UserScript==
// @name            Kill the mouse
// @description     Remove annoying mouseover events.
// @include         *
// @exclude         http://goallineblitz.com*
// ==/UserScript==

(function() {
	var H=["mouseover","mouseout","unload","resize"];
	if(document.addEventListener)
		for(j in H)
			document.addEventListener(H[j],function(e){e.stopPropagation();},true);
})();