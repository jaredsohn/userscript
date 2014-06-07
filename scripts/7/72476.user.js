// ==UserScript==
// @name          Reddit - Permanent Orange Envelope
// @namespace     http://www.reddit.com
// @description	  Makes your new messages envelope permanently orange. Usually to be used as a prank.
// @include       http://*.reddit.com/*
// ==/UserScript==


(function() {

var imgs = document.getElementsByTagName("img");

for(var i=0; i < imgs.length; i++){
	if(imgs[i].src == 'http://www.reddit.com/static/mailgray.png') {
		imgs[i].src = '/static/mail.png';
		break;
	}
}
})();


