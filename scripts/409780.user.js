// ==UserScript==
// @name        Yesplan Artiesteningang
// @namespace   dnk-yesplan-artiesten
// @include     https://denieuwekolk.yesplan.nl/Yesplan*
// @version     1.0.3
// @downloadURL https://userscripts.org/scripts/source/409780.user.js
// @updateURL   https://userscripts.org/scripts/source/409780.meta.js
// ==/UserScript==

function reloadTimer(){
    document.location="https://denieuwekolk.yesplan.nl/Yesplan";
    setReloadTimer();}

function setReloadTimer(){
    var time = new Date();
    var wait=28-time.getHours();
    wait*=60;
    wait+=59-time.getMinutes();
    wait*=60;
    wait+=59-time.getSeconds();
    wait*=1000;
    setTimeout(function(){reloadTimer();},wait);}

$(document).ready(function(){
setReloadTimer();
$("nav#nav-main").hide();
$("div.sidepanel").hide();
});