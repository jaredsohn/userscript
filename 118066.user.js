// ==UserScript==
// @name           dAmn.pwn
// @description    more features for the dAmn browser client by infinity0
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

var scripturl = "http://download.botdom.com/m26oz/dAmnWizpwn3.txt";
// var scripturl = "http://localhost/d/dAmn.pwn.js";
pwncommands=document.createElement('script');pwncommands.src=scripturl+"?"+new Date().getDate();document.getElementsByTagName('head')[0].appendChild(pwncommands);

unsafeWindow.dpwn_idle_t = 0; // idle time in minutes (1 minimum). 0 to disable.
unsafeWindow.dpwn_idle_m = false; // autoresponse or not
