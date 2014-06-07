// ==UserScript==
// @name        YouTube Go Straight To User Uploads On Profile Link (Grid View)
// @namespace   http://userscripts.org/
// @description Go straight to the list of recently uploaded videos when clicking a user's name, using grid view.
// @include     *://www.youtube.com*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$(document.body).delegate("a", "mouseover", function(){
   $(this).attr('href', $(this).attr('href').replace(/\/user\/([a-zA-Z0-9_-]+)\?feature\=(.*)/, "/user/$1/videos?flow=grid&view=0"));
   $(this).attr('href', $(this).attr('href').replace(/\/user\/([a-zA-Z0-9_-]+)$/, "/user/$1/videos?flow=grid&view=0"));
   $(this).attr('href', $(this).attr('href').replace(/\/channel\/([a-zA-Z0-9_-]+)\?feature\=(.*)/, "/channel/$1/videos?flow=grid&view=0"));
   $(this).attr('href', $(this).attr('href').replace(/\/channel\/([a-zA-Z0-9_-]+)$/, "/channel/$1/videos?flow=grid&view=0"));
});