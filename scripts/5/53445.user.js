// ==UserScript==
// @name           what.cd: bookmarks on artist page
// @namespace      http://what.cd
// @description    adds bookmark links to albums on artist.php
// @include        https://ssl.what.cd/artist.php*
// @include        http://*what.cd/artist.php*
// ==/UserScript==
	
var el = document.getElementsByTagName('a');
for(i=0; i<el.length; i++)
	if(/View Torrent/.test(el[i].title)) {
		var id = /\d+/.exec(el[i].href);
		var book = document.createElement('a');
		book.innerHTML = "[Bookmark]";
		book.href = "#";
		book.setAttribute('style', 'float:right;');
		book.setAttribute('onclick', "var xhr = new XMLHttpRequest(); xhr.open('GET','bookmarks.php?action=add&auth="+unsafeWindow.authkey+"&groupid="+id+"', true); xhr.send();this.innerHTML='[Bookmarked]';return false;");
		// ugly, i know. Bookmark() isn't defined here, unfortunately.
		el[i].parentNode.parentNode.children[2].appendChild(book);
		// remove parentNode.children[2] if you prefer it on the above line
	}