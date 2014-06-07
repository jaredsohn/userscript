// ==UserScript==
// @name           Travian scrren size faker
// @namespace      Travian
// @description    Randomizes the screen size reported to travian at login
// @include        http://*.travian.*/login.php*
// @exclude        http://forum.travian.*
// ==/UserScript==

var s1 = document.getElementsByName("s1")[0];
var resolutions = new Array();
resolutions = "1024:768;1280:1024;1680:1050;1600:1200".split(";");
var cres = parseInt(Math.random()*(resolutions.length));
var res = resolutions[cres];
s1.setAttribute("onClick", "javascript: document.snd.w.value='" + res + "';alert('Faking resolution to " + res + "!')");
