// ==UserScript==
// @name        Imgur Side Panel Fixed Position
// @namespace   http://localhost
// @description Keeps the navigation Panel and Stats box in view while scrolling on Imgur.com
// @include     http://imgur.com/*
// @version     1
// ==/UserScript==

var navigationThumbs = document.getElementsByClassName('navigation-thumbs')[0];
var statsBox = document.getElementById('statsbox');

if(navigationThumbs){
    navigationThumbs.style.position = "fixed";
};
if(statsBox){
    statsBox.style.position = "fixed";
    statsBox.style.top = "308px";
};