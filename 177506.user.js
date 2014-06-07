// ==UserScript==
// @name        IMDB for TheTVDB
// @description Put links to IMDB on TheTVDB
// @namespace   thetvdb.com
// @include     http://*thetvdb.com/*
// @author      John Woods
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js
// @version     0.0.1
// ==/UserScript==

$(document).ready(function() {
  // Add imdb link just after:
  // #fanart td h1
  var showName = $("#fanart td h1");
  var imdbId   = $("input[name=IMDB_ID]");
  var url      = 'http://www.imdb.com/title/' + imdbId.val();
  showName.after('<div id="imdb"><a href="'+url+'">IMDB</a></div>');
});
