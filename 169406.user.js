// ==UserScript==
// @name           Troll Script for YouTube
// @namespace      
// @description    redirects youtube to an image of a troll. 
// @include        http://*.youtube.com/*
// @version        1.2
// ==/UserScript==

document.getElementById("logo-container").href = "/index_ajax";
 if (document.location.href == "http://www.youtube.com/" || document.location.href == "http://youtube.com/") {
  document.location = "http://carryingthegun.files.wordpress.com/2012/09/personal_trollface_hd.png"; }