// ==UserScript==
// @name        instapaper mobile v1
// @namespace   nowhere_fun
// @include     *
// @version     0.1
// ==/UserScript==

var touchDelay = null;
if ( window.self === window.top ) {
	if ( document.getElementsByTagName('body').length > 0 && window.location.href.indexOf("www.instapaper.com") == -1 ) {
		var touchBody = document.getElementsByTagName('body')[0];
		touchBody.addEventListener("touchstart", function(e) {
			if ( e.touches.length == 3) {
				clearTimeout(touchDelay);
				touchDelay = setTimeout(function() {
					if ( confirm("Format with instapaper?") ) {
						window.location.href='http://www.instapaper.com/text?u='+encodeURIComponent(window.location.href);
					}
				}, 250);
			}
		}, true);	
	}
}