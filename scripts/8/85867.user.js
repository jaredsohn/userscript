// ==UserScript==
// @name           sxephil channel Favicon
// @namespace      http://phillyd.tv
// @version        1.0
// @description    Replaces the FastPassTV favicon.
// @include        http://www.youtube.com/user/sxephil*
// @include        https://www.youtube.com/user/sxephil*
// ==/UserScript==

(function(d, h) {
	// Create this favicon
	var ss = d.createElement('link');
	ss.rel = 'shortcut icon';
	ss.type = 'image/x-icon';
	ss.href = 'data:image/x-icon;base64,R0lGODlhEAAQANUAAEhIRvOuBaqZhPvVW/3959vIqA4LCfzQA5N9OONxK/z8+LOPfbyqfWdcUdbTzsyxZa6PXsyjJ6VyASEYDWxQDiwqKdSuSP7+3kkwANnUt5aIdEY6NJRkGvXx0renjpWBOs3Bp31sWpEyBs/NtKWokj4YAsqfJ8+sKdC+KCkiHn19ff352u3ivntjDdHm3LzCtsC2lb61qre5wOfhzPPhwM5vR9DFKXkeAP3hBryPC/qpY/vmnwMKIfj22P///wAAACH5BAAAAAAALAAAAAAQABAAAAa9QEoL8SF+jsgjhIGRmCKmE+pksqEikdMD1gwEDoHJb5zDgS1MyZcz/m3GE1wA3Rw8DA3WiAAy/FoDdBwEPAAXHgICMAU/PAoxTCEOPykpBikbAjRjFzIeJSQvY5geGgUhYw0OAiUcChU/DRcEBCN+KS4jCyUiOhUVIQodIAIZPwA7Nbs3CRsNISsrGRokYwYQuyIJDT8FHT0zPm0GAKy3Pxo+6m/WACpi1j8gBGJ+Y+5t8XD2P3j5+QYCAgwCADs=';
	// Remove any existing favicons
	var links = h.getElementsByTagName('link');
	for (var i=0; i<links.length; i++) {
		if (links[i].href == ss.href) return;
		if (links[i].rel == "shortcut icon" || links[i].rel=="icon")
			h.removeChild(links[i]);
	}
	// Add this favicon to the head
	h.appendChild(ss);
	// Force browser to acknowledge
	var shim = document.createElement('iframe');
	shim.width = shim.height = 0;
	document.body.appendChild(shim);
	shim.src = "icon";
	document.body.removeChild(shim);

})(document, document.getElementsByTagName('head')[0]);