// ==UserScript==
// @name         Google cache repair
// @author       @leungxh
// @include      http*://*/search?*
// @include      http*://www.googleusercontent.com/*
// @version      1.0
// ==/UserScript==
// Source        https://twitter.com/#!/leungxh

	(function() {
		var allLinks = document.links;
			if (allLinks != null) {
				for (i = 0; i <allLinks.length; ++i) {
					if (allLinks [i].href.indexOf ("http://webcache.googleusercontent.com") > -1) {
						allLinks [i].href = allLinks [i].href.replace ("http://webcache.googleusercontent.com", "https://www.ggssl.com/cache");
					}
					if (allLinks [i].getAttribute("onmousedown")!=null) {
						if (allLinks [i].getAttribute("onmousedown").indexOf ("rwt") > -1) {
							allLinks [i].setAttribute('onmousedown', '');
						}
					}
				}
			}
	}
	)();