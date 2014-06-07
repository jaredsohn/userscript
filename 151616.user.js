// ==UserScript==
// @name ModHub - No Font
// @namespace http://rmrk.net
// @description Undoes coloured posts.
// @include http://modhub.org*
// @exclude 
// ==/UserScript==

var font_tags=document.getElementsByTagName("font");

for(var i=0; i<font_tags.length; i++) 
{
  font_tags[i].color = null;
}