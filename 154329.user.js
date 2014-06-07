// ==UserScript==
// @name       YouTube Playlist
// @namespace  TechTubeCentral
// @version    1.1
// @description  Auto redirects user to uploader playlist video page. <b>New<a/b> now works in chrome!
// @run-at  document-start
// @include http://*youtube.com/watch?v=* 
// @exclude http://*youtube.com/watch?v=*&list=UL 
// ==/UserScript==

var theurl = document.URL;
window.location.href = (theurl + "&list=UL");