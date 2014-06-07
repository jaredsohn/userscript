// ==UserScript==
// @name           Blip.fm upload link everywhere
// @description    Adds upload link to top right of every page of blip.fm
// @namespace      http://thinlight.org/
// @include        http://blip.fm/*
// ==/UserScript==

window.addEventListener('load', function(e) {
	var profileLink = document.getElementById('whoami');
	if (profileLink) {
		var link = document.createElement('a');
		link.innerHTML = 'Upload';
		link.href = 'http://blip.fm/settings/upload';
		link.style.fontWeight = 'bold';
		link.style.fontSize = '11px';
		link.style.color = '#FFFFFF';
		link.style.backgroundColor = '#366FAD';
		link.style.padding = '2px 4px';
		link.style.marginRight = '5px';
		profileLink.parentNode.insertBefore(link, profileLink.nextSibling);
	}
}, false);
