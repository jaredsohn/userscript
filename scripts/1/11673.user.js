// ==UserScript==
// @name           Project Playlist Downloadable Links
// @include        http://www.projectplaylist.com/musicsearch*
// ==/UserScript==
var fonts = document.evaluate("//font[@color='green']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var font, i;
for (font = null, i = 0; (font = fonts.snapshotItem(i)); i++) {
	var test = document.createElement('a'); 
	test.setAttribute('href',font.firstChild.nodeValue);
	test.innerHTML = font.firstChild.nodeValue; 
	font.innerHTML = '';
	font.appendChild(test);
}