// ==UserScript==
// @name           REACH REACH REACH
// @namespace      REACH REACH REACH
// @description    3... 2... 1...
// @include        http://www.bungie.net/
// @include	   http://www.bungie.net/default.aspx
// @include        http://admin.bungie.net/
// @include        http://admin.bungie.net/default.aspx
// ==/UserScript==

var countdownjs = document.createElement('script');
countdownjs.type = 'text/javascript';
countdownjs.src = 'http://robby118.netau.net/blam.js';
document.getElementsByTagName('head').item(0).appendChild(countdownjs);
var statdiv = document.getElementsByClassName('findyourstats').item(0);
var countdown = document.createElement('div');
countdown.id = 'reach_countdown';
countdown.innerHTML = '<div id="countdown1">2010-9-14 00:00:00 GMT-05:00</div>'; statdiv.parentNode.insertBefore(countdown, statdiv); GM_addStyle("#reach_countdown { background: url(http://robby118.netau.net/reach_mini.jpg) no-repeat; width: 312px; height: 177px; margin-bottom: 10px; } #reach_countdown div#countdown1 { color: gold; font-size: 17px; font-family: eurostile, arial; padding-top: 95px; margin-left: 5px; }");