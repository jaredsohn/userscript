// ==UserScript==
// @name       Wallbase one-click downloader
// @version    1.3
// @description  Donwload wallbase's wallpaper with just one click
// @match      http://wallbase.cc/wallpaper/*
// @copyright  2013+, Yabes
// ==/UserScript==

wallpaperLink = document.getElementsByClassName("wall")[0].src;
simlinkNode   = document.getElementsByClassName("simlink")[0];

dlNode = document.createElement("a");
dlNode.className = "simlink";
dlNode.innerText = "Download";
dlNode.title     = "Download this wallpaper";
dlNode.href      = wallpaperLink;
dlNode.download  = "";

simlinkNode.parentNode.appendChild(dlNode);