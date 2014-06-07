// ==UserScript==
// @name           Auto Refresh
// @URL            
// @version        
// @author         
// @description    Automatically refresh Travian
// @include        http://*.travian.*/*
// ==/UserScript==

delay=300;

timer=null;
startTimer=function(){timer=window.setTimeout(function(){window.location.reload();}, delay*1000);};
stopTimer=function(){window.clearTimeout(timer);};
restartTimer=function(){stopTimer(); startTimer();};

startTimer();