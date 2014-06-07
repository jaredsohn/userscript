// 10pix.com direct images
// version 1..0
// created: 18 Oct 2006
// revised: 18 Oct 2006
// Copyright (c) 2006, neo_ch

// ==UserScript==
// @name			10pix.com direct images
// @author			Samuel Robyr			
// @namespace		http://morpheus.redirectme.net
// @description		Bypass the individual pages for images hosted by 10pic.com
// @include			http://*
// ==/UserScript==

// COMMENTS:

// EXAMPLES:
// link:  http://www.10pix.com/show.php/18871_alessiamerz79.jpg.html
// image: http://www.10pix.com/out.php/i18871_alessiamerz79.jpg

(function() {

	var links = windows.document.getElementsByTagName('a');
	
	for (var i=0; i<links.lenght; i++) {
		if (links[i].href.indexOf('10pix.com/') != -1) {
			var img = links[i].childNodes[0].getAttribute('src');
			links[l].href = img.replace('show.php/', 'out.php/i').replace('.jpg.html','.jpg');
		}
	}
	
})();
