// ==UserScript==
// @name           ThePirateBay.org - Cleaner
// @description    Removes Ads And Trash From Pirate Bay
// @include        http://www.thepiratebay.org/*
// @include        http://thepiratebay.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @author         Christopher Haines
// @namespace      http://chrishaines.net
// @version        1.0
// ==/UserScript==

var SeedSort = true; //sort by seeds
var DeleteZeroSeeds = false; //remove torrents with 0 seeds

$("#details > a > img").parent().remove();
$("body > br, #topright, #sky-right, #sky-banner, #ad, #foot, h3:first").remove();

if (window.location.href.search('/search/') != -1) {
  $("#content > div[align='center']").insertBefore("#SearchResults").clone().insertAfter("#SearchResults");
  $("#SearchResults").replaceWith($("#searchResult"));

  if (window.location.href.search('/99/') != -1 && SeedSort) {
    window.location.href = window.location.href.replace("/99/", '/7/');
  }
} else if (window.location.href.search('/user/') != -1) {
  $("#searchResult > tbody > tr:last > td:last[colspan='9']").wrapInner("<div align='center'></div>").children("div:first").insertBefore("#content").clone().insertAfter("#content");
  $("#content").replaceWith($("#searchResult"));
}

if (DeleteZeroSeeds) {
  $("#searchResult > tbody > tr").filter(function() {
    return ($(this).children(":last-child").prev().text() == '0');
  }).each(function() {
    $(this).remove();
  });
}