// ==UserScript==
// @name           Travian refreasher
// @URL            http://userscripts.org/scripts/show/46767
// @version        1.01
// @author         Sune^
// @description    Automatically refresh Travian
// @include        http://*.travian.*/*
// ==/UserScript==

delay=60;

timer=null;
startTimer=function(){timer=window.setTimeout(function(){window.location.reload();}, delay*1000);};
stopTimer=function(){window.clearTimeout(timer);};
restartTimer=function(){stopTimer(); startTimer();};

startTimer();