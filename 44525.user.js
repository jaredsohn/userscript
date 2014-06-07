// ==UserScript==
// @name Free Slideshare!
// @author Stephen Paul Weber
// @namespace http://singpolyma.net/
// @version 0.1
// @description  Install and then use SlideShare as normal, only without the flash.
// @include http://*.slideshare.net/*
// ==/UserScript==

if(typeof(unsafeWindow) == 'undefined') {
	this.unsafeWindow = window;
}

function init() {
	if(unsafeWindow.slideshare_object && unsafeWindow.slideshare_object.presentationId) {
		var mobileURL = 'http://m.slideshare.com/show.php?currentslide=1&slideid=' + unsafeWindow.slideshare_object.presentationId;
		document.getElementById('svPlayerId').innerHTML = '<object type="text/html" data="'+mobileURL+'" style="width:100%;height:100%;border-width:0px;">This should be a frame.</object>';
	}
}

unsafeWindow.addEventListener('load', init, false);
