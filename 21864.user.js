// ==UserScript==
// @name           twitter auto-refresh
// @namespace      net.moeffju.userscripts
// @description    Automatically refresh Twitter.
// @include        http://twitter.com/home
// @include        https://twitter.com/home
// ==/UserScript==

delay=120;

timer=null;
startTimer=function(){timer=window.setTimeout(function(){window.location.reload();}, delay*1000);};
stopTimer=function(){window.clearTimeout(timer);};
restartTimer=function(){stopTimer(); startTimer();};

(document.getElementById('doingForm').getElementsByTagName('input')[0]).addEventListener('click', restartTimer, true);
document.getElementById('status').addEventListener('keydown', restartTimer, true);

startTimer();