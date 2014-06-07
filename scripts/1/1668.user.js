// ==UserScript==
// @name           Tradera "watch with Remindera" links
// @namespace      http://henrik.nyh.se
// @description    Adds a link to Tradera auctions, to watch that auction with the auction reminder web service Remindera (http://henrik.nyh.se/remindera). The link appears in the "Auktionsinformation" box. Clicking the link will land you on Remindera with the auction URL pre-filled. Enter your e-mail address and select when to be alerted, then press the big yellow button.
// @include        http://www.tradera.com/auction/*
// ==/UserScript==

var links = document.getElementsByTagName("a");

for (var i = 0; i < links.length; i++) {  // Loop through links

	var link = links[i];  // Current link
	
	if (link.href.indexOf("/trader/trader_memorylist_add.aspx?aid=") != -1) {  // If this is the "Lagg till i minneslista" link...
		
		// Create a link to Remindera
		var rLink = document.createElement('a');
		rLink.href = 'http://henrik.nyh.se/remindera/?auction=' + window.location.href;
		rLink.target = '_blank';  // Comment out this line if you don't want to open Remindera in a new window/tab
		rLink.appendChild(document.createTextNode('Bevaka med Remindera'));
		
		// Cool icon
		var img = document.createElement('img');
		img.src = 'http://henrik.nyh.se/remindera/favicon.ico';
		
		// Create and populate table cells
		var td = document.createElement('td');
		td.appendChild(img);
		var td2 = document.createElement('td');
		td2.appendChild(rLink);
		
		// Create and populate table row
		var tr = document.createElement('tr');
		tr.appendChild(td);
		tr.appendChild(td2);
		
		// Insert table row

		// I would like to insert it before "Lagg till i din minneslista", but
		//   link.parentNode.parentNode.parentNode.insertBefore(tr, link.parentNode.parentNode);
		// makes Firefox hang :O

		link.parentNode.parentNode.parentNode.appendChild(tr);

	}

}
