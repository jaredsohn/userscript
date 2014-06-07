// ==UserScript==
// @name           Maximize Jeuxvideo.com (French videogamings)
// @namespace      
// @description    Maximize the videogamings on jeuxvideo.com (Any sizes supported)
// @include        http://www.jeuxvideo.com/gaming_live/*
// ==/UserScript==

/* Jeuxvideo.com is a great french website about videogames and stuff
   Unfortunately if you own a widescreen, their gaminglive videos aren't wide enough
   With this script you can resize any of their videos, you just have to set the values
   needed in the script before loading the page.
   
   Pick up your choice! Sky's the limit (actually your screen size is)
*/

////////////////////////
// Values to modify
var height = 800; // px
var width = 600;  //px
////////////////////////

// The script
var flashvid = document.getElementsByTagName('object')[0];

flashvid.width = height;
flashvid.height = width;