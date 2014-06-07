// ==UserScript==
// @name           Remove Help and Logout
// @namespace      pendevin
// @description    Removes the Help and Logout links from the menubar
// @include        http://endoftheinter.net*
// @include        http://boards.endoftheinter.net*
// @include        http://archives.endoftheinter.net*
// @include        https://endoftheinter.net*
// @include        https://boards.endoftheinter.net*
// @include        https://archives.endoftheinter.net*
// ==/UserScript==

var menubar=document.getElementsByClassName('menubar')[0];
var links=menubar.getElementsByTagName('a');
for(var i=links.length-1;i>=0;i--){
	if(links[i].pathname=='/index.php/Help:Rules'||links[i].pathname=='/logout.php'){
		menubar.removeChild(links[i].previousSibling);
		menubar.removeChild(links[i]);
	}
}