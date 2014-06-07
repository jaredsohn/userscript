// ==UserScript==
// @name           Remove XKCD posts from TDWTF forums
// @namespace      http://forums.thedailywtf.com/
// @description    Removes all posts linking to or displaying XKCD.
// @include        http://forums.thedailywtf.com/forums/*
// @author         MiffTheFox
// ==/UserScript==

/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	var i, j;
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function main(){
	var posts = getElementsByClass("ForumPostArea", null, "div");
	for (var i = 0; i < posts.length; i++){
		var content = getElementsByClass("ForumPostContentArea", posts[i])[0];
		if (containsXKCD(content)){
			var postTable = posts[i].getElementsByTagName("table")[1];
			var postHead = posts[i].getElementsByTagName("h4")[0];
			postTable.style.display = "none";
			postHead.style.display = "none";
			makeLink(posts[i], postTable, postHead);
		}
	}
}

function makeLink(post, postTable, postHead){
	var showDiv = document.createElement("h4");
	showDiv.className = "ForumPostHeader";
	var showLink = document.createElement("span");
	showLink.setAttribute("style", "color: white; border-bottom: 1px dotted white; cursor: pointer; font-style: italic;");
	showLink.appendChild(document.createTextNode("Post hidden due to XKCD reference.  Click to show."));
	showLink.addEventListener('click', function () {
		postTable.style.display = "block";
		postHead.style.display = "block";
		showDiv.style.display = "none";
	} , false)
	showDiv.appendChild(showLink);
	post.appendChild(showDiv);
}

function containsXKCD(node){
	var links = node.getElementsByTagName("a");
	var images = node.getElementsByTagName("img");
	var rx = /^http:\/\/([a-z0-9\-]+\.)?xkcd\.(com|net|org)\//i;
	var i;
	for (i = 0; i < links.length; i++){
		if (rx.test(links[i].href)) return true;
	}
	for (i = 0; i < images.length; i++){
		if (rx.test(images[i].src)) return true;
	}
	return false;
}

main();
