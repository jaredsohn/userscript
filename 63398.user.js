// ==UserScript==
// @name           4chan Usage Timer
// @namespace      MC3craze
// @include        http://*
// @description    Lets you block others from using your firefox
// ==/UserScript==

// Create "GTFO" screen
var gtfoscreen = document.createElement("div");
with (gtfoscreen.style) {
    position = "fixed";
    zIndex = "1000";
    left = "0px";
    top = "0px";
    width = "100%";
    height = "100%";
    backgroundColor = "red";
    color = "black";
    textAlign = "center";
    visibility = "hidden";
}
gtfoscreen.innerHTML = '<div style="font-family: sans-serif; font-size: 100pt">GTFO</div>\
<div style="font-family: serif; font-style: italic; font-size: medium">Click for settings</div>';
document.body.appendChild(gtfoscreen);
