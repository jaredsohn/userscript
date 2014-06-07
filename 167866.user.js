
// ==UserScript==
// @name           Target+
// @namespace      http://afrog.in/
// @description    Rewrites alls target attibutes for A elements to _self
// @include        *
// ==/UserScript==

var hrefs = document.getElementsByTagName('a');
for (i=0; i<hrefs.length; i++)
{
  hrefs[i].target = '_self';
}