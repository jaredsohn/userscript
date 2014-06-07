// ==UserScript==
// @name           TDWTF shorten sidebar links
// @namespace      http://userscripts.org/users/43736
// @description    Shorten "Side Bar WTF" links on main TDWTF site
// @include        http://thedailywtf.com/*
// @include        http://*.thedailywtf.com/*
// ==/UserScript==

/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */ 

var MAX_LENGTH = 22; // Length of link text before cutting off.

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
	var sidebars = getElementsByClass("CommonSidebarArea", null, "div");
	for (var i = 0; i < sidebars.length; i++){
	
		// Verify Side Bar WTF
		var sbHeader = getElementsByClass("CommonSidebarHeader", sidebars[i], "div")[0];
		if (!sbHeader) continue;
		var sbHeaderLink = sbHeader.getElementsByTagName("a")[0];
		if (!sbHeaderLink) continue;
		if(sbHeaderLink.getAttribute("href") != "http://forums.thedailywtf.com/forums/18/ShowForum.aspx") continue;
		
		// Get links
		var sbContent = getElementsByClass("CommonSidebarContent", sidebars[i], "div")[0];
		if (!sbContent) continue;
		var sbLinks = sbContent.getElementsByTagName("a");
		
		// Loop to shorten link
		for (var j = 0; j < sbLinks.length; j++){
			var linkText = sbLinks[j].innerHTML;
			sbLinks[j].title = linkText;
			if (linkText.length > MAX_LENGTH){
				var newText = linkText.substring(0, MAX_LENGTH) + "...";
				sbLinks[j].innerHTML = newText;
			}
		}
	}
}

try {
	main();
} catch (ex) {
	alert("Error occured:\n" + ex);
}
