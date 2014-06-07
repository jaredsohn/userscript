// ==UserScript==
// @name           Remove Facebook Like buttons
// @namespace      http://userscripts.org/users/useridnumber
// @description    Remove Facebook Like buttons
// @include        http://* 
// ==/UserScript==

var fblike = document.getElementsByTagName("iframe");

if(fblike) {
  for(i=0;i<fblike.length;i++){ 
    if ((fblike[i].src.search("http://www.facebook.com/plugins/like.php") != -1) || (fblike[i].src.search("http://www.facebook.com/widgets/like.php") != -1)) fblike[i].parentNode.removeChild(fblike[i]);
  } 
}