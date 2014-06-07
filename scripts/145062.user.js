// ==UserScript==
// @id             twitchtvdirectorytweaks@phob.net
// @name           Twitch.TV Directory Tweaks
// @version        0.15
// @namespace      phob.net
// @author         wn
// @description    My tweaks to the Twitch.TV directory pages
// @include        http://*.twitch.tv/directory
// @include        http://*.twitch.tv/directory/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/145062.meta.js
// ==/UserScript==

var main = document.getElementById("mantle_skin").getElementsByClassName("main")[0]
  , wrapper = main.getElementsByClassName("wrapper")[0]
  , dirChannels = document.getElementById("directory_channels");

main.style.width = "auto";
wrapper.style.width = "auto";
dirChannels.style.width = "80%";
