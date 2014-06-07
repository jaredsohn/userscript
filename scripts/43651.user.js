// ==UserScript==
// @name           Isohunt hash search link on torrentz.com
// @namespace      yogesh[DOT]mangaj[AT]gmail[DOT]com
// @description    Creates a link to isohunt hash-search link torrentz.com
// @include        http://*torrentz.com/*
// @include        http://*torrentz.eu/*
// @exclude        http://*torrentz.com/search*
// @exclude        http://*torrentz.eu/search*
// @date           2009-03-24
// @version        1.1
// @GM_version     0.6.7
// ==/UserScript==


var urldetails = window.location.href.split("/");

document.body.innerHTML = document.body.innerHTML.replace("torrent download locations", " » <a href=\"http://isohunt.com/torrents/"+ urldetails[3] +"\" target=\"_blank\" \">isoHunt <img src=\"http://isohunt.com/favicon.ico\" /></a>");
  