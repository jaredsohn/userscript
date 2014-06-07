// ==UserScript==
// @name          LOR user-side account comments
// @description   LOR user-side account comments
// @exclude http*://*linux.org.ru/forum/*/
// @exclude http*://*linux.org.ru/news/*/
// @exclude http*://*linux.org.ru/gallery/*/
// @exclude http*://*linux.org.ru/polls/*/
// @include http*://*linux.org.ru/forum/*/*
// @include http*://*linux.org.ru/news/*/*
// @include http*://*linux.org.ru/gallery/*/*
// @include http*://*linux.org.ru/polls/*/*
// @grant GM_log
// ==/UserScript==
//
// License: GNU GPL v3 or later
// Copyright (C) 2014 shutdown
//
// The JavaScript code in this page is free software: you can
// redistribute it and/or modify it under the terms of the GNU
// General Public License (GNU GPL) as published by the Free Software
// Foundation, either version 3 of the License, or (at your option)
// any later version.  The code is distributed WITHOUT ANY WARRANTY;
// without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
//
// As additional permission under GNU GPL version 3 section 7, you
// may distribute non-source (e.g., minimized or compacted) forms of
// that code without the copy of the GNU GPL normally required by
// section 4, provided you include this license notice and a URL
// through which recipients can access the Corresponding Source.
//
////////////////////////////////////////////////////////////////////////////////

var jq;
if (typeof(GM_log) == 'function') {
	// For FF, Mozilla (with greasemonkey sandbox)
	jq = unsafeWindow.$;
} else {
	// For Epiphany, Opera
	jq = $;
}

////////////////////////////////////////////////////////////////////////////////

var comments = {
	"maxcom":      "Администратор",
};

var commentColor = "#eeeeee";

////////////////////////////////////////////////////////////////////////////////

var escapeHTML = function(text) {
	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

jq('a[itemprop="creator"]').each(function() {
	var element = jq(this);
	var comment = comments[element.text()];
	if(comment !== undefined) {
		comment = escapeHTML(comment); // Delete this if you want raw-html in comments
		element.parent().append('<span style="color: '
		                              + commentColor
		                              + '"> '
		                              + comment
		                              + '</span>');
	}
});
