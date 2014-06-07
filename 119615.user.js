// ==UserScript==
// @name           Old YouTube Homepage Layout
// @namespace      
// @description    A Temporary fix for the latest "upgrade" of the youtube homepage. 
// @include        http://*.youtube.com/*
// @version        1.2
// ==/UserScript==

document.getElementById("logo-container").href = "/index_ajax";
 if (document.location.href == "http://www.youtube.com/" || document.location.href == "http://youtube.com/") {
  document.location = "http://www.youtube.com/index_ajax"; }