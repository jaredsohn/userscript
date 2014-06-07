// ==UserScript==
// @name           Remove Rounded Corners
// @namespace      meezlemozz
// @description    Removes those rounded corners from facebook profile images to make lawrence ryerson davis IV happy
// @include        http://*.facebook.com/*
// ==/UserScript==
var style = ".UIRoundedImage_CornersSprite{display:none}"

var yourTag=document.createElement('style');
yourTag.innerHTML = style;
document.getElementsByTagName('head')[0].appendChild(yourTag);