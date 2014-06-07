/*
 * Title:
 * 	Freddie's wallpaper direct linker
 *  Author:
 *      Abhinav Sarkar
 * 
 * Last Updated:
 * 	  2006-08-25
 */
// ==UserScript==
// @name              freddie's wallpaper direct linker
// @namespace	http://abhin4v.myinfo.ws/
// @description	A script to direct link the images in Freddie's wallpaper gallery
// @include	http://wp.madcowdisease.org/gp*
// @exclude	
// ==/UserScript==


(function(){

// apply the function to each element found by the path
function forEachMatch(path, f) {
	var matches = document.evaluate(
		path, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < matches.snapshotLength; i++)
		f(matches.snapshotItem(i));
}

//connect thumbnails direct to picture
function directLink(link) {
	link.href = link.href.replace(/\/gp/, "");
}
// apply to all recent links, popular and your bookmarks
forEachMatch(
	"//div[@class='thumbnail']/div/a",
	directLink);
}())