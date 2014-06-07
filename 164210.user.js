// ==UserScript==
// @name        Tumblr Favorites
// @namespace   Myth0s
// @description Adds a link to tumblr profiles to conveniently browser their favorites
// @include     http://*.tumblr.com/
// @include	http://*.tumblr.com/page/*
// @grant       none
// @version     1.0
// ==/UserScript==

splitted = document.URL.split(".");
bname = splitted[0].substr(7, splitted[0].length);
document.getElementsByTagName("body")[0].innerHTML += "<a style='display: block; width: 10px; height: 10px; z-index: 999999; background: url(http://assets.tumblr.com/images/dashboard_controls_radar_button_like.png?alpha) no-repeat #222; padding: 5px; position: fixed !important; top: 5px !important; left: 5px!important; border-radius: 4px;' target='_top' href='http://www.tumblr.com/liked/by/"+bname+"'></a>";