// ==UserScript==
// @name          Listu.be hide video
// @namespace amirrima
// @version      0.85
// @description   hides the video window in listu.be
// @include  http://listu.be*
// @include  http://www.listu.be*
// @exclude  http://listu.be/embed*
// @exclude  http://www.listu.be/embed*
// ==/UserScript==

window.setTimeout(function() { 
document.getElementById("myytplayer").height=0;
document.getElementById("myytplayercontainer").style.height=0;
document.getElementById("rlst").style.top="108px";
}, 1000);
