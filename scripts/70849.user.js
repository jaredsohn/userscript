// ==UserScript==
// @name           Override phpBB Font
// @namespace      *
// @include        */viewtopic.php*
// ==/UserScript==


 for (var i = 0; i < document.getElementsByTagName("span").length; i++) 
    if(document.getElementsByTagName("span")[i].style.fontSize != "") document.getElementsByTagName("span")[i].style.fontSize = ""; 