// ==UserScript==
// @name           Faster TWSE MarketChart Reload
// @namespace      Faster TWSE MarketChart Reload
// @include        http://mis.twse.com.tw/Quotes/MarketChart
// Author: Steven chang
// ==/UserScript==
//version 20081022

// is the refresh rate adjustment in seconds
location.href = "javascript:void(window.speed = 11)";
// expected time to download the picture file.  must be a smaller number than the "speed"
location.href = "javascript:void(window.rcnt = 5)";
