// ==UserScript==
// @name       Disable UI animations on Twitter.com
// @namespace  http://peterc.org/
// @version    0.1
// @description  It disables UI animations on Twiter.com
// @include    https://twitter.com/*
// @copyright  2012, Peter Cooper
// ==/UserScript==

setInterval("jQuery.fx.off = true", 1000);