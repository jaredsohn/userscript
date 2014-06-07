// ==UserScript==
// @name       Humble Critic
// @namespace  https://github.com/campey/humblecritic
// @version    0.1
// @description  Put metacritic search link in the gameinfo when viewing Humble Library on humblebundle.com
// @match      https://www.humblebundle.com/*
// @copyright  2012+, David Campey
// @require http:////ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
$gameinfo = $("div.row div.gameinfo");
$gameinfo.each(function(index) {
    title = encodeURIComponent($(this).find(".title").text());
    title = title.replace(/%20/g,"+"); // to match meta-critic's style, not essential
    $(this).append("<div class='metacritic subtitle'><a href='http://www.metacritic.com/search/game/"+ title + "/results' style='text-decoration: underline;' target='_blank'>Metacritic search</a></div>");
});