// ==UserScript==
// @name			Trac: Display image attachments in tickets
// @description		Display image attachments in Trac tickets.
// @namespace		http://xtina.dreamwidth.org
// @author			Xtina Schelin
// @include			http://*/trac/*/ticket/*
// @include			http://trac.*/ticket/*
// ==/UserScript==

// Acceptable images.  Must be 4 characters long.
var extz = new Array(".gif", ".png", ".jpg", "jpeg", ".bmp");

if (attachments = document.getElementById('attachments')) {
	attachments = attachments.getElementsByTagName("a");
	for (var i = 0; i < attachments.length; i++) {
		attachment = attachments[i];
		src = attachment.href;
		if (extz.indexOf(src.substr(-4)) > -1) {
			var image = document.createElement("div");
			image.innerHTML = '<img style="max-width:620px;" src="' + src + '?format=raw" /><br />';
			attachment.parentNode.insertBefore(image, attachment);
		}
	}
}
