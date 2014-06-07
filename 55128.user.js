// ==UserScript==
// @name          Israblog Non-JS Links
// @namespace     http://userscripts.org/users/36343
// @description	  Replaces silly Javascript page opening functions with proper links on Israblog, an Israeli blogging site. Changes blog opening links on navigation pages and comments link on blog pages.
// @include       http://israblog.nana10.co.il/*
// ==/UserScript==

var showCommentsRegExp=/^javascript:showComments\((\d*),(\d*)\)$/;
var goToBlogRegExp=/^javascript:goToBlog\((\d*)\)$/;
for(i=0; i<document.links.length; i++) {
   if(document.links[i].href!=null) {
      document.links[i].href=
         document.links[i].href.replace(
            goToBlogRegExp,
            "http://israblog.nana10.co.il/blogread.asp?blog=$1");
      document.links[i].href=
         document.links[i].href.replace(
            showCommentsRegExp,
            "http://israblog.nana10.co.il/comments.asp?blog=$1&user=$2");
   };
};

