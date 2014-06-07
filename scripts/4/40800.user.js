// ==UserScript==
// @name           Kill TOG Background
// @namespace      http://www.theoldergamers.com/forum/members/basie.html
// @description    Tries to remove background images on the TOG site to avoid Firefox scroll bug
// @include        http://www.theoldergamers.com/*
// ==/UserScript==

var bodyTag = document.getElementsByTagName( "body" );
if( bodyTag.length > 0 ) {
  bodyTag[0].style.backgroundImage = "none";
}
