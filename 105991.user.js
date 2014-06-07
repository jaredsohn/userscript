// ==UserScript==
// @name Z8Games Forum - No Colours
// @namespace http://rmrk.net
// @description Undoes coloured posts.
// @include http://forum.z8games.com/showthread.php*
// @exclude 
// ==/UserScript==

var font_tags=document.getElementsByTagName("font");

for(var i=0; i<font_tags.length; i++) 
{
  font_tags[i].color = null;
}