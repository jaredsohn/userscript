// ==UserScript==
// @name           IMDb friends iSOHUNT (or other torrent search)
// @namespace      http://userscripts.org/scripts/show/41603
// @description    Adds a direct link to iSOHUNT (or another) search engine just below the movie title on IMDb
// @include        http://*.imdb.com/title/tt*/reference
// @grant          none
// ==/UserScript==

var site_name = "KickassTorrents";
var query_url = "http://kickass.to/search/{query}/?field=seeders&sorder=desc";

query_url = query_url.replace('{query}', escape(document.title.substring(0, document.title.indexOf('(')-1)));
document.getElementsByTagName("h1")[0].innerHTML += (
  "<span style='font-size:13px;'><a href='" + query_url + "'>" +
    "<img src='" + query_url.substring(0, 7 + query_url.substring(7).indexOf('/')) + "/favicon.ico'/>" +
      "Find @ " + site_name +
  "</a></span>");
