// ==UserScript==
// @name            TVSubtitles.net Direct Download
// @namespace       http://userscripts.org/people/14536
// @description     Makes links on TVSubtitles.net to go directly to the subtitles, instead of a download page.
// @include         http://*.tvsubtitles.net/tvshow-*
// @include         http://*.tvsubtitles.net/episode-*
// @include         http://tvsubtitles.net/tvshow-*
// @include         http://tvsubtitles.net/episode-*
// @author          Vaughan Chandler
// @version         1.0.1
// ==/UserScript==

// Version 1.0.1 - released on 2010-08-17

var links = document.getElementById('content').getElementsByTagName('a');
for (i=0; i<links.length; i++) {
	if (links[i].href.match('tvsubtitles.net/subtitle-')) {
		links[i].href = links[i].href.replace('/subtitle-', '/download-');
	}
}