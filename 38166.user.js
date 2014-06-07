// ==UserScript==
// @name          Mods.de No-Smile
// @namespace     http://greasemonkey.ppopn.net
// @description   Setzt den Haken "Smilies deaktivieren" beim Postscreen
// @include       http://forum.counter-strike.de/bb/*
// @include       http://forum.cstrike.de/bb/*
// @include       http://82.149.226.131/bb/*
// @include       http://forum.mods.de/bb/*
// @exclude       http://forum.mods.de/bb/pm/*
// @exclude       http://my.mods.de/*
// ==/UserScript==

var haken = document.getElementsByName("post_disablesmilies");
var count = 0;
while (count < haken.length) {
    haken[count].checked = true;
    count++;
}
