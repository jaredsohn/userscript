/*
 * Title:
 * 	LJ: kill font tag colours
 * 
 * Author:
 *      John Morton
 * 
 * Last Updated:
 * 	  2006-11-24
 */

// ==UserScript==
// @name LJ: kill font tag colours
// @namespace http://angrymonkey.net.nz/
// @description Strips the color attribute from font tags.
// @include http://*.livejournal.com/*
// @exclude 
// ==/UserScript==

var font_tags=document.getElementsByTagName("font");

for(var i=0; i<font_tags.length; i++) {
  font_tags[i].color = null;
}
