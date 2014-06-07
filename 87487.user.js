// ==UserScript==
// @name           Travian random time refresher
// @version        1.00
// @author         exolosar
// @description    Automatically refresh Travian in random intervals (8-10 minutes)
// @include        http://*.travian.*/*
// ==/UserScript==

delay=500;

var randomnumber=Math.floor(Math.random()*101)

timer=null;
startTimer=function(){timer=window.setTimeout(function(){window.location.reload();}, (delay+randomnumber)*1000);};
stopTimer=function(){window.clearTimeout(timer);};
restartTimer=function(){stopTimer(); startTimer();};

startTimer();