// ==UserScript==
// @name           Open Source Music Randomizer
// @namespace      com.open.music
// @description    Random select the type of music at opensourcemusic.com
// @require        http://code.jquery.com/jquery-latest.min.js
// @require        http://demos.flesler.com/jquery/scrollTo/js/jquery.scrollTo-min.js
// @include        http://www.opensourcemusic.com/free-music-archive/
// ==/UserScript==

$(document).ready(function() {
  var types = $("table tr td ul li").length,
      randomType = Math.floor(Math.random() * types),
      chosenItem = $("table tr td ul li:eq(" + (randomType - 1) + ")");
  chosenItem.wrap("<div id='chosen' style='border:solid 2px red;'>");
  $("body").scrollTo("#chosen", 'slow');
});