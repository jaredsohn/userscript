// ==UserScript==
// @name        literotica
// @namespace   erotica
// @include     http://www.literotica.com/s/*
// @version     1
// @grant       none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

window.onload = function(){
	var getPages = document.getElementsByClassName('b-pager-caption-t r-d45')[0].innerHTML;
	var pages = getPages.substring(10,getPages.length-7);
	var pathName = document.URL;
	var newPathName;
	if(pathName.indexOf("?") != -1)
		{
			newPathName = pathName.split('?');
			newPathName = newPathName[0];
			window.location.replace(newPathName);
		}
	for(i=2;i<=pages;i++){
		$("div.b-story-body-x.x-r15").append("<p id='page"+i+"'></p>");
		var k = "#page"+i;
		newPath = pathName+"?page="+i;
		$(k).load(newPath+" .b-story-body-x.x-r15");
		}
		$( "div" ).remove( ".b-pager" );
}