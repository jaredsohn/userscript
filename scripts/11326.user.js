// ==UserScript==
// @name           leftclick
// @namespace      *
// @include        *
// ==/UserScript==

var anchors = document.getElementsByTagName( 'a' );
for (var i=0; link=document.links[i++];) 
  link.setAttribute('target','_blank');
