// ==UserScript==
// @name           KoB Ticking Clock
// @namespace      http://userscripts.org/
// @include        http://kob.itch.com/*
// @exclude        http://kob.itch.com/
// @exclude        http://kob.itch.com/login.cfm
// @exclude        http://kob.itch.com/login.cfm?publish
// ==/UserScript==
function renewTime(){
var d = new Date();
document.getElementsByTagName("strong")[2].innerHTML = d.toTimeString.substring(0, 8);
window.setTimeout(renewTime,1000);
}
renewTime();