// ==UserScript==
// @name           Refreshcbox
// @namespace      daksweirdtest.cbox.ws/
// @include        http://www4.cbox.ws/box/?boxid=3745779&boxtag=2pphlw&sec=main
// ==/UserScript==
function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true);",timeoutPeriod);}
var timernum = (Math.floor(Math.random()*10000) + 10000);
timedRefresh(timernum);