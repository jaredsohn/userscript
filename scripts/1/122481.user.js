// ==UserScript==
// @name            TVSubtitles.net Direct Download
// @namespace       http://userscripts.org/users/411316
// @description     Makes links on TVSubtitles.net to go directly to the subtitles, instead of a download page.
// @include         http://*.tvsubtitles.net/tvshow-*
// @include         http://*.tvsubtitles.net/episode-*
// @include         http://tvsubtitles.net/tvshow-*
// @include         http://tvsubtitles.net/episode-*
// @author          Bits Scream
// @version         1.0.1
// ==/UserScript==

var favLanguage="en"

var links = document.getElementById('content').getElementsByTagName('a');
for (i=0; i<links.length; i++) {
	if (links[i].href.match('tvsubtitles.net/subtitle-')) {
		links[i].href = links[i].href.replace('/subtitle-', '/download-');
	}
	if (links[i].innerHTML.match('All episodes')) {
		links[i].href = links[i].href.replace('/episode-', '/download-').replace(/\.html/g, '-'+favLanguage+'.html');
	}
}

