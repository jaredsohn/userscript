// ==UserScript==
// @name           Takeback Twitter
// @namespace      jmcnally.twit
// @description    Removes promoted adds, make social networking social again.
// @include        http://twitter.com
// @include        http://www.twitter.com
// ==/UserScript==





setInterval("var allHTMLTags = new Array();var allHTMLTags=document.getElementsByTagName('li');for (i=0; i<allHTMLTags.length; i++) {if (allHTMLTags[i].className.indexOf('promoted') >= 0) {allHTMLTags[i].style.display='none';}}", 5000);
