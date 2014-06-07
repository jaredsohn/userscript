// ==UserScript==
// @name        youtube HTML5 FULLSCREEN
// @namespace   youtube html5
// @Credits     Alephredo
// @include     "http*://*youtube*"
// @include     "*youtube.com/*"
// @include     "*youtu.be/*"
// @include     "https://www.youtube.com/*"
// @exclude     "http://www.youtube.com/watch_popup?v="
// @version     1
// @grant none
// FIRST YOU HAVE TO ACTIVATE HTML5 ON YOUTUBE 
// go to: www.youtube.com/html5
// my personal web-page http://flatus-vocis.tumblr.com
// ==/UserScript==

javascript:
(function(){ var loc = window.location.href; 
if(loc.indexOf('http://www.youtube.com/watch?v=') == -1 || loc.indexOf('v=') == -1) 
    {  return; } 
    var vidID = loc.substr(loc.indexOf('v=') + 2, 11);
 window.location.href = 'http://www.youtube.com/watch_popup?v=' + vidID;
 })();