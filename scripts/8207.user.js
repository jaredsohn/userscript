// DirectLinker
// version 0.1
// 2007-03-28
// Copyright (c) 2007, Daniel Muenter
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          DirectLinker
// @namespace     http://feedbackfox.mozdev.org/
// @description   Changes sponsored link redirect to original link.
// @include       *
// ==/UserScript==
//
// -----------------------------------------------------------------------------

var links = content.document.links;
for(i in links) {
	var link = links[i];
	if(String(link).indexOf('=http:\/\/') != -1) {
		link.href = String(link).substring(String(link).indexOf('=http:\/\/')+1);
		link.textContent += link.textContent + ' (cleaned)';
	}
}