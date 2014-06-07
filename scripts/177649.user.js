// ==UserScript==
// @name        OpenSubtitles Direct download link
// @namespace   OpenSubtitles.org
// @description Skip the extra OpenSubtitles video player page changing links to direct download on search results page
// @include     http://www.opensubtitles.org/*
// @icon			http://i.minus.com/ibueSRgIeQ0fDT.png
// @author			TinyButStrong
// @version     0.1
// @grant       none
// ==/UserScript==

var dls = document.getElementsByTagName('a');
for (var i = 0, dl; dl = dls[i]; i++) {
	dl.href = dl.href.replace(window.location.hostname+'/pb/subtitleserve','dl.opensubtitles.org/pb/download');	
}