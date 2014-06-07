/*
 * Title:
 * 	snap.icio.us
 * 
 * Author:
 *      Abhinav Sarkar 
 * based on Vasco Flores fav.icio.us2
 * 
 * Last Updated:
 * 	  2006-10-20
 */
// ==UserScript==
// @name snap.icio.us
// @namespace	http://abhin4v.myinfo.ws/
// @description	A script to add thumbnails previews to the links posted on del.icio.us 
// @include	http://del.icio.us/*
// @exclude	http://del.icio.us/rss/*
// ==/UserScript==


/* based in fav.icio.us2 2006-07-06 by Vasco Flores
 * namespace http://vasco.flores.googlepages.com/
 */

(function(){
// apply the function to each element found by the path
function forEachMatch(path, f) {
	var matches = document.evaluate(
		path, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < matches.snapshotLength; i++)
		f(matches.snapshotItem(i));
}


// adds the thumbnail preview of the site
function add_thumbnail(link) {
	var thumb = document.createElement('img');
	thumb.src = "http://images.websnapr.com/?url=" + link.href;
	thumb.style.display = "none";
	thumb.style.position = "absolute";
	thumb.style.zIndex = "5";
	thumb.style.border = "2px solid green";
	thumb.style.padding = "3px";
	thumb.style.backgroundColor = "white";
	thumb.alt = "Thumbnail is in queue.";
	link.parentNode.insertBefore(thumb, link);
	link.addEventListener("mouseover", show_thumb, false);
	link.addEventListener("mouseout", hide_thumb, false);
	link.addEventListener("mousemove", show_thumb, false);
}

//shows the thumbnail on mouseover
function show_thumb(event) {
	event.target.previousSibling.style.left = (event.layerX + 7) + "px";
	event.target.previousSibling.style.top = (event.layerY + 7) + "px";
	event.target.previousSibling.style.display = "block";
}

//hides the thumbnail on mouseover
function hide_thumb(event) {
	event.target.previousSibling.style.display = "none";
}

// apply to all recent links, popular and your bookmarks	
forEachMatch(
	"//li[@class='post']/h4[@class='desc']/a | "+
	"//div[@class='hotlist']/div[@class='links']/ol/li/h4/a",
	add_thumbnail);
	

}())

