// ==UserScript==
// @name           mlb.tv - zeit
// @namespace      mlb.tv
// @description    zoagt di zeit an
// @include        http://mlb.mlb.com/mediacenter/
// ==/UserScript==

var ifr = document.createElement('iframe');

ifr.src = "http://wwp.greenwichmeantime.com/time/scripts/clock-8/runner.php?tz=america_new_york";

ifr.style.width = "275px";
ifr.style.height = "150px";
ifr.scrolling = "no";
ifr.style.border = "none";
ifr.style.position = "absolute";
ifr.style.top = "100px";
ifr.style.left = "-2px";

document.body.appendChild(ifr);