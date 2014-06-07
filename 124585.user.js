// ==UserScript==
// @name          Quickmeme Unblocker
// @version       0.1.0
// @description   Removes invisible overlay on meme images
// @author        Cody Brocious
// @namespace     daeken
// @license       MIT
// @include       http://*.quickmeme.com/meme/*
// @homepage      http://userscripts.org/scripts/show/124585
// @updateURL     http://userscripts.org/scripts/source/124585.user.js
// ==/UserScript==
(function() {
	var top = document.getElementById('leftside');
	window.console.log(top);
	if(top == null)
		return;
	var elems = top.getElementsByTagName('img');
	for(var i in elems) {
		var elem = elems[i];
		if(elem.style.display == 'block')
			top.removeChild(elem);
	}
})()