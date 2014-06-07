// ==UserScript==
// @name           KoC Clock HellBoy
// @namespace      http://userscripts.org/users/wulfric
// @description    Displays a small clock in armory.
// @include        http://www.kingsofchaos.com/*
// ==/UserScript==


var time_box = document.createElement('div');
time_box.setAttribute('style', 'position:fixed; bottom:10; right:10;');
time_box.innerHTML='<iframe src="http://free.timeanddate.com/clock/i1mzswsx/n34/fn17/fcfff/tct/pct" frameborder="0" width="91" height="19" allowTransparency="true"></iframe>';
document.body.insertBefore(time_box, document.body.firstChild);