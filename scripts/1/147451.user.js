// ==UserScript==
// @name        facebook he
// @namespace   facebook.com
// @description סידור יישור לימין בתגובות
// @include     http://facebook.com/*
// @include     https://facebook.com/*
// @version     1
// ==/UserScript==
document.getElementsByClassName("left-aligned-text").style.textAlign = "right";
document.getElementsByClassName("left-aligned-text").style.direction="rtl";