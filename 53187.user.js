// ==UserScript==
// @name           what.cd: bookmarks: download and remove
// @namespace      http://what.cd
// @description    Rewrite [DL] behaviour to download the torrent and remove it
// @include        https://ssl.what.cd/bookmarks.php*
// @include        http://what.cd/bookmarks.php*
// ==/UserScript==

var t = document.getElementsByTagName('a');
var regi = new RegExp("\\d+");
for(i=0; i<t.length; i++) {
	if (t[i].title == "Download") {
		t[i].setAttribute('onclick', 'Remove_Bookmark('+regi.exec(t[i+1].href)+');');
	}
}