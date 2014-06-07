// ==UserScript==
// @name           YouTube Better Background
// @namespace      YouTube
// @description     Turns the white eyedestroying background into the nice and soothing fuzzy gray background.
// @include        *youtube.com/watch?*
// @include        *youtube.com/*
// @include      http*://apis.google.com/*
// @include      http*://plus.googleapis.com/*
// @version        3.3
// @Author         ssimon98
// ==/UserScript==

// Append global style
var globalstyle = document.createElement('link');
globalstyle.rel = 'stylesheet';
globalstyle.type = 'text/css';
globalstyle.href = 'https://dl.dropboxusercontent.com/u/161626803/Gray%20Background.css';
document.getElementsByTagName('head')[0].appendChild(globalstyle);
