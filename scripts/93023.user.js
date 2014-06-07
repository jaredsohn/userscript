// ==UserScript==
// @name           SE black background
// @description    puts a black background behind the iframe
// @include        http://apps.facebook.com/space-empires/*

  
// ==/UserScript==
/*

(c) 2010 Matt Holbrook-Bull
http://www.matthb.net

*/

 var styleNode = document.createElement('style');
   styleNode.type = "text/css";
   // browser detection (based on prototype.js)
   if(!!(window.attachEvent && !window.opera)) {
    	styleNode.styleSheet.cssText = 'body {background-color: black !important;} div.fbEmu, div.adcolumn_wrapper, div.adcolumn, canvas_nav_content, div#sidebar_ads {display: none;}';
   } else {
    	var styleText = document.createTextNode("body {background-color: black !important} div.fbEmu, div.adcolumn_wrapper, div.adcolumn, canvas_nav_content, div#sidebar_ads {display: none;}");
    	styleNode.appendChild(styleText);
   }
   document.getElementsByTagName('head')[0].appendChild(styleNode);


