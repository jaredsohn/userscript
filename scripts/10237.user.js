// ==UserScript==
// @name          VSUNoFade
// @namespace     http://ultra.iblogger.org
// @description   Get rid of fading on Video StumbleUpon
// @include       http://video.stumbleupon.com/*
// ==/UserScript==

function donothing(e) {  }

unsafeWindow.dimAll = donothing;
