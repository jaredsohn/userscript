// ==UserScript==

// @name           Server Status Scoreboard

// @description    Strips everything but the scoreboard from an apache mod_status page and refreshes every 5 seconds

// @includes       http://*/server-status

// ==/UserScript==


pre = document.getElementsByTagName('pre');
scoreboard = '<pre>'+pre[0].innerHTML+'</pre>';
document.body.innerHTML = scoreboard;
setTimeout("location.reload()", 5000);