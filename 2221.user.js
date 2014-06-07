// ==UserScript==
// @name Google Copy URL
// @description Make it possible to copy a personalized search link's URL on google.com.
// @include http://*.google.com/search*
// @include http://google.com/search*
// ==/UserScript==
var dl = unsafeWindow.document.links;
var el; for(var i = 0; el = dl[i]; i++) {
	var oldhref = el.href;
	if(!el.onmousedown) continue;
	el.onmousedown();
	el.onmousedown = null;
	var newhref = el.href;
	el.href = oldhref;
	(function(newhref) {
	el.onclick = function() {
		window.location = newhref;
		return false;
	}
	})(newhref);
}