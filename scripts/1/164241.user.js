// ==UserScript==
// @name            PThanks
// @author          limbo
// @version         0.992
// @match           http://*/details.php*
// @match           https://*/details.php*
// @match           http://ttg.im/t*
// @match           https://ttg.im/t*
// @match           http://*/plugin_details.php*
// @match           https://*/plugin_details.php*
// @downloadURL     http://userscripts.org/scripts/source/164241.user.js
// @updateURL       http://userscripts.org/scripts/source/164241.meta.js

// ==/UserScript==

function thanks(){
if(document.getElementById("ajaxthanks"))
document.getElementById("ajaxthanks").click();
if(document.getElementById("saythanks"))
document.getElementById("saythanks").click(); 
if(document.getElementById("thanksbutton"))
document.getElementById("thanksbutton").click();
}

setTimeout(thanks,200);