// ==UserScript==
// @name       Napiplus.Eu
// @namespace  http://ad-soft.hu/
// @version    1.0
// @description  Like vadász szkript
// @match      http://*.napiplus.eu/*
// @copyright  2014, ADSoft
// ==/UserScript==

document.getElementsByClassName("to-lock-simple")[0].style.display = "block";
document.getElementsByClassName("ui-locker-facebook")[0].style.display = "none";
document.getElementById("blink").style.display = "none";
document.getElementById("slider1").style.display = "none";

document.body.oncontextmenu = null;