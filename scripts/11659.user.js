// ==UserScript==
// @name           Searchable Album Art
// @namespace      http://freecog.net/2007/
// @description    Places the filenames of the images on Jason Dunn's album art page underneath them so that you can search for specific artists and albums using the Find tool.
// @include        http://www.jasondunn.com/albumart/
// @include        http://www.jasondunn.com/albumart/index.html
// ==/UserScript==

GM_addStyle([
	".thumb-container {",
		"display: bock;",
		"float: left;",
		"width: 148px;",
		"height: 195px;",
		"overflow: hidden;",
		"margin: 3px;",
		"text-decoration: none !important;",
	"}",
	".thumb-container img {",
		"margin: -4px;",
		"margin-bottom: 0",
	"}",
	".thumb-container:hover {",
		"background-color: inherit",
	"}" //,
].join('\n'));

for (var i = 0, j = document.images.length; i < j; i++) {
	var img = document.images[i];
	var text = document.createTextNode(img.title.replace(/_|\.jpg$/g, ' '));
	img.parentNode.appendChild(text);
	img.parentNode.className = 'thumb-container';
}