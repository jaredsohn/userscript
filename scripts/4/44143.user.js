// ==UserScript==
// @name           tweettree auto-refresh
// @namespace      http://userscripts.org/users/83415
// @description    Automatically refresh TweetTree.com
// @include        http://tweetree.com/*
// ==/UserScript==

delay=60;

timer=null;
startTimer=function(){timer=window.setTimeout(function(){window.location.reload();}, delay*1000);};
stopTimer=function(){window.clearTimeout(timer);};
restartTimer=function(){stopTimer(); startTimer();};

startTimer();