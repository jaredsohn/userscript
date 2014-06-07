// ==UserScript==
// @name          anthares
// @namespace     http://www.example.com/gmscripts
// @description   +1 in forums. If you requiere send message this is your script!
// ==/UserScript==

document.getElementById("vB_Editor_QR_textarea").value="+"+Math.floor(Math.random()*11);
setTimeout("qr_resubmit()",30000);