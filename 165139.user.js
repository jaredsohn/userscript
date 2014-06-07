// ==UserScript==
// @name          FiMFiction Always Mature
// @namespace     communistpancake.whyamiusingmynameforthis.fimfiction
// @description   Makes FiMFiction display mature, whether you're logged in or not.
// @include       http://*.fimfiction.net/*

// ==/UserScript==
var now = new Date();
var time = now.getTime();
time += (3600 * 1000) * 24 * 375; // expires in 1 year
now.setTime(time);
document.cookie="view_mature=true; expires=" + now.toGMTString() + '; path=/';