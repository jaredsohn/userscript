// ==UserScript==
// @name        YouTube Ad Remover
// @namespace   http://gh4ck3r.com
// @description Ad remover for YouTube
// @include     http://www.youtube.com/watch?*
// @require	http://code.jquery.com/jquery-1.8.0.min.js
// @version     1
// @grant	null
// ==/UserScript==

$(function() {
     $("div#watch-channel-brand-div").remove();
});