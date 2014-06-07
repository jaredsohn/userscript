// ==UserScript==
// @name					NoLinks
// @description		Removes references to the links in the menubar
// @namespace			pendevin
// @include				http://endoftheinter.net*
// @include				http://boards.endoftheinter.net*
// @include				http://archives.endoftheinter.net*
// @include				https://endoftheinter.net*
// @include				https://boards.endoftheinter.net*
// @include				https://archives.endoftheinter.net*
// ==/UserScript==

var menubar=document.getElementsByClassName('menubar')[0];
var links=menubar.getElementsByTagName('a');
for(var i=links.length-1;i>=0;i--){
	if(links[i].hostname=='links.endoftheinter.net'||links[i].pathname=='/lsearch.php'){
		menubar.removeChild(links[i].nextSibling);
		menubar.removeChild(links[i]);
	}
}
