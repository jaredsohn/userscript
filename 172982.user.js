// ==UserScript==
// @name       DEK-D AD Removal
// @namespace  http://www.dek-d.com/
// @version    1.1
// @description  remove ads
// @match      *.dek-d.com/*
// @copyright  2012+, You
// @run-at document-end
// ==/UserScript==

function clear(){
	document.getElementById("_em_stage__em").style.display = "none";
    document.getElementsByClassName("fc-panel fc-icon")[0].style.display = "none";
}

var interval = setInterval(clear , 200);
setTimeout( function(){
    clearInterval(interval);
}, 5000);