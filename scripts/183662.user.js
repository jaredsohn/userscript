// ==UserScript==
// @name            Hearthhead Reddit Tooltips
// @version         1.1
// @description     Adds tooltips to database links for Hearthhead.com on reddit
// @include         http://*reddit.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @copyright       Dmitry Narkevich
// ==/UserScript==


$(document).ready(function() {
// this doesn't seem to make a difference, even though setting the variable was suggested on the wowhead site
 //   unsafeWindow.wowhead_tooltips = { "colorlinks": true, "iconizelinks": true, "renamelinks": true };
   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('script');
   script.type= 'text/javascript';
   script.src= 'http://static.wowhead.com/widgets/power.js';
   script.async = true;
   head.appendChild(script);
})