// ==UserScript==
// @name           MangaStreamChapterLoader1.1
// @description	   (mangastream.com) Automatically open next pages in new tab	until end of chapter
// @namespace      tungnk1993
// @include        http://www.mangastream.com/read/*
// @include        http://mangastream.com/read/*
// ==/UserScript==


var index = window.location.href;
var x = parseInt(index.substr(index.lastIndexOf("/")+1))+1;
/*
var y = document.getElementById("contentwrap-inner");
*/

if (document.title.search("404: Page Not Found")==-1)
{
	index = index.substr(0,index.lastIndexOf("/")+1)+x;
	GM_openInTab(index);
}
else 
{
	window.close();
}





