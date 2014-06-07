// ==UserScript==
// @name           deviantART mod
// @namespace      empty
// @description    Modification of deviantART
// @include        *.deviantart.com/*
// ==/UserScript==

var gmiList = document.getElementsByName("gmi-GZone");
if (gmiList.length > 0)
gmiList[4].style.display = "none";

var pageAd = document.getElementsByName("gmi-ResourcePageAd");
if (pageAd.length > 0)
pageAd[0].style.display = "none";

var adCloseButton = document.getElementById("gmi-ResourcePageMetaPane").getElementsByTagName("a");
if (adCloseButton.length > 0)
adCloseButton[0].style.display = "none";