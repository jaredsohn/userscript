// ==UserScript==
// @name faveRAPE
// @namespace faveRAPE
// @description An experiment in collecting art.
// @include http://*.deviantart.com/
// @include http://my.deviantart.com*
// ==/UserScript==

var StRefTime = '3';  //==[Set time by seconds]
if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);
window.location = "http://www.deviantart.com/random/deviation";
document.getElementById('fave-form').submit;