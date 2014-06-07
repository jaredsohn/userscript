// ==UserScript==
// @name           Unstupid Netflix Browsing
// @author         Ben Gott
// @namespace      bengott
// @include        http://*.netflix.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

//Replace play links with details links (open in new tab) and remove the play button overlay image
$("a.popLink").each(function() {
  var newHref = $(this).attr("href").replace("WiPlayer?movieid=", "WiMovie/").replace("&trkid", "?trkid").split("&")[0];
  $(this).attr("href", newHref).attr("target", "_blank");
  $(this).removeClass("playLink");
});

//Remove non-hover play button overlay image on details page
$(".playOverlay")
  .css("background-image", "none")
  .hover(
    function() { $(this).css("background-image", ""); },
    function() { $(this).css("background-image", "none"); }
  );