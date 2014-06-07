// ==UserScript==
// @name           Vancouver Public Library Non-JS Links
// @namespace      http://userscripts.org/users/torqueo
// @description    Replaces silly Javascript page opening functions with proper links.
// @include        http://ipac*.vpl.ca/ipac20/*
// ==/UserScript==

var buildNewListRegExp=/^javascript:buildNewList\(\'([^\']+)\',.+\)$/;
for(i=0; i<document.links.length; i++) {
   if(document.links[i].href!=null) {
      var x = "";
      x = document.links[i].href.replace(buildNewListRegExp, "$1");
      x = decodeURIComponent(x);
      document.links[i].href=x;
   };
};