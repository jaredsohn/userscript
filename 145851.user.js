// ==UserScript==
// @name        JavaZone Incognito Video Search
// @namespace   javazone.no/incognito
// @description Enhance the JavaZone sessions overview with links for searching for the videos on Vimeo.
// @include     http://javazone.no/incogito10/events/JavaZone*/sessions
//
//  Forcing sandboxed mode. Workaround for Greasemonkey issue 1614.
//  See
//   https://github.com/greasemonkey/greasemonkey/issues/1614
//   http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html
// @grant       GM_log
//
// @version     6
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @run-at document-end
// @downloadURL https://userscripts.org/scripts/source/145851.user.js
// ==/UserScript==

/*
 * Changelog
 * v6 - wrapping the inserted link in a div element
 * v5 - enabled secure automatic updates by specifying a HTTPS download URL in the metadata block
 * v4 - loading jQuery for the script with @require
 *    - forcing the script to run in sandboxed mode
 *    - now also works with Google Chrome through the Tampermonkey extension
 * v3 - added label for the video link
 *    - removed the Google icon
 * v2 - removed link for using the Vimeo search engine
 */

$(document).ready(function() {
    var overlay = $("#session-overlay-content");
    overlay.bind("DOMSubtreeModified", function() {
	if (overlay.find("a.vimeo-hack").get(0)) {
	    return;
	}
	var title = overlay.find("h2.session-details-title");
	var searchPhrase = encodeURIComponent(title.text());
	var vimeoSearchHtml = '<a target="_blank" style="color: white;" class="vimeo-hack" \
title="Search for the Video on Vimeo. Doesn\'t work as their search engine will search for any \
of the words and not the complete phrase. Try the Google link instead." \
href="http://vimeo.com/javazone/videos/search:' + searchPhrase + '/sort:date">\
Search for the video on Vimeo</a>';

	var googleSearchPhrase = encodeURIComponent("site:vimeo.com javazone ") + searchPhrase; 
	var googleSearchHtml = 'Video: <a target="_blank" style="color: white;" \
class="vimeo-hack" title="Use Google to search for the video on Vimeo." \
href="http://www.google.com/search?q=' + googleSearchPhrase + '">Search for the video on Vimeo</a>';
	var sessionUrl = overlay.find("div.session-url-reference");
        sessionUrl.append("<div>" + googleSearchHtml + /* " " + vimeoSearchHtml + */ "</div>");
    });

});
