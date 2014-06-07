// ==UserScript==
// @name           SteamPressure for Steam
// @description    Adds links to SteamPressure to Steam pages.
// @version        0.1
// @namespace      http://steampressure.track7.org/
// @author         misterhaan
// @run-at         document-end
// @include        http://steamcommunity.com/id/*
// @include        http://steamcommunity.com/profiles/*
// @include        http://store.steampowered.com/app/*
// ==/UserScript==

var script = document.createElement("script");
script.type = "text/javascript";
script.src = "http://steampressure.track7.org/scripts/user.steam.js";
document.body.appendChild(script);
