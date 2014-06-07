// ==UserScript==
// @name        New window for Bigstock Lightboxes
// @namespace   http://www.bigstockphoto.com/
// @include     http://*.bigstockphoto.com/*
// @version     1
// ==/UserScript==

(function(){
	var elements = document.getElementsByClassName('trial_upgrade_now');
	
	for(var i = 0; i < elements.length; i++){
			elements[i].innerHTML = '';
	}
})();