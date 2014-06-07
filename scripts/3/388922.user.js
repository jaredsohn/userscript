// ==UserScript==
// @name        Scene search
// @namespace   fm
// @include     http*://what.cd/torrents.php?*id=*
// @version     1.0.0.0.0.1
// @grant       none
// ==/UserScript==

trow = document.getElementsByClassName("torrent_row");

for(var i = 0, l = trow.length; i < l; i++) {
	tr = trow[i];
	if(tr.textContent.match(/\/ Scene/)) {
		// push tr to trows array?
		
		// make search text
		var searchtext = document.getElementsByClassName("filelist_path")[i].innerHTML;
		var subsearchtext = searchtext.substring(1,searchtext.length-1)
		var googlesearch = ' / <a href="https://www.google.com/search?q=' + subsearchtext + '">Google Search</a>'
		
		// make link
		tra = tr.getElementsByTagName("a")[4]
		tra.outerHTML += googlesearch;
		}
	};