// ==UserScript==
// @name          Battlefield P4F - Add Recent Posts
// @namespace     Xsear
// @description	  A tempoary fix for those of us who can't live without the "recent fourm posts" box.
// @author        Xsear
// @version       1.0
// @include       http://battlefield.play4free.com/*/
// @include       http://battlefield.play4free.com/*/
// ==/UserScript==
// Change this to 1 to insert the box below the other ones (normal). Otherwise, it will be inserted above the other boxes.
var insertAtBottom = 1;

// !! CAUTION !! 
// If you are going to edit the syndication URL, make sure to set "Feed Version" to "Atom 1.0"
// !! CAUTION !!

// Default - Entire forum
var syndUrl = 'http://battlefield.play4free.com/forum/syndication.php?type=atom1.0&limit=15';

// English Only
// var syndUrl = 'http://battlefield.play4free.com/forum/syndication.php?fid=21,7,6,2,25,265,30,3,31,20,28,29,22,23,14,11,18,19,10,9&type=atom1.0&limit=15';

/*
Below lurks an ugly piece of code. You should probably turn back.
-----------------------------------------------------------------
*/
GM_xmlhttpRequest({
	method: 'GET',
	url: syndUrl,
	onload: function(responseDetails) {
		var parser = new DOMParser();

		var responseFixed = responseDetails;

		// Fix borked response
		var bfhwebteamislulz = responseDetails.responseText.search("<div id=\"generic-error-container\" class=\"clearfix\">");
		if(bfhwebteamislulz != -1) {
			responseFixed = responseDetails.responseText.substr(0,bfhwebteamislulz);
		}

		// Parse fixed response
		var dom = parser.parseFromString(responseFixed,
		    "application/xml");
		var entries = dom.getElementsByTagName('entry');

		// Start building HTML
		var html = "<div class=\"bfhBox bfhBox-green bfhBox-has-splatter bfhBox-has-icon \"><div class=\"wrapper\"><a title=\"View your UserCP\" href=\"http://battlefield.play4free.com/en/forum/usercp.php\"><h2 class=\"bfhBox-heading\">UserCP</h2></a><div class=\"content clearfix\"><ul class=\"front-forum-list\">";

		// Add threads
		for (var i = 0; i < entries.length; i++) {
			html = html+'<li class="clearfix first"><a href="'+entries[i].getElementsByTagName('id')[0].textContent+'">'+entries[i].getElementsByTagName('title')[0].textContent+'</a><span class="nr-replies"></span></li>';
		}

		// Finish building HTML
		html = html+'</ul></div></div><div class="bg"><u class="w">&nbsp;</u><u class="e">&nbsp;</u><i class="w">&nbsp;</i><i class="e">&nbsp;</i><b class="w">&nbsp;</b><b class="e">&nbsp;</b></div><div class="icon icon-posts"></div><div class="splatter splatter-4"></div></div>';

		// Find the right place
		var a = document.getElementById("content").childNodes[1].childNodes[3];
		var b = a.getElementsByTagName("div");

		// Create the node
		var e = document.createElement('div');
		e.class = 'grid-row';
		e.innerHTML = html;

		// Insert!
		if(insertAtBottom == 1) {
			b[0].parentNode.appendChild(e);
		}
		else {
			b[0].parentNode.insertBefore(e,b[0].parentNode.firstChild);
		}
		
	}
});