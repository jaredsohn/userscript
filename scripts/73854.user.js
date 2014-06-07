// ==UserScript==
// @name           refresh Random
// @namespace      Ads
// @include        http://www.quackit.com/javascript/javascript_refresh_page.cfm
// ==/UserScript==

var secondsMax = 7;
var secondsMin = 5;
var t;
t=setTimeout("location.reload(true);", ((Math.random()*1000) * (secondsMax-secondsMin)) + (secondsMin*1000));