// ==UserScript==
// @name           Skip header on Manga Fox
// @author         Andreas Jung (sd-daken.deviantart.com)
// @description    Skips the header on Manga Fox when reading a manga. (i.e. jumps down to the manga page...)
// @namespace      http://www.w3.org/1999/xhtml 
// @include        http://*.mangafox.com/manga/*
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//

var l = window.location.href;
var hash = "";

if ( document.getElementById("image") ) {
   hash = "image";
}
else if ( document.getElementById("mangaview") ){
   hash = "mangaview";
}

if ( l.indexOf('#') == -1 ) {
   window.location.replace(l + '#' + hash);
}

//This is needed so that the chat button works
var chat = document.getElementById("chat");
var tools = document.getElementsByClassName("tool")[0];

if ( !chat && tools) {
   chat = tools.getElementsByClassName("chat")[0];
   if ( chat ) {
      chat.setAttribute("href", "javascript:void(checkFrame())");
   }
}

if ( chat ) {
   chat.addEventListener("click", function() { 
      window.setTimeout( 
         function() {
            if (window.location.hash.indexOf("?chat") != -1) {
               window.location = window.location.toString().replace(window.location.hash, "") + "?chat";
         }
      },1000)
   }, false);
}