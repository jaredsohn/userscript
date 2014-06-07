// ==UserScript==
// @name	  Google Images Url Changer
// @by            Simon Smith			
// @namespace     http://userscripts.org/scripts/show/48679
// @description   Changes Googles Images Url images.google.com to www.google.com/images
// @version       0.6
// @include       http://*images.google.com/*
// ==/UserScript==
          

         
if(window.location.search.indexOf("images") == 1) {
window.location = window.location.replace(/^images/, 'www.');
}