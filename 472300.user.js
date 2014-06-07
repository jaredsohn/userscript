// ==UserScript==
// @name        WebM direct video looper
// @namespace   http://userscripts.org/
// @description Loops single open WebM videos
// @include     http://*/*.webm
// @include     https://*/*.webm
// @include     file://*/*.webm
// @version     1
// @grant       none
// ==/UserScript==

document.getElementsByTagName("video")[0].setAttribute("loop", "true");