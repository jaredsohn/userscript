// ==UserScript==
// @name           General Bux Script - Countdown Addon
// @namespace      cwt.stalker
// @email          cwt.stalker@gmail.com
// @description    Destroy Countdowns for General Bux Script
// @version        0.03
// @include        http://*view*.php*
// @include        http://*adclick.php*
// @include        http://*Paidadlink.php*
// ==/UserScript==

var site=document.domain;
if (site.match(/www./g)){var site=site.replace('www.', '');}
document.location.href="javascript:startClock();startClock();startClock();startClock();startClock();startClock();startClock();startClock();startClock();startClock();startClock();startClock();startClock();startClock;startClock();startClock();startClock();startClock();startClock();startClock();startClock();startClock();startClock();startClock();startClock();startClock();startClock();startClock();startClock();startClock()";
document.frm.clock.value=1;
if (site != 'foxcash.net'){
unsafeWindow.x = 1;
}

var i, v = document.getElementsByTagName('iframe');
for(i= v.length-1;i >= 1; i-- ) {
 v[i].parentNode.removeChild(v[i]);
}

