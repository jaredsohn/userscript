// ==UserScript==
// @name Z8Games Forum - Default Fonts
// @namespace http://modhub.org
// @description Sets all the fonts to the default.
// @include http://forum.z8games.com/showthread.php*
// @exclude 
// ==/UserScript==

var font_tags=document.getElementsByTagName("font");

for(var i=0; i<font_tags.length; i++) 
{
  font_tags[i].face = null;
  font_tags[i].size = null;
}