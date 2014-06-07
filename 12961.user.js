	// ==UserScript==
	// @name		  Unembed
	// @namespace	  http://neugierig.org/software/greasemonkey
	// @description	  Adds a download link to embedded movies
	// @include		  *
	// ==/UserScript

	// based on code by Evan Martin
	// published here with his gracious permission

	var arEmbed = document.getElementsByTagName('embed');
	for (var i = arEmbed.length - 1; i >= 0; i--) {
		var elmEmbed = arEmbed[i];
		var elmLink = document.createElement('a');
		elmLink.href = elmEmbed.src;
		elmLink.appendChild(document.createTextNode('[download]'));
		elmEmbed.parentNode.insertBefore(elmLink, elmEmbed.nextSibling);
	}